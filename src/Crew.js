import React, { Component } from "react";
import "./Crew.css";

class Crew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //    name: '',
      //    biophoto: '',
      //    biophotowidth: '',
      //    biophotoheight: '',
      //    country: '',
      //    countryflag: '',
      //    launchdate: '',
      //    title: '',
      //    biolink: '',
      CrewInfos: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getCrew();
  }

  getCrew = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          // name: data.people.name,
          // biophoto: data.people.biophoto,
          // biophotowidth: data.people.biophotowidth,
          // biophotoheight: data.people.biophotoheight,
          // country: data.people.country,
          // countryflag: data.people.countryflag,
          // launchdate: data.people.launchdate,
          // title: data.people.title,
          // biolink: data.people.biolink,
          CrewInfos: data.people,
          isLoading: false
        });

      },
    //   (error) => {
    //     this.setState({
    //         isLoading: false,
    //         isError: true
    //     });
    // }
      
      
      );
  };

  render() {
    const { CrewInfos, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='loading'>

                   <img className='gif1' width='80%' height='35%' src="./img/iss.gif" alt="" />

                   <p className='searching'>SEARCHING...</p>
               </div>
           )
    }

    return (
      <div className="Crew">
        <div className="CrewTitle">
          <h1>Crew</h1>
            <p className="subheaderCrew">This is the Crew of ISS right now!</p>
        </div>
        <div className="listing">
          {CrewInfos.map(info => (
            <div className="CrewDetails" key={info.name} >
              <div className="Infos">
                <a className="CrewLink"
                  href={info.biolink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <img src={info.biophoto} height={info.biophotoheight} width={info.biophotowidth} className="biopic" /> */}
                  <h2>{info.name}</h2>
                  {/* {info.country} */}
                  </a>
                  <div className="launch">
                  <p className="Since">Since</p>
                  <h4>{info.launchdate}</h4>
                  </div> 
                  
                </div>
                  <div className="align">
                    <img src={info.countryflag} className="flag" alt="" />
                    <h3>{info.title}</h3>
                    
                    
                    <p className="inSpace">In Space</p>
                    
                  </div>
                
              
             
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Crew;
