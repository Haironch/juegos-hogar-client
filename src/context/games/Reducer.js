import { GET_ALL_CHILDS, GET_CHILD_BY_ID } from "../types";


export default (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_CHILD_BY_ID:
            return {...state, child_by_id: payload}
        case GET_ALL_CHILDS:
            return {...state, childs: payload}
        default:
            return state;
    }
}