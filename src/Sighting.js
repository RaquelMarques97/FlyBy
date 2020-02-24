import React from 'react';
import './Sighting.css';
import Moment from 'moment';

class Sighting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: '',
            lat: '',
            altitude: '',
            passes: '',
            datetime: '',
            passTimes: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        this.getPosition();
    }


    getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lng: position.coords.longitude,
                lat: position.coords.latitude,
            })

            fetch(`https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-pass.json?lat=${this.state.lat}&lon=${this.state.lng}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        lng: data.request.longitude,
                        lat: data.request.latitude,
                        altitude: data.request.altitude,
                        passes: data.request.passes,
                        datetime: data.request.datetime,
                        passTimes: data.response,
                        isLoading: false
                    })
                })
        });
    }

    render() {
        const { passTimes, isLoading } = this.state;


        if (isLoading) {
            return (
                <div className='loading'>
                    <img className='gif1' width='80%' height='35%' src="./img/iss.gif" alt='' />
                    <p className='searching'>SEARCHING...</p>
                </div>
            )
        }

        const formatRisetime = (utcSeconds) => {
            const date = Moment(utcSeconds * 1000).format('DD-MM-YYYY | HH:MM:SS');
            return '' + date;
        }

        const secondsToMs = (d) => {
            d = Number(d);
            let m = Math.floor(d % 3600 / 60);
            let s = Math.floor(d % 3600 % 60);

            let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
            let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
            return mDisplay + sDisplay;
        }

        return (
            <div className="maincontent sighting-board">
                <div className="sighting-infos">
                    <h1 className="sighting-title"> Spot ISS </h1>
                    <div className="sighting-subtitle"> Sighting opportunities from your current location </div>
                    <div className="sighting-list" >
                        <ul>
                            {passTimes.map((passTime) => {
                                return (
                                    <li key={passTime.risetime}> {formatRisetime(passTime.risetime)} | Duration: {secondsToMs(passTime.duration)} </li>
                                )
                            })}
                        </ul>
                    </div>

                </div>
                <div className="sighting-div-image">
                    <img className="sighting-image" src='./rsz_sighting.png' alt='' />
                </div>
            </div>
        )
    }
};

export default Sighting
