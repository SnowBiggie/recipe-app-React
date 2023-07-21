import classes from './auth.module.css'
function FormButton({text, disabled}) {
  return (
    <button disabled={disabled} type='submit' className={classes.button}>{text}</button>
  )
}

export default FormButton