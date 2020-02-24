import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ResponsiveMenu from 'react-responsive-navbar';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavigationBar.css';


const Menu = styled.div`
  border-bottom: 4px solid #b2ebf9;
  background-color: black;
  ul {
    padding-top: 10px;
    padding-left: 0;
  }
  li {
    display: inline;
    font-size: 13px;
    list-style-type: none;
    margin-left: 30px;
  }
  a {
    text-decoration: none;
    text-transform: uppercase;
    font-size: 23px;
    color: #b2ebf9;
    }

    a:hover {
        color: white;
        background-color: black; 
        text-decoration: none; 
    }

    
  
  @media (max-width: 750px) {
    padding: 10px 0;
    
    li {
      padding: 10px 0;
      display: block;
      margin-left: 0;
    }
  }

`;




class NavigationBar extends Component {
    render(){
        return (
        <div>
            <ResponsiveMenu
              menuOpenButton={<FaBars size={45} color="#b2ebf9" />}
              menuCloseButton={<FaTimes size={45} color="#b2ebf9" />}
              changeMenuOn="750px"
              largeMenuClassName="large-menu"
              smallMenuClassName="small-menu"
              menu={
                <Menu>
                  <ul>
                    <li><NavLink exact to="/WhereISS" activeClassName="selected">ISS</NavLink></li>
                    <li><NavLink exact to="/Challenge" activeClassName="selected">Challenge</NavLink></li>
                    <li><NavLink exact to="/" activeClassName="active"><img src="https://res.cloudinary.com/dzvkdhu9c/image/upload/v1573582930/ISS/ee100ff4-c375-4258-9e2d-de5ee7240801_200x200_pguolh.png" className="logo" alt=""/></NavLink></li>
                    <li><NavLink exact to="/Sighting" activeClassName="selected">Sighting</NavLink></li>
                    <li><NavLink exact to="/Crew" activeClassName="selected">Crew</NavLink></li>
                  </ul>
                </Menu>
              }
            />
        </div>
        );  
    }
}
    
export default NavigationBar;