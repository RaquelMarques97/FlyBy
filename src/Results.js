import React from 'react';

const Result = ({ score, playAgain }) => {

    const showGif = () => {
        if (score >= 3 ) {
            return <img className='etAnswer' width='100%' height='100%' src='./ET.gif' alt='' />  
        } else { 
            return <img className='houstonAnswer' width='80%' height='35%' src='./Houston.gif' alt='' /> 
        }
    }

    return (
        <div className="score-board">
            <div className="score">You scored {score} correct answers!</div>
            {showGif()}
            <button className="playBtn" onClick={playAgain}>
                Play again!
            </button>
        </div>
    )
};

export default Result;