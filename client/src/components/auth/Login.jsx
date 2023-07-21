/* eslint-disable react/prop-types */
import useForm from '../../hooks/useForm';
import classes from './auth.module.css';
import FormButton from "./FormButton";
import { useState, useEffect } from 'react';


function Login({dispatch}) {

  const [ formButtonDisabled, setFormButtonDisabled ] = useState(false);


  const validateEmail = () =>{
    return Email.length > 3 && Email.includes("@");
}

const validatePassword = () =>{
    return Password.length > 6;
}

  const {
    handleBlurForm: handleBlurEmail,
    handleInputForm: handleEmail,
    value: Email,
    error: EmailError,
    reset: resetEmail
} = useForm(validateEmail);

const {
  handleBlurForm: handleBlurPassword,
  handleInputForm: handlePassword,
  value: Password,
  error: PasswordError,
  reset: resetPassword
} = useForm(validatePassword);
 
  const notFormError = (EmailError && PasswordError) ? true : false;

//   useEffect(()=>{
    
//     if(notFormError){
//         setFormButtonDisabled(false)
//     }else{
//         setFormButtonDisabled(true)
//     }
// }, [notFormError]);

  const loginSubmitHandler = (e) =>{
    e.preventDefault();
    if(notFormError){
      dispatch({
        type: "BEFORE-SUBMIT",
        message: "Please wait, loading...",
        popUp: true,
        color: classes["BEFORE-SUBMIT"]
      })
    try{
        console.log("Submitting...");
    }catch(err){
        dispatch({
            type: "ERROR",
            message: "Failed, Please try again!",
            popUp: true,
            color: classes["pop-error"]
        });
    }
  
    dispatch({
        type: "AFTER-SUBMIT",
        message: "Success! Redirecting",
        popUp: true,
        color: classes["pop-success"]
      });
  
      resetEmail();
      resetPassword();
      window.location.reload();
    }else{
      dispatch({
        type: "ERROR",
        message: "Failed, Please fill the form!",
        popUp: true,
        color: classes["pop-error"]
    });
    }

    
   
  }

  return (
    <form onSubmit={loginSubmitHandler}>
        <div className={classes["input-container"]}>
            <label htmlFor='email'>Email</label>
            <input onChange={handleEmail} onBlur={handleBlurEmail} value={Email} required  id="email" type="email" placeholder="e.g example@gmail.com"/>
            {EmailError === false && <span className={classes.error}>email is not valid</span>}
        </div>
        <div className={classes["input-container"]}>
            <label htmlFor='password'>Password</label>
            <input onChange={handlePassword} onBlur={handleBlurPassword} value={Password} required id='password' placeholder='password' type="password"/>
            {PasswordError === false && <span className={classes.error}>email is not valid</span>}
        </div>
        <FormButton text="Login" disabled={formButtonDisabled}/>
    </form>
  )
}

export default Login