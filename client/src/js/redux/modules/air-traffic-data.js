import socketIOClient from "socket.io-client";

// Actions
export const SET_USER_GEOLOCATION = "SET_USER_GEOLOCATION";
export const CONNECT_AND_FETCH_DATA_REQUEST = "CONNECT_AND_FETCH_DATA_REQUEST";
export const CONNECT_AND_FETCH_DATA_SUCCESS = "CONNECT_AND_FETCH_DATA_SUCCESS";

// Reducer
const initialState = {
    loading: false,
    coordinates: undefined,
    data: []
};

export default function airTraffic(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER_GEOLOCATION:
            return Object.assign({}, state, {
                coordinates: action.coordinates
            });
        case CONNECT_AND_FETCH_DATA_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case CONNECT_AND_FETCH_DATA_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data
            });
    }
    return state;
}

// Action creators
export function setUserGeolocation(coordinates) {
    return {
        type: SET_USER_GEOLOCATION,
        coordinates
    }
}

export function connectAndFetchData(coordinates) {
    return dispatch => {
        dispatch(connectAndFetchDataRequest());

        if (coordinates && coordinates.latitude && coordinates.longitude) {
            const endpoint = "http://127.0.0.1:5050";
            const socket = socketIOClient(endpoint);
            socket.emit("event", { coordinates });            
            socket.on("FromAPI", data => {
                // console.log(data);
                dispatch(connectAndFetchDataSuccess(data));
            });
        }
    };
}

function connectAndFetchDataRequest() {
    return {
        type: CONNECT_AND_FETCH_DATA_REQUEST
    };
}

function connectAndFetchDataSuccess(data) {
    return {
        type: CONNECT_AND_FETCH_DATA_SUCCESS,
        data
    };
}