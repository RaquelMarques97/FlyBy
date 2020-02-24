import React, { Component } from 'react';
import { Viewer, Entity, CameraFlyTo, Globe } from "resium";
import { Resource, Cartesian3, HorizontalOrigin, VerticalOrigin } from "cesium";

class Globe3D extends Component {

  constructor(props) {
    super(props);

    this.state = {
      position: null,
      flyTo: Cartesian3.fromDegrees(0.0, 0.0, 800000.0),
      followIss: false,
      wcsPosition: Cartesian3.fromDegrees(-9.146001, 38.724827, 0.0),
      myPosition: null,
      distanceToWcs: 0,
      distanceToMe: 0
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        myPosition: Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 0.0)
      });
    });
  }

  componentDidMount() {
   const intervalID = setInterval(() => {
      Resource.fetchJson('https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json').then((data) => {
        var lng = parseFloat(data.iss_position.longitude);
        var lat = parseFloat(data.iss_position.latitude);

        this.setState({
          position: Cartesian3.fromDegrees(lng, lat, 408000.0),
          flyTo: Cartesian3.fromDegrees(lng, lat, 10000000.0),
        });
        this.distanceCalc();
      });
   }, 3000);
   this.setState({ intervalID: intervalID });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
}

  toggleIss = () => {
    this.setState({ followIss: !this.state.followIss });
  }

  distanceCalc = () => {
    this.setState({ distanceToWcs: Math.round(Cartesian3.distance(this.state.position, this.state.wcsPosition) / 1000) });

    if (this.state.myPosition !== null) {
      this.setState({ distanceToMe: Math.round(Cartesian3.distance(this.state.position, this.state.myPosition) / 1000) });
    }
  }

  render() {
    return (
      <div className='globe'>
        <Viewer timeline={false} homeButton={false} navigationHelpButton={false} animation={false} style={{ height: 'calc(100vh - 175px)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 10, left: 10, textAlign: 'left' }}>
            <button className='follow' onClick={() => { this.props.history.push('/WhereISS') }}>&lt; Go back</button>
            <button className='back' onClick={this.toggleIss}>{this.state.followIss ? 'Unfollow ISS' : 'Follow ISS'}</button>
            <div>
              <h5 style={{ color: '#b2ebf9', textShadow: '2px 2px 3px #000' }}>Distance to WCS: {this.state.distanceToWcs} km</h5>
              <h5 style={{ color: '#b2ebf9', textShadow: '2px 2px 3px #000' }}>Distance to me: {this.state.distanceToMe} km</h5>
            </div>
          </div>
          <Globe enableLighting />
          {this.state.position !== null ? <Entity position={this.state.position} billboard={{ image: 'iss.png' }} /> : null}
          {this.state.position !== null && this.state.followIss ? <CameraFlyTo destination={this.state.flyTo} /> : null}
          {this.state.position !== null && !this.state.followIss ? <CameraFlyTo destination={this.state.flyTo} once={true} /> : null}
          <Entity position={this.state.wcsPosition} billboard={{ image: 'wcs.png', width: 48, height: 59, horizontalOrigin: HorizontalOrigin.CENTER, verticalOrigin: VerticalOrigin.BOTTOM }} />
          <Entity position={this.state.myPosition} billboard={{ image: 'pin.png', width: 100, height: 59, horizontalOrigin: HorizontalOrigin.CENTER, verticalOrigin: VerticalOrigin.BOTTOM }} />
        </Viewer>
      </div>

    );
  }
}

export default Globe3D;