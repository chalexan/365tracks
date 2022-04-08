const initial = {
    orders: [],
    coords: [],
    adresses: [],
    updString: null,
    geoJSONData: null,
}
export default function reducer(state = initial, action) {
    switch (action.type) {
        case "SET_ORDERS": {
            return {
                ...state, orders: action.payload
            }
        }
        case "SET_ADRESSES": {
            return {
                ...state, adresses: action.payload
            }
        }
        case "SET_COORDINATES": {
            return {
                ...state, coords: action.payload
            }
        }
        case "SET_GEOJSON": {
            return {
                ...state, geoJSONData: action.payload
            }
        }
        case "UPD": {
            return {
                ...state, updString: action.payload
            }
        }
    }
    return state
}