/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import Card from "../../UI/Card";
import classes from './auth.module.css';
import { useState } from "react";
import Login from "./login";
import Register from "./Register";

const formSubmissionReducer = (state, action) =>{
  // console.log("Error");
  // console.log(action);
  if(action.type === "BEFORE-SUBMIT"){
      return {
          message: action.message,
          popUp: action.popUp,
          color: action.color
      }
  }
  
  if(action.type === "AFTER-SUBMIT"){
      return {
        message: action.message,
        popUp: action.popUp, 
        color: action.color
      }
  }
  if(action.type === "ERROR"){
    return {
      message: action.message,
      popUp: action.popUp, 
      color: action.color
    }
}
  return {
    message: "Please wait, loading...",
    popUp: true,
    color: null
  }
}

function Auth({handleOpen}) {
  const [formOptions, setFormOptions ] = useState("Register");
  const [ submitState, dispatchSubmit ] = useReducer(formSubmissionReducer, {
    message: "Success, redirecting...",
    popUp: false
  }) 
  // const [ submit, setSubmit ] = useState(null);

  const handleFormOptions = (event, param)=>{
    setFormOptions(param);
  }

  return (
        <Card>
          <div className={classes.close} onClick={handleOpen}>
            <h3 >x</h3>
          </div>
          
          <div className={classes["auth-header"]}>
            <h4 onClick={event => handleFormOptions(event, "Register")} className={`${classes["auth-header-content"]} ${formOptions === "Register" ? classes.active : ""} `}>Register</h4>
            <h4 onClick={event => handleFormOptions(event, "Login")} className={`${classes["auth-header-content"]} ${formOptions === "Login" ? classes.active : ""} `}>Login</h4>
          </div>
          {
            submitState.popUp && <div className={`${classes.message} ${submitState.color}`}>{submitState.message}</div>
          }
          
          {formOptions === "Login" ? <Login dispatch={dispatchSubmit}/> : <Register dispatch={dispatchSubmit}/>}
        </Card>
  )
}

export default Auth