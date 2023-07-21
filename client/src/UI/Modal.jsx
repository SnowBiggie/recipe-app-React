import classes from "./Modal.module.css";
import ReactDOM  from "react-dom";
import Auth from "../components/auth/Auth";

function BackDrop({handleOpen}){
    return (
        <div className={classes.backdrop} onClick={handleOpen}/>
    )
}

function ModalChildren(props){
    return (
        <div className={classes.modal} >
            {props.children}
        </div>
    )
}

function Modal({handleOpen}) {
  return (
    <>
        {
            ReactDOM.createPortal(<BackDrop handleOpen={handleOpen}/>, 
            document.getElementById("backdrop"))
        }
        {
            ReactDOM.createPortal(
            <ModalChildren>
                <Auth handleOpen={handleOpen}/>
            </ModalChildren>, 
            document.getElementById("modal"))
        }
        
    </>
    
  )
}

export default Modal