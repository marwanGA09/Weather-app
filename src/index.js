import './tailwind.css';
const weatherApiKey = 'afbc932eb78247838c451817240703';
let metricUnit = true;
async function getWeatherFromApi(location) {
  const weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}`
  );
  if (!weather.ok) {
    throw new Error(`Error fetching weather data: ${weather.statusText}`);
  }
  return await weather.json();
}

function renderPage(place) {
  let weather = getWeatherFromApi(place);
  weather
    .then((data) => {
      console.log(data);
      if (data.error) {
        throw new Error(`${data.error.message}`);
      } else {
        document
          .querySelector('.location')
          .insertAdjacentHTML(
            'afterbegin',
            createLocationContent(data.location)
          );

        document
          .querySelector('.weather')
          .insertAdjacentHTML('afterbegin', createWeatherContent(data.current));
      }
      addFlag(data.location.country);
    })
    .catch((error) => {
      const errorSpan = document.querySelector('#label');
      errorSpan.insertAdjacentHTML(
        'afterend',
        `<span class="error text-gray-200">${error.message} ${place}</span>`
      );
    });
}

renderPage('addis abeba');
function removeChild() {
  const location = document.querySelectorAll('.location p');
  location.forEach((p) => p.remove());
  const weather = document.querySelectorAll('.weather div');
  weather.forEach((div) => div.remove());
  const error = document.querySelector('.error');
  if (error != null) {
    error.innerHTML = '';
  }
}

function addFlag(country) {
  const flag = fetchTest(country);
  flag.then((flag) => {
    document.querySelector('.flag').src = flag[0].flags.png;
  });
}

function createLocationContent(location) {
  return `
              <p class="country text-2xl">
              <span class="border-b-2 border-green-300">${location.name}</span>, ${location.country}
            </p>
            <p class="time text-xl text-gray-950">12/01/2024 12:30</p>`;
}

function createWeatherContent(weather) {
  return `<div
              class="condition md:flex md:justify-between md:items-center lg:col-span-3"
            >
              <span class="text">Weather condition: ${weather.condition.text}</span>
              <div class="icon md:w-11 md:h-10">
                <img id="icon" src="${weather.condition.icon}" alt="" />
              </div>
            </div>
            <div class="flex justify-between md:items-center wind">
              <p>Wind speed: ${weather.wind_kph}kmh to ${weather.wind_dir}</p>
              <img
                class="w-6 h-6 md:w-11 md:h-10"
                src="./img/wind.png"
                alt=""
              />
            </div>
            <div class="flex justify-between md:items-center humidity">
              <p>Humidity: ${weather.humidity}</p>
              <img
                src="./img/humidity.webp"
                alt=""
                class="w-6 h-6 md:w-11 md:h-10"
              />
            </div>
            <div class="flex justify-between md:items-center cloud">
              <p>Cloud coverage: ${weather.cloud}%</p>
              <img
                src="./img/cloud.png"
                alt=""
                class="w-6 h-6 md:w-11 md:h-10"
              />
            </div>`;
}

const search = document.querySelector('#search');
search.addEventListener('keydown', (event) => {
  // console.log(event.key);
  if (event.key === 'Enter') {
    removeChild();
    renderPage(search.value);
  }
});

async function fetchTest(country) {
  const flag = await fetch(`https://restcountries.com/v3.1/name/${country}`);

  return flag.json();
}
