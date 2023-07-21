/* eslint-disable react/prop-types */
import classes from './auth.module.css';
import FormButton from './FormButton';
import useForm from '../../hooks/useForm';
import { useEffect, useState } from 'react';


function Register({ dispatch}) {

    const [ formButtonDisabled, setFormButtonDisabled ] = useState(true);

    const validateFullName = () =>{
        return FullName.length > 3 && FullName.includes(" ");
    }

    const validateEmail = () =>{
        return Email.length > 3 && Email.includes("@");
    }

    const validatePassword = () =>{
        return Password.length > 6;
    }

    const validateConfirmPassword = () =>{
        return Password === ConfirmPassword;
    }


    const {
        handleBlurForm: handleBlurFullName,
        handleInputForm: handleFullName,
        value: FullName,
        error: FullNameError,
        reset: resetFullName
    } = useForm(validateFullName);

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

    const {
        handleBlurForm: handleBlurConfirmPassword,
        handleInputForm: handleConfirmPassword,
        value: ConfirmPassword,
        error: ConfirmPasswordError,
        reset: resetConfirmPassword
    } = useForm(validateConfirmPassword);

    const notFormError = (FullNameError && EmailError && PasswordError && ConfirmPasswordError) ? true : false;

       useEffect(()=>{
        if(notFormError){
            setFormButtonDisabled(false)
        }else{
            setFormButtonDisabled(true)
        }
    }, [notFormError]);

    const registerSubmitHandler = (e) =>{
        e.preventDefault();
        if(notFormError){
            setFormButtonDisabled(false);
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
    
            resetConfirmPassword();
            resetEmail();
            resetFullName();
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
        <form onSubmit={registerSubmitHandler}>
            <div className={classes["input-container"]}>
                <label htmlFor='FullName'>FullName</label>
                <input required onChange={handleFullName} onBlur={handleBlurFullName} value={FullName} id="FullName" type="text" placeholder="e.g John Doe"/>
                {FullNameError === false && <span className={classes.error}>Full name is not valid</span>}
            </div>
      
            <div className={classes["input-container"]}>
                <label htmlFor='Email'>Email</label>
                <input required onChange={handleEmail} onBlur={handleBlurEmail} value={Email} id='Email'  type="email" placeholder="e.g example@gmail.com"/>
                {EmailError === false && <span className={classes.error}>email is not valid</span>}
            </div>

            <div className={classes["input-container"]}>
                <label htmlFor='password'>Password</label>
                <input required onChange={handlePassword} onBlur={handleBlurPassword} value={Password} id="password" type="password"/>
                {PasswordError === false && <span className={classes.error}>password is not valid</span>}
            </div>
    
            <div className={classes["input-container"]}>
                <label htmlFor='confirmPasswrod'>Confirm Password</label>
                <input required onChange={handleConfirmPassword} onBlur={handleBlurConfirmPassword} value={ConfirmPassword} id='confirmPassword' type="password"/>
                {ConfirmPasswordError === false && <span className={classes.error}>confirm password not valid</span>}
            </div>
            
            <FormButton text="Register" disabled={formButtonDisabled}/>
        </form>
        
  )
}

export default Register