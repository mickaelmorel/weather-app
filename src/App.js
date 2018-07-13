import React, { Component } from 'react';
import './App.css';

const key = 'e568c828911e49117188e8c10e884dd9';
const url = 'http://api.openweathermap.org/data/2.5/weather?q';

const Search = props => (
	<form onSubmit={props.getData}>
		<input type="text" name="city" placeholder="Ville"/>
		<input type="text" name="country" placeholder="Pays"/><br/>
		<button>Rechercher</button>
	</form>
);

const Meteo = props => (
	<div className="meteo">
  {	
	 	props.date && <p className="desc-meteo"> Nous sommes le 
	 		<span className="info"> { timeConverter(props.date) }</span>
	 	</p> 
	 }
	 {	
	 	props.city && props.country && <p className="desc-meteo"> Ville : 
	 		<span className="info"> { props.city }, { props.country }</span>
	 	</p> 
	 }
   { 	
	 	props.description && <p className="cond-meteo"> Conditions météo : 
	 		<span className="info"> { props.description } </span>
       <img src={props.img} alt="Icône" />
       	 </p> 
	 }
	 { 	
	 	props.temperature && <p className="desc-meteo"> Température : 
	 		<span className="info"> { props.temperature }	</span>
	 	</p> 
	 }
   { 	
	 	props.description && <p className="desc-meteo"> Vitesse du vent : 
	 		<span className="info"> { props.speed } </span>
       	 </p> 
	 }
	 { 
	 	props.erreur && <p className="erreur">{ props.erreur }</p>  
	 }
	</div>
);


function timeConverter(time){
  var a = new Date(time * 1000);
  var months = ['Jan','Fév','Mar','Avr','Mai','Juin','Jul','Aout','Sep','Oct','Nov','Déc'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var newtime = date + ' ' + month + ' ' + year;
  return newtime;
}

class App extends Component {
  state = {
    date: undefined,
    city: undefined,
    country: undefined,
    temperature: undefined,
    img : undefined,
    description: undefined,
    speed: undefined,
    erreur: undefined
  }
  getData = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const call = await fetch(`${url}=${city},${country}&appid=${key}&units=metric&lang=fr`);
    const data = await call.json();
    if (city && country) {
      this.setState({
        date: data.dt,
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        img: 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png',
        description: data.weather[0].description,
        speed: data.wind.speed,
        erreur: ""
      });
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        img: undefined,
        description: undefined,
        speed: undefined,
        erreur: "Veuillez entrer une ville et un pays."
      });
    }
  }

  render() {
    return (
      <div className="main">
        <div className="title">
		      <h1 className="title-text">Météo du jour</h1>
        </div>
        <div className="form">
          <Search getData={this.getData} />
          <Meteo 
            date={this.state.date}
            img={this.state.img}
            city={this.state.city}
            country={this.state.country}
            temperature={this.state.temperature} 
            description={this.state.description}
            speed={this.state.speed}
            erreur={this.state.erreur}
          />
        </div>
      </div>
    );
  }
};

export default App;