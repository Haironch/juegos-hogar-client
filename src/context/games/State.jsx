import axios from 'axios'
import React, { useReducer } from 'react'

import GamesReducer from './Reducer'
import GamesContext from './Context'

import { GET_ALL_CHILDS, GET_CHILD_BY_ID } from '../types'

const GamesState = ({children}) => {
    const initialState = {
        childs: [],
        child_by_id: {}
    }

    const [state, dispatch] = useReducer(GamesReducer, initialState);

    // update child
    const getChildByID = async (childId) => {
        const { data } = await axios.get(`/api/child/${childId}`)
        dispatch({
            type: GET_CHILD_BY_ID,
            payload: data
        })
    }

    const getChilds = async() => {
        const { data } = await axios.get("/api/child");
        dispatch({
            type: GET_ALL_CHILDS,
            payload: data
        })
    }

    return (
        <GamesContext.Provider
        value={{
            // child by id: to selecte child in admin panel
            child_by_id: state.child_by_id,
            getChildByID,
            childs: state.childs,
            getChilds,
        }}
        >
        {children}
        </GamesContext.Provider>
    )
}

export default GamesState;