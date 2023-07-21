import classes from './MainNavigation.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../UI/Modal';


function MainNavigation() {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () =>{
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }

  return (
    <header className={classes.header}>
        <nav className={classes.nav}>
            <div className={classes.rightNav}>
                <NavLink to="">
                    <img src="/20230613_152217.jpg" alt="logo" className={classes.logo}/>
                </NavLink>
                
                <p className={classes.login} onClick={openModal}>Login/Register</p>
                <NavLink to="create-recipe"
                className={({ isActive }) =>
                isActive ? classes.active : undefined
              }>Create Recipe</NavLink>
            </div>
            
            
            <div className={classes.leftNav}>
                <div className={classes.Avatarsearch}>
                <input type="text" className={classes.input} placeholder='search recipe'/>
                    <div>
                        <SearchIcon sx={{ color: "white" }}/>
                    </div>
                </div>
                
                <Avatar alt='image avatar'sx={{ width: 56, height: 56 }}/>
            </div>
        </nav>
        {
            isOpen && <Modal handleOpen={closeModal}/>
        }
        
    
        
    
    </header>
  )
}

export default MainNavigation