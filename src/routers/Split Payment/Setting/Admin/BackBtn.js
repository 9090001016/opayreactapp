import React from 'react'
import blue_back from "./../../../../assets/Images/smallicons/blueBack.png"
import { useHistory } from 'react-router-dom';

const BackBtn = () => {
    const navigate = useHistory();
    
    return (
        <div>
            <div className="blue_back_btn" onClick={() => navigate.goBack()}>
                <img src={blue_back} alt="back_btn" />
                <p> Back</p>
            </div>
        </div>
    )
}

export default BackBtn