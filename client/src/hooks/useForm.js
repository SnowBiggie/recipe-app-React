import { useReducer } from "react";


const reducerFun = (state, action) =>{
    if(action.type == "INPUT"){
        return {val: action.val, error: state.error}
    }
    if(action.type == "BLUR"){
        return {val: state.val, error: action.error}
    }
    if(action.type == "RESET"){
        return {val: "", error: null}
    }
    return {val: "", error: false}
}

const useForm = (validate) =>{

    const [ formState, dispatchForm ] = useReducer(reducerFun, {val: "", error: null});

    const handleInputForm = (e) =>{
        dispatchForm({val: e.target.value, type: "INPUT", error: validate()});
    }

    const handleBlurForm = () =>{
        dispatchForm({type: "BLUR", error: validate()})
    }

    const reset = () =>{
        dispatchForm({type: "RESET"})
    }

    return {
        handleBlurForm,
        handleInputForm,
        value: formState.val,
        error: formState.error,
        reset

    }
}

export default useForm;