

const citySearch=document.querySelector(".city-search");
const citynamesearch=document.querySelector(".city-namesearch");



let cityName=document.querySelector(".weather-city");
const datetime=document.querySelector(".weather-date-time")
const forecast=document.querySelector(".weather-forecast");
const temperature=document.querySelector(".weather-temp");
const temp_min=document.querySelector(".temp-min");
const temp_max=document.querySelector(".temp-max");



const feelslike=document.querySelector(".weather-feelslike");
const humidity=document.querySelector(".weather-humidity");
const wind_speed=document.querySelector(".weather-wind");
const wind_degree=document.querySelector(".weather-winddegree");
const  pressure=document.querySelector(".weather-pressure");
const  sunrise=document.querySelector(".weather-sunrise");
const sunset=document.querySelector(".weather-sunset");
const visibilityy=document.querySelector(".weather-visibility");
const  cloudcover=document.querySelector(".weather-cloudcover");







//  getting city name from the input box 
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=citynamesearch.value;
    console.log(cityName);

    getWeatherData(cityName);

    cityName="";
})


const getWeatherData= async(city)=>{
    try{

    
    const weatherUrl=  `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=f3c899b0e75deeed4734e767284851d1&units=metric`;
    const response=await fetch(weatherUrl);
    const data=await response.json();
    console.log(data);
    const {main,name,weather,wind, sys,dt,visibility,clouds}=data;

    cityName.innerHTML= `${name}, ${getCountryName(sys.country)}`;
    datetime.innerHTML=getDateTime(dt);
    forecast.innerHTML=weather[0].main;
    temperature.innerHTML=`${main.temp}&deg;C `;
    temp_min.innerHTML=`Min: ${main.temp_min}&deg;C`;
    temp_max.innerHTML=`Max: ${main.temp_max}&deg;C`;


    feelslike.innerHTML=`${main.feels_like}&deg;C`;
    humidity.innerHTML=`${main.humidity}%`;
    pressure.innerHTML=`${main.pressure} hPa`;
    wind_speed.innerHTML=`${wind.speed} m/s`;
    wind_degree.innerHTML=`${wind.deg}&deg;`;
    sunrise.innerHTML=`${getLocalTime(sys.sunrise)}`;
    sunset.innerHTML=`${getLocalTime(sys.sunset)}`;
    visibilityy.innerHTML=`${visibility} m`;
    cloudcover.innerHTML=`${clouds.all} oktas`;
    }catch(error){
        console.log("API Error while fetching data");
    }
}

const getLocalTime=(time)=>{
    const timee =new Date(time*1000);
    console.log(timee.toLocaleTimeString());
    return timee.toLocaleTimeString();
}

const getCountryName=(code)=>{
    return new Intl.DisplayNames([code],{type:"region"}).of(code);
}

const getDateTime=(dt)=>{
    const curDate=new Date(dt*1000);
    console.log(curDate);
    const options={
        weekday:"long",
        year: "numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minutes:"numeric"
    };
    const formatter=new Intl.DateTimeFormat("en-US", options);
    console.log(formatter.format(curDate));
    return formatter.format(curDate);
}

getWeatherData("lucknow");


// news section



const container = document.querySelector(".news-section");

const getNewsData = async (search_text) => {
    try {
      const url = `http://api.mediastack.com/v1/news?access_key=cc9ff385320df450426fcf11a04d464d&&languages=en,-de&keywords=${search_text}&countries=in`;
  
      let response = await fetch(url);
      let dat = await response.json();
      container.innerHTML = "";
      console.log(dat);
  
      for (let i = 0; i < 12; i++) {
        const cards = document.createElement("div");
        cards.classList.add("cards");
  
        cards.innerHTML = ` <img src="${getImage(dat.data[i].image)}" alt="">
           <p>Author: ${getAuthor(dat.data[i].author)}</p>
           <p> Category: ${dat.data[i].category}</p>
           <h3>${getDescription(dat.data[i].title)}</h3>
           <p>${getDescription(dat.data[i].description)}</p>
            <a href="${dat.data[i].url}"  target="_blank">Read More</a>`;
        //  cards.innerText=dat.data[i].title;
        container.appendChild(cards);
      }
    } catch (error) {
      container.innerHTML = `<h2> Unable to fetch News. </h2>`;
    }
  };
  const getDescription = (des) => {
    if (des.length > 80) {
      let str = String(des);
      let newstr = `${str.slice(0, 80)}...`;
      return newstr;
    } else {
      return des;
    }
  };
  
  const getImage = (src) => {
    if (src == null) {
      return `https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;
    } else {
      return src;
    }
  };
  const getAuthor = (author) => {
    if (author == null) {
      return "Confidential";
    } else {
      return author;
    }
  };
  
  getNewsData("weather");
  