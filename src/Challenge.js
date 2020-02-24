import React from 'react';
import './Challenge.css';
import questionsFromQuestBank from './questbank.js';
import QuestionBox from './QuestionBox.js';
import Result from './Results.js';
import { Card }  from 'react-bootstrap'

class Challenge extends React.Component {
    state = {
        questions: questionsFromQuestBank,
        score: 0,
        responses: 0,
    };

    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 6 ? this.state.responses + 1 : 6
        });
    }

    playAgain = () => {
        this.setState({
            score: 0,
            responses: 0,
        })
    }

    render() {
        return (
            <div className="maincontent">
                <div className="challenge-title">
                    <h1>Challenge</h1>
                </div>
                <div className="challenge-subtitle">
                    <p>Test your knowledge about space. Don't worry: this is not Rocket Science!</p>
                </div>
                <div className="challenge-container">
                    {this.state.responses < 6 && 
                        this.state.questions.map (
                        ({ question, answers, correct, questionID }) => (
                            <Card style={{ width: '30%', backgroundColor: 'transparent', margin: '5px'}} key={question}>
                            <div className="card-body-custom">
                                    <QuestionBox 
                                    question={question} 
                                    options={answers} 
                                    key={questionID}
                                    selected={answer => this.computeAnswer(answer, correct)}
                                    />
                            </div>
                            </Card>
                        )
                    )}

                    {this.state.responses === 6 ? (
                            <Card style={{ width: '18 rem', backgroundColor: 'transparent'}}>
                            <Card.Body>
                                <Card.Text>
                                    <Result score={this.state.score} playAgain={this.playAgain} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ) : null}
                </div>
            </div>
        );
    }
}


export default Challenge;