const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const searchInputBox = document.querySelector('.search-box input');

function getWeather() {
	const API_KEY = config.API_KEY;
	const city = document.querySelector('.search-box input').value;

	if (city === '') return;

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
		.then((res) => res.json())
		.then((jsonData) => {
			if (jsonData.cod === '404') {
				container.style.height = '400px';
				weatherBox.style.display = 'none';
				weatherDetails.style.display = 'none';
				error404.style.display = 'block';
				error404.classList.add('fadeIn');

				return;
			}

			error404.style.display = 'none';
			error404.classList.remove('fadeIn');

			const image = document.querySelector('.weather-box img');
			const temperature = document.querySelector('.weather-box .temperature');
			const description = document.querySelector('.weather-box .description');
			const humidity = document.querySelector('.weather-details .humidity span');
			const wind = document.querySelector('.weather-details .wind span');

			switch (jsonData.weather[0].main) {
				case 'Clear':
					image.src = 'images/clear.png';
					break;

				case 'Rain':
					image.src = 'images/rain.png';
					break;

				case 'Snow':
					image.src = 'images/snow.png';
					break;

				case 'Clouds':
					image.src = 'images/cloud.png';
					break;

				case 'Mist':
					image.src = 'images/mist.png';
					break;

				default:
					image.src = '';
			}

			temperature.innerHTML = `${parseInt(jsonData.main.temp)}<span>℃</span>`;
			description.innerHTML = `${jsonData.weather[0].description}`;
			humidity.innerHTML = `${jsonData.main.humidity}%`;
			wind.innerHTML = `${parseInt(jsonData.wind.speed)}Km/h`;

			console.log(temperature.innerHTML);
			console.log(description.innerHTML);
			console.log(humidity.innerHTML);
			console.log(wind.innerHTML);

			weatherBox.style.display = '';
			weatherDetails.style.display = '';
			weatherBox.classList.add('fadeIn');
			weatherDetails.classList.add('fadeIn');
			container.style.height = '590px';
		});
}

searchInputBox.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		getWeather();
	}
});

search.addEventListener('click', getWeather);
