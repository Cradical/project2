$(document).ready(function () {

    // ------------------
    // BUTTONS
    // ------------------
    const forecast_display = document.querySelector('#weather-forecast');
    const date_display = document.querySelector('#date');
    const temp_display = document.querySelector('#temp-reading');
    console.log(temp_display);
    const apiButton = document.querySelector('#forecast-generator');
    const save_location = document.querySelector('#location_save');
    // ------------------
    const lonValue = document.querySelector('#longitude');
    const latValue = document.querySelector('#latitude');

    // ---------------------------
    // LOCAL STORAGE RECALL
    // ---------------------------
    lonValue.value = JSON.parse(localStorage.getItem('longitude')) || {}
    latValue.value = JSON.parse(localStorage.getItem('latitude')) || {}
    // ---------------------------

    apiButton.addEventListener('click', function (e) {
        e.preventDefault()

        var longValue = lonValue.value;
        var latiValue = latValue.value;

        function apiFetch(url) {
            console.log(url);
            return $.get(url, function () {
                // console.log('success');
            })
        }
        apiFetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latiValue}&lon=${longValue}&units=imperial&APPID=b316dea9a7fc1d97f7ec7b8de0010d87`).then(result => {
            console.log('result: ', result)
            weather_info_process(result);
        })

        // ----------------------------
        // POPULATES DATA ON THE PAGE
        // ----------------------------
        function weather_info_process(result) {

            let weatherForecast = [];
            for (let i = 5; i < result['list'].length; i = i + 8) {
                weatherForecast.push(result['list'][i]['weather'][0]['description'])
            }

            weatherForecast.forEach(function (element) {
                var weather_info_display = document.createElement('span');
                weather_info_display.setAttribute('value', element);
                weather_info_display.setAttribute('id', element);
                weather_info_display.setAttribute('class', 'pl-1 font-weight-bold text-dark text-right');
                weather_info_display.textContent = element;
                forecast_display.appendChild(weather_info_display);
            })
            // ----------------------------------------------------------------------------------
            let date = [];
            for (let j = 5; j < result['list'].length; j = j + 8) {
                date.push(result['list'][j]['dt_txt'].split(' ').shift())
            }

            date.forEach(function (element) {
                var date_info_display = document.createElement('span');
                date_info_display.setAttribute('value', element);
                date_info_display.setAttribute('id', element);
                date_info_display.setAttribute('class', 'pl-3 text-justify text-dark text-center');
                date_info_display.textContent = element;
                date_display.appendChild(date_info_display);
            })
            // -----------------------------------------------------------------------------------
            let temp = [];
            for (let k = 5; k < result['list'].length; k = k + 8) {
                temp.push(result['list'][k]['main']['temp'])
                console.log(temp);
            }

            temp.forEach(function (element) {
                var temp_info_display = document.createElement('span');
                temp_info_display.setAttribute('value', element);
                temp_info_display.setAttribute('id', element);
                temp_info_display.setAttribute('class', 'pl-5 text-justify text-dark text-center');
                temp_info_display.textContent = element;
                temp_display.appendChild(temp_info_display);
            })
        }

    })
    save_location.addEventListener('click', function () {
        var lon_data = lonValue.value;
        localStorage.setItem('longitude', JSON.stringify(lon_data));
        var lat_data = latValue.value;
        localStorage.setItem('latitude', JSON.stringify(lat_data));

    })
});