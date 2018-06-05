import React, { Component } from "react";
import AirplaneDetails from "./airplane-details";

class AirTraffic extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            showDetails: false, 
            item: undefined 
        };

        this.onBackBtnClick = this.onBackBtnClick.bind(this);
    }

    onBackBtnClick() {
        this.setState({
            showDetails: false,
            item: undefined
        });
    }

    render() {
        const { data } = this.props;
        const { showDetails, item } = this.state;

        if (showDetails) {
            return (
                <AirplaneDetails 
                    data={item} 
                    onBackBtnClick={this.onBackBtnClick} 
                />
            );
        } else {
            return (
                <div className="airplane">
                    {
                        Object.keys(data).map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        this.setState({ 
                                            showDetails: true, 
                                            item 
                                        })
                                    }}
                                >
                                    {`${item}: ${data[item]}`}
                                </div>
                            );
                        })
                    }
                </div>
            );
        }
    }
}

export default AirTraffic;