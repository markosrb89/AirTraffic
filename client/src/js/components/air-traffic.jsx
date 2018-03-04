import React, { Component } from "react";

class AirTraffic extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <div className="air-traffic-wrapper">
                {
                    Object.keys(data).map((item, index) => {
                        return (
                            <div key={index}>
                                {`${item}: ${data[item]}`}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default AirTraffic;