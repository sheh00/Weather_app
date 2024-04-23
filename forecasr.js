const key = "TG27XMr7G3OXoQHIDRYP1jcsUQoYOiCR";


const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];

    
};

const getWeather = async (Id) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${Id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};
// getCity('kandy')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// getWeather(307303)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

