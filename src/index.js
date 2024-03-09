import './tailwind.css';
const weatherApiKey = 'afbc932eb78247838c451817240703';
async function getWeatherFromApi(location) {
  const weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}`
  );
  return await weather.json();
}

function renderPage(place) {
  let weather = getWeatherFromApi(place);
  console.log(weather);
  weather
    .then((data) => {
      if (data.error) {
        throw new Error(`${place} not found`);
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
      // console.log(data);
    })
    .catch((error) => {
      // console.error(error);

      const errorSpan = document.querySelector('#label');
      errorSpan.insertAdjacentHTML(
        'afterend',
        `<span class="error text-gray-200">${error.message}</span>`
      );
      // console.log(errorSpan);
    });
}

renderPage('addis abeba');
renderPage('kjs;dlfakljfs');
function removeChild() {
  const location = document.querySelectorAll('.location p');
  location.forEach((p) => p.remove());
  const weather = document.querySelectorAll('.weather div');
  weather.forEach((div) => div.remove());
  document.querySelector('.error').innerHTML = '';
}
function createLocationContent(location) {
  return `
            <p class="country text-2xl">${location.name}, ${location.country}</p>
            <p class="time text-xl text-gray-300">${location.localtime}</p>`;
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
              <p>Humidity: ${weather.humidity}%</p>
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
            </div> `;
}

const search = document.querySelector('#search');
search.addEventListener('keydown', (event) => {
  // console.log(event.key);
  if (event.key === 'Enter') {
    removeChild();
    renderPage(search.value);
  }
});

async function tryFetch(location) {
  const forecast = fetch(
    `http://api.weatherapi.com/v1/sports.json?key=${weatherApiKey}&q=${location}`
  );
  return (await forecast).json();
}

// console.log(tryFetch('addis abeba'));

// name ,country, local ti``?me
// temp c,f
// condition text& icon
// wind kmh, mps
// humidity %
// cloud coverage %

// {
//     Location:

// name: The name of the city or location for which the weather data is provided (in this case, "Addis Abeba").
// region: The region or state associated with the location (empty string in this example).
// country: The country where the location is situated ("Ethiopia").
// lat: The latitude coordinate of the location (9.03 degrees).
// lon: The longitude coordinate of the location (38.7 degrees).
// tz_id: The time zone identifier for the location ("Africa/Addis_Ababa").
// localtime_epoch: The current time at the location in Unix epoch time format (seconds since 1970-01-01T00:00:00Z). Here, it's 1709924686.
// localtime: The current time at the location in a human-readable format ("2024-03-08 22:04").
// Current:

// This key holds information about the current weather conditions at the location.

// last_updated_epoch: The Unix epoch time (in seconds) of when the weather data was last updated (1709924400).
// last_updated: The last update time in a human-readable format ("2024-03-08 22:00").
// temp_c: The current temperature in degrees Celsius (16.2 degrees).
// temp_f: The current temperature in degrees Fahrenheit (61.1 degrees).
// is_day: A flag indicating whether it's daytime (0) or nighttime (1) at the location (0 in this case).
// condition: An object containing details about the current weather conditions:
// text: A textual description of the current weather ("Patchy rain nearby").
// icon: A URL pointing to a weather icon representing the current conditions ("//cdn.weatherapi.com/weather/64x64/night/176.png [invalid URL removed]").
// code: A numerical code representing the weather condition (1063).
// wind_mph: Wind speed in miles per hour (4.5 mph).
// wind_kph: Wind speed in kilometers per hour (7.2 kph).
// wind_degree: The wind direction in degrees (347 degrees).
// wind_dir: The wind direction in cardinal or ordinal compass point (e.g., "NNW" for North-Northwest).
// pressure_mb: Atmospheric pressure in millibars (1018.0 mb).
// pressure_in: Atmospheric pressure in inches of mercury (30.06 in).
// precip_mm: Precipitation amount in millimeters over the last hour (0.55 mm).
// precip_in: Precipitation amount in inches over the last hour (0.02 in).
// humidity: Relative humidity as a percentage (67%).
// cloud: Cloud cover percentage (87%).
// feelslike_c: Feels-like temperature in degrees Celsius (16.2 degrees).
// feelslike_f: Feels-like temperature in degrees Fahrenheit (61.1 degrees).
// vis_km: Visibility distance in kilometers (9.0 km).
// vis_miles: Visibility distance in miles (5.0 miles).
// uv: The UV index (a measure of ultraviolet radiation intensity) (1.0).
// gust_mph: Wind gust speed in miles per hour (7.2 mph).
// gust_kph: Wind gust speed in kilometers per hour (11.7 kph).
// }
