const form = document.querySelector('form');
const time = document.getElementById('time');
const icon = document.getElementById('icon');
const weatherInfo = document.querySelector('.weather-info');
const appBody = document.querySelector('.app-body');


// getting weather information
const getInfo = async city => {
    const cityData = await getCity(city);
    const weatherData = await getWeather(cityData.Key);
    console.log(cityData, weatherData);
    return {cityData, weatherData};
};

// updating user interface
const updateUi = (data) => {
    // storing two object seperately
    const {cityData, weatherData} = data;

    // updating time image
    let timeSrc = weatherData.IsDayTime ? './images/time/da_100423.svg': './images/time/ni.svg';
    time.setAttribute('src', timeSrc);

    // updating weather icon
    // let iconSrc = `./images/icons/${weatherData.WeatherIcon}.svg`;
    icon.setAttribute('src', `./images/icons/${weatherData.WeatherIcon}.svg`);

    // updating weather details
    const cityName = String(cityData.LocalizedName).toUpperCase();
    const weatherDetails = `<p id="city">${cityName}</p>
                            <P id="status">${weatherData.WeatherText}</P>
                            <p id="temp">${weatherData.Temperature.Metric.Value} &#8451;</p>`;
    
    weatherInfo.innerHTML = weatherDetails; 
    
    // visible app body
    appBody.style.display = "block";
    



};

// getting user input
form.addEventListener('submit', e => {
    // preventing defalut action
    e.preventDefault();

    const city = form.userLocation.value.trim();
    form.reset();

    localStorage.setItem('cityName', city);

    getInfo(city)
        .then(data => {
            updateUi(data);
        })
        .catch(err => console.log(err));


});

// updating prevoius check
if(localStorage.getItem('cityName')) {
    getInfo(localStorage.getItem('cityName'))
    .then(data =>  updateUi(data))
    .catch(err => console.log(err));
}