import React from 'react';
import './Image.css';
import { Accordion, Card, Button } from 'react-bootstrap';
import Moment from 'moment';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copyright: '',
            date: '',
            title: '',
            explanation: '',
            url: '',
            isLoading: true,
            imageDate: Moment() // igual a "new Date()"
        }
    }


    componentDidMount() {
        this.getImages();
    }


    getImages = () => {
        var dateToFetch = Moment(this.state.imageDate).format('YYYY-MM-DD'); // 2019-11-18

        // https://api.nasa.gov/planetary/apod ? api_key=...&date=...


        fetch(`https://api.nasa.gov/planetary/apod?api_key=DOJuuz8rSQdh6swCcE5Gk3NLsuMGNTBX8ubSheVQ&date=${dateToFetch}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    copyright: data.copyright,
                    date: data.date,
                    title: data.title,
                    explanation: data.explanation,
                    url: data.url,
                    isVideo: data.media_type === 'video',
                    isLoading: false,
                })
            })
    }

    subtractDate = () => {
        this.setState({
            imageDate: Moment(this.state.imageDate).subtract(1, 'day'),
            isLoading: true
        }, () => this.getImages());
    }

    addDate = () => {
        this.setState({
            imageDate: Moment(this.state.imageDate).add(1, 'day'),
            isLoading: true
        }, () => this.getImages());
    }

    isDisabled = () => {
        return Moment(Moment(this.state.imageDate).format('YYYY-MM-DD')).isSame(Moment().format('YYYY-MM-DD'));
    }

    render() {
        const { isLoading } = this.state;

     
        if (isLoading) {
            return (
                <div className="homepage">
                    <div className="homepage-title">
                        <h1>FlyBy</h1>
                        <p className='subtitle'>OUT OF THIS WORLD APP</p>
                    </div>
                    <div className='loading'>
                        <p className='searching'>SEARCHING...</p>
                    </div>
                </div>
            )
        }
        return (
            <div className="homepage">
                <div className="homepage-title">
                    <h1>FlyBy</h1>
                    <p className='subtitle'>OUT OF THIS WORLD APP</p>
                </div>


                <div className="image-picture">
                    <button className='previous'onClick={this.subtractDate}>Prev</button>
                    
                   
                    {this.state.isVideo ? (
                        <iframe width="560" height="315"
                            title="video of the day"
                            src={this.state.url}
                            frameborder="0"
                            allow="accelerometer; 
                            autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    ) : (
                            <img src={this.state.url} alt=''/>
                        )}
                  
                        <button className='next' onClick={this.addDate} disabled={this.isDisabled()}>Next</button>
                   
                    <div className="image-title">
                        <p>APOD: {this.state.title}</p>                                   
                    </div>
                    
                </div>

                <div className='accordion'>
                    <Accordion defaultActiveKey="0"style={{maxWidth:'60vh', maxHeight:'40vh'}}>
                        <Card style={{ backgroundColor: 'black' }}>
                            <Card.Header style={{ backgroundColor: 'black' }}>
                                <Accordion.Toggle className='accordion'
                                    style={{ backgroundColor: 'black' }}
                                    as={Button} variant="link" eventKey="1">
                                    Want To Know More?
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse style={{ backgroundColor: 'black' }} eventKey="1">
                                <Card.Body>
                                    <div background-color='black' className="image-infos">
                                        <p>Copyright: {this.state.copyright}</p>
                                        <p>{this.state.date}</p>
                                        <p>{this.state.explanation}</p>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        )
    }
};


export default Image