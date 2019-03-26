//Cities
const nzCities = [
	['Auckland', 2348079, 1],
	['Wellington', 2351310, 2],
	['Hamilton', 2348696, 3],
	['Napier', 2349663, 4],
	['Christchurch', 2348327, 5],
	['Greymouth', 2348669, 6],
	['Queenstown', 2350303, 7],
	['Dunedin', 2348444, 8],
];

function getWeather(city) {
	let tempObject;
	let id = city[2];
	let name = city[0];
	let woid = city[1];
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	const url = `https://www.metaweather.com/api/location/${woid}/`; // site that doesn’t send Access-Control-*
	fetch(proxyurl + url).then(result => {
		return result.json();
	})
		.then(function (data) {
			//console.log(data.consolidated_weather[1]);

			tempObject = new WeatherObject(data.consolidated_weather[1].weather_state_abbr, id, name).pushData();

		})
		.catch(error => {
			tempObject = new WeatherObject('gk', id, name).pushData();
			console.log(name);
		});
}

// New Object and Push it to Frontend
class WeatherObject {
	constructor(woeid, Id, Name) {
		this.id = Id;
		this.name = Name;
		this.tomorrowStatre = woeid;
	}

	pushData() {
		var objState, element, imgElement;

		// console.log(this.id);
		// console.log(this.tomorrowStatre);
		switch (this.tomorrowStatre) {
			case 'hr':
				objState = '1.svg';
				break;
			case 'lr':
				objState = '2.svg';
				break;
			case 'sn':
				objState = '3.svg';
				break;
			case 'sl':
				objState = '4.svg';
				break;
			case 'h':
				objState = '5.svg';
				break;
			case 't':
				objState = '6.svg';
				break;
			case 's':
				objState = '7.svg';
				break;
			case 'hc':
				objState = '8.svg';
				break;
			case 'lc':
				objState = '9.svg';
				break;
			case 'gk':
				objState = '10.png';
				break;
			default:
				objState = 11;
		}
		element = `object-${this.id}`;
		imgElement = `<img src="icons/${objState}" alt="img">`;
		//let newHTMLObject = `<div id="object-1"> ${this.id} :${this.name} : ${this.tomorrowStatre} : ${objState} </div>`;
		document.getElementById(element).textContent = `${this.name}`;
		document.getElementById(element).insertAdjacentHTML('beforeend', '<div></div>');
		document.getElementById(element).insertAdjacentHTML('beforeend', imgElement);

	}
}

function initiate() {
	nzCities.forEach(element => {
		getWeather(element);
	})
}
initiate();

