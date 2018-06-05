import React, { Component } from "react";

class AirplaneDetails extends Component {
    render() {
        const { data, onBackBtnClick } = this.props;
        return (
            <div className="airplane-details">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur autem exercitationem molestias expedita quibusdam possimus blanditiis illo illum nam, et quidem voluptas dolore explicabo dolores nisi ut quia maiores aut.
                <div 
                    className="back-button"
                    onClick={onBackBtnClick}
                >
                    BACK
                </div>
            </div>
        );                
    }
}

export default AirplaneDetails;