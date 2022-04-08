import { put, takeEvery, select, call } from "redux-saga/effects"
import orders from "../../db/deliveryPoints"
import adresses from "../../db/adresses"

function getOrders() {
    return orders
}

function getAdresses() {
    return adresses
}

function updateOrders(state) {

    const { updString, orders, adresses } = state;
    const [keyOrder, direction, keyAdress, activeRow] = updString;
    const searchAdress = adresses.filter((el) => el.key == keyAdress)[0];
    const updOrders = orders.map((el) => el.key == keyOrder ? direction == 'f' ? { ...el, fromCoords: searchAdress.coords, fromAddr: searchAdress.name } : { ...el, toCoords: searchAdress.coords, toAddr: searchAdress.name } : el)
    return [updOrders, +activeRow]
}

export function* workerUpdateMap(activeRow, updOrders) {
    yield put({
        type: "SET_COORDINATES",
        payload: [updOrders[+activeRow].fromCoords, updOrders[+activeRow].toCoords]
    })
    yield workerLoadCoordinates();
}

async function getTrackFromAPI(state) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62484a7a6137e035499bb536ba601a7aea06&start=${state.coords[0][1]},${state.coords[0][0]}&end=${state.coords[1][1]},${state.coords[1][0]}`, requestOptions)
    const result = await response.json();
    return result
}

export function* workerLoadCitySaga() {
    const orders = yield getOrders().result;
    yield put({ type: "SET_ORDERS", payload: orders })
    const adresses = yield getAdresses().result;
    yield put({ type: "SET_ADRESSES", payload: adresses })
}

export function* watherLoadCitySaga() {
    yield takeEvery('LOAD_ORDERS', workerLoadCitySaga)
    yield watherLoadCoordinatesSaga();

}

export function* workerLoadCoordinates() {
    const state = yield select();
    console.log('check', state)
    const geojson = yield getTrackFromAPI(state);
    yield put({ type: "SET_GEOJSON", payload: geojson })
}

export function* watherLoadCoordinatesSaga() {
    yield takeEvery('UPD', watherLoadUpdate);
    yield takeEvery('SET_COORDINATES', workerLoadCoordinates)

}

export function* watherLoadUpdate() {
    const state = yield select();
    const [keyOrder, direction, keyAdress, activeRow] = state.updString;
    const upd = updateOrders(state)[0];
    yield put({ type: "SET_ORDERS", payload: upd })
    if (+activeRow + 1 == +keyOrder) {
        yield workerUpdateMap(activeRow, upd)
    }

}


export default function* rootSaga() {
    yield watherLoadCitySaga();
}