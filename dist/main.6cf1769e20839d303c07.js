(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var r=n.getElementsByTagName("script");if(r.length)for(var c=r.length-1;c>-1&&(!t||!/^http(s?):/.test(t));)t=r[c--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=e.p+"c0501d9d9e3d451120e2.jpg",n=e.p+"c3edab185d6c9e6dbd3b.webp",r=e.p+"d81e580c11a41de628ca.png",c=e.p+"cdad930c1c11e40b77a9.jpeg";console.log(t);const o="afbc932eb78247838c451817240703";function a(e){(async function(e){const t=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${o}&q=${e}`);if(!t.ok)throw new Error(`Error fetching weather data: ${t.statusText}`);return await t.json()})(e).then((e=>{if(e.error)throw new Error(`${e.error.message}`);var c;document.querySelector(".location").insertAdjacentHTML("afterbegin",`\n              <p class="country text-2xl">\n              <span class="border-b-2 border-green-300">${(c=e.location).name}</span>, ${c.country}\n            </p>\n            <p class="time text-xl text-gray-950">12/01/2024 12:30</p>`),document.querySelector(".weather").insertAdjacentHTML("afterbegin",function(e){return`<div\n              class="condition md:flex md:justify-between md:items-center lg:col-span-3"\n            >\n              <span class="text">Weather condition: ${e.condition.text}</span>\n              <div class="icon md:w-11 md:h-10">\n                <img id="icon" src="${e.condition.icon}" alt="" />\n              </div>\n            </div>\n            <div class="flex justify-between md:items-center wind">\n              <p>Wind speed: ${e.wind_kph}kmh to ${e.wind_dir}</p>\n              <img\n                class="w-6 h-6 md:w-11 md:h-10"\n                src="${r}"\n                alt=""\n              />\n            </div>\n            <div class="flex justify-between md:items-center humidity">\n              <p>Humidity: ${e.humidity}</p>\n              <img\n                src="${n}"\n                alt=""\n                class="w-6 h-6 md:w-11 md:h-10"\n              />\n            </div>\n            <div class="flex justify-between md:items-center cloud">\n              <p>Cloud coverage: ${e.cloud}%</p>\n              <img\n                src="${t}"\n                alt=""\n                class="w-6 h-6 md:w-11 md:h-10"\n              />\n            </div>`}(e.current)),async function(e){const t=await fetch(`https://restcountries.com/v3.1/name/${e}`);return await t.json()}(e.location.country).then((e=>{document.querySelector(".flag").src=e[0].flags.png}))})).catch((t=>{document.querySelector("#label").insertAdjacentHTML("afterend",`<span class="error text-gray-200">${t.message} ${e}</span>`)})).finally((()=>{document.querySelector("#search").value=""}))}document.querySelector(".container").setAttribute("style",` background-image: linear-gradient(\n              rgba(73, 220, 73, 0.369),\n              rgba(241, 71, 71, 0.39)\n            ),\n            url(${c});`),a("addis abeba");const i=document.querySelector("#search");i.addEventListener("keydown",(e=>{"Enter"===e.key&&(!function(){document.querySelectorAll(".location p").forEach((e=>e.remove())),document.querySelectorAll(".weather div").forEach((e=>e.remove()));const e=document.querySelector(".error");null!=e&&(e.innerHTML="")}(),a(i.value))}))})();
//# sourceMappingURL=main.6cf1769e20839d303c07.js.map