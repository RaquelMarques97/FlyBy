import React from "react";
import "./Contact.css";
import "./Youtube.css";
import { Card } from "react-bootstrap";

const Contact = () => {
  return (
    <div className="maincontent">
      <h1>About us</h1>
      <p className="contact-text">
        We developed this project between October and November 2019, as students
        of Wild Code School, in Lisbon. It is our first React App, about a
        subject that we all love: the space. With this project, we improved our
        skills in React.{" "}
      </p>

      <div className="Wrapper">
        <div className="video">
          <iframe className="iframeyt" title="iframeYT"
            src={`https://www.youtube.com/embed/nspThRCVV3A`}
            frameBorder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="contactBox">
          <div className="contactBoxCard">
            <img src="./raquel.png" alt="" height="170" width="170" />
            <Card.Title style={ {color: 'white'}}>Raquel Marques</Card.Title>
            <Card.Link href="https://github.com/RaquelMarques97">
              <img
                src="./GitHub-Mark-Light-120px-plus.png"
                alt=""
                height="50rem"
              ></img>
            </Card.Link>
            <Card.Link href="https://www.linkedin.com/in/ana-raquel-marques-85162679/">
              <img src="./linkedin.png" alt="" height="50rem"></img>
            </Card.Link>
          </div>

          <div className="contactBoxCard">
            <img src="./Janis.png" alt="" height="170" width="170" />
            <Card.Title style={ {color: 'white'}}>Janis Ellerbrock</Card.Title>
            <Card.Text>
              <Card.Link href="https://github.com/Jxnis">
                <img
                  src="./GitHub-Mark-Light-120px-plus.png"
                  alt=""
                  height="50rem"
                ></img>
              </Card.Link>
              <Card.Link href="https://www.linkedin.com/in/janis-ellerbrock-2a6982187/">
                <img src="./linkedin.png" alt="" height="50rem"></img>
              </Card.Link>
            </Card.Text>
          </div>

          <div className="contactBoxCard">
            <img src="./Denise.png" alt="" height="170" width="170" />
            <Card.Title style={ {color: 'white'}}>
              Denise<span> Corrêa</span>
            </Card.Title>
            <Card.Text>
              <Card.Link href="https://github.com/DeniseCorrea">
                <img
                  src="./GitHub-Mark-Light-120px-plus.png"
                  alt=""
                  height="50rem"
                ></img>
              </Card.Link>
              <Card.Link href="https://www.linkedin.com/in/denisewaskowcorrea/">
                <img src="./linkedin.png" alt="" height="50rem"></img>
              </Card.Link>
            </Card.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
