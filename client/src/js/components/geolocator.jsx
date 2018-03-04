import React, { Component } from "react";
import { ConnectedRouter } from "react-router-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Geolocator extends Component {
    constructor() {
        super();
        
        if (this.isGeolocationAvailable()) {
            this.navigator = navigator;
        } else {
            return 'Your browser does not support geolocation.';
        }
    }

    isGeolocationAvailable() {
        return 'geolocation' in navigator ? true : false;
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            this.navigator.geolocation.getCurrentPosition((position) => {
                const coordinates = position.coords;
                resolve({ coordinates });
            }, () => { reject('We could not get your location.'); });
        });
    }

    render() {
        return null;
    }
}

export default Geolocator;