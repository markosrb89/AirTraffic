import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Geolocator from "./geolocator";
import AirTraffic from "./air-traffic";
import AirplaneDetails from "./airplane-details";
import { connectAndFetchData, setUserGeolocation } from "../redux/modules/air-traffic-data";

class App extends Component {
    constructor(props) {
        super(props);

        this.renderData = this.renderData.bind(this);
        this.createConnection = this.createConnection.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        let geolocator = new Geolocator();

        geolocator.getCurrentPosition()
            .then((geolocation) => {
                const latitude = geolocation.coordinates.latitude;
                const longitude = geolocation.coordinates.longitude;

                dispatch(setUserGeolocation({ latitude, longitude }))
                this.createConnection();
            })
            .catch((error) => {
                throw error;
            });
    }

    componentDidUpdate(prevProps, prevState) {
        const { airTraffic } = this.props;

        if (prevProps.airTraffic !== airTraffic.coordinates) {
            return (<AirTraffic data={airTraffic.data} />);
        }
    }

    createConnection() {
        const { dispatch, airTraffic } = this.props;

        if (airTraffic.coordinates) {
            dispatch(connectAndFetchData(airTraffic.coordinates));
        }
    }

    renderData() {
        const { airTraffic } = this.props;

        if (airTraffic.loading) {
            return (
                <div className="loading-wrapper">
                    <div className="loading-spinner">
                        <i className="fa fa-spinner fa-spin spinner-icon" />
                    </div>
                </div>
            );
        } else {
            return (<AirTraffic data={airTraffic.data} />);
        }
    }

    render() {
        const { airTraffic } = this.props;
        
        return (
            <div className="wrapper">
                {airTraffic.coordinates ? this.renderData() : null}
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    airTraffic: PropTypes.object
};

const mapStateToProps = (state) => ({
    airTraffic: state.airTraffic
});

export default connect(mapStateToProps)(App);