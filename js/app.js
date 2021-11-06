let spinner = document.querySelector('.spinner');
let block = document.querySelector('.block');
let region = document.querySelector('.block__head-region');
let icon = document.querySelector('.block__head-icon');
let tempBlock = document.querySelector('.block__temp');
let tempBaseValue = document.querySelector('.block__temp-base-value');
let tempBaseType = document.querySelector('.block__temp-base-type');
let tempFeelsValue = document.querySelector('.block__temp-feels-value');
let tempFeelsType = document.querySelector('.block__temp-feels-type');
let wind = document.querySelector('.block__addition-wind__info');
let pressure = document.querySelector('.block__addition-pressure__info');
let humidity = document.querySelector('.block__addition-humidity__info');
let descText = document.querySelector('.block__state');

window.addEventListener('load', () => {
	let lon;
	let lat;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			lon = position.coords.longitude;
			lat = position.coords.latitude;
			const api = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=${APIkey}`;
			fetch(api)
				.then((response) => response.json())
				.then((data) => {
					spinner.style.display = 'none';
					spinner.classList.add('animated');
					setTimeout(() => {
						block.style.display = 'flex';
					}, 100);

					let responseData = data.list[0];
					let regionData = responseData['name'];
					let desriptionData =
						responseData['weather'][0]['description'];
					let iconData = responseData['weather'][0]['icon'];
					let tempDataBase = Math.round(responseData['main']['temp']);
					let tempDataFeels = Math.round(
						responseData['main']['feels_like']
					);
					region.innerText = regionData;
					let iconURL = `http://openweathermap.org/img/wn/${iconData}@2x.png`;
					icon.innerHTML = `<img src="${iconURL}"></img>`;
					tempBaseValue.innerText = tempDataBase;
					tempFeelsValue.innerText = tempDataFeels;
					descText.innerText = desriptionData;
					wind.innerText = responseData['wind']['speed'];
					pressure.innerText = responseData['main']['pressure'];
					humidity.innerText = responseData['main']['humidity'];
				})
				.catch((err) => console.error(err));
		});
	} else {
		alert('Your browser do not support Geo Location');
	}
});

// let tempBlockState = 'c';

// tempBlock.addEventListener('click', (e) => {
// 	const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
// 	const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
// 	if (tempBlockState === 'c') {
// 		tempValue.innerText = Math.round(
// 			celsiusToFahrenheit(tempValue.innerText)
// 		);
// 		tempType.innerText = 'F';
// 		tempBlockState = 'f';
// 	} else if (tempBlockState === 'f') {
// 		tempValue.innerText = Math.round(
// 			fahrenheitToCelsius(tempValue.innerText)
// 		);
// 		tempType.innerText = 'C';
// 		tempBlockState = 'c';
// 	}
// });
