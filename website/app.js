/* Global Variables */
const generateBtn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=0bc1cb5bd6690e0fa4495ba9bdd96db1&units=imperial";

// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener("click", performAction);

/* Function called by event listener */

function performAction(e) {
	e.preventDefault();
	let zip = document.getElementById("zip").value;
	let feelings = document.getElementById("feelings").value;
	getWeather(baseURL, zip, apiKey)
		.then(function (userData) {
			// add data to POST request
			postData("/add", {
				date: newDate,
				temp: userData.main.temp,
				content: feelings,
			});
		})
		.then(function (newData) {
			// call updateUI to update browser content
			updateUI();
		});
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, apiKey) => {
	// res equals to the result of fetch function
	const res = await fetch(baseURL + zip + apiKey);
	console.log(zip);
	try {
		// userData equals to the result of fetch function
		const userData = await res.json();
		return userData;
	} catch (error) {
		console.log("error", error);
	}
};
/* Function to POST data */
const postData = async (url = "", data = {}) => {
	const req = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
		},
		body: JSON.stringify({
			date: data.date,
			temp: data.temp,
			content: data.content,
		}),
	});

	try {
		const newData = await req.json();
		return newData;
	} catch (error) {
		console.log("Fail To Save Data", error);
	}
};

/* Function to update UI*/
const updateUI = async () => {
	const request = await fetch("/all");
	try {
		const allData = await request.json();
		// update new entry values
		document.getElementById("date").innerHTML = allData.date;
		document.getElementById("temp").innerHTML = allData.temp;
		document.getElementById("content").innerHTML = allData.content;
	} catch (error) {
		console.log(" Updated Failed", error);
	}
};
