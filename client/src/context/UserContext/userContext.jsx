import React, {createContext, useEffect, useReducer} from 'react'
import {userReducer} from './userReducer';

let initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
}

export let userContext = createContext(initialState);

const UserContextProvider = ({children}) => {

    const [state,
        dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <userContext.Provider
            value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider