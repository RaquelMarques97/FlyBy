

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './WhereISS.css';
import DisplayPosition from './DisplayPosition';
import L from 'leaflet';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { NavLink } from 'react-router-dom';




class SimpleExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: '',
            lng: '',
            zoom: 2,
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            speed: 27600,
            speedunits: 'kmh',
            isLoading: true,
            isError: false
        }

    }


    getPosition = () => {
        fetch('https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json')
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({
                        lat: data.iss_position.latitude,
                        lng: data.iss_position.longitude,
                        isLoading: false,
                        isError: false
                    });
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        isError: true
                    });
                }
            )
    }

    componentDidMount() {
        const fetchInfo = () => {
            this.getPosition();
        };
        const intervalID = setInterval(fetchInfo, 8000);
        this.setState({ intervalID: intervalID });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalID);
    }

   
    tileLayer = () => {

        this.setState({ url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' })
    }
    tileLayer2 = () => {
        this.setState({ url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png' })
    }

    tileLayer3 = () => {
        this.setState({ url: 'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png' })

    }

    speedconversion = () => {
        var newSpeed;
        var newUnit;

        if (this.state.speedunits === 'kmh') {
            newSpeed = Math.round(27600 / 1.60933);
            newUnit = 'mph';
        } else {
            newSpeed = Math.round(this.state.speed * 1.60933);
            newUnit = 'kmh';
        }

        this.setState({
            speed: newSpeed,
            speedunits: newUnit,
        });
    }




    render() {



        const { isLoading } = this.state;

        if (isLoading) {
            return (
                <div className='loading'>
                    <img className='gif1' width='80%' height='35%' src="./img/iss.gif" alt='' />
                    <p className='searching'>SEARCHING...</p>
                </div>
            )
        }

        const position = [this.state.lat, this.state.lng];

        let icon = L.icon({
            iconUrl: require('./iss.png'),
            iconSize: [64, 64],
        });
        let iconError = L.icon({
            iconUrl: require('./iss-error.png'),
            iconSize: [64, 64],
        });



        return (
            <div className="maincontent">
                <h1 className="wheretitle">Where is ISS right now?</h1>

                <div className='speed'>
                    <DisplayPosition className="display" lat={this.state.lat} lng={this.state.lng} />
                    <p className='orbits'> Orbits per day: 15.54 // Speed: {this.state.speed} {this.state.speedunits}</p>
                    <div className='toggle'>
                        <BootstrapSwitchButton
                            onstyle="outline-light" offstyle="outline-light"
                            width={100} height={10}
                            checked={false}
                            size="xs"
                            onlabel='Imperial'
                            offlabel='Metric'
                            onChange={this.speedconversion}>

                        </BootstrapSwitchButton>

                    </div>
                    <div><NavLink className='upgrade' exact to="/Globe3d">GO 3D</NavLink></div>
                </div>

                <div className="Where">

                    <div className="map">

                        <Map className="map1" center={{ lat: this.state.lat, lng: this.state.lng }}
                            zoom={this.state.zoom}>
                            <TileLayer
                                url={this.state.url}
                            />
                            <Marker position={position} icon={this.state.isError ? iconError : icon}>

                                <Popup>
                                    ISS <br />Real Time
                            </Popup>
                            </Marker>

                        </Map>


                        <div className='choosemap'>
                            <button onClick={this.tileLayer}>
                                <img src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" alt="" />
                            </button>
                            <button onClick={this.tileLayer2}>
                                <img src="./img/map2.png" alt='' />
                            </button>
                            <button onClick={this.tileLayer3}>
                                <img src='./img/map1.png' alt='' />
                            </button>

                        </div>

                    </div>

                    <div className="video">

                        <iframe className='livestream' src="https://ustream.tv/embed/9408562?autoplay=true" scrolling="no" allowFullScreen style={{ "border": "none" }} title="iss"></iframe>
                    </div>

                </div>
            </div>
        )
    }
}



export default SimpleExample 