import {
    SET_CURRENT_USER,
    USER_LOADING
  } from "../actions/types";
  // const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        // console.log(14)
        // console.log(action.payload)
        return {
          ...state,
          // isAuthenticated: checkEmpty(action.payload),
          isAuthenticated: (action.payload),
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  const checkEmpty = data =>{
    console.log(data)
    if (data===null){
      return false;
    }
    return true;
  }