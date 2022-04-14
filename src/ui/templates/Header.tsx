import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, Navigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { grey } from '@mui/material/colors';

import { signOut } from "firebase/auth";
import { AuthContext } from "../../auth/AuthProvider";
import { auth } from '../../firebase/firebase';
import DefaultButton from '../parts/DefaultButton';

const Header = () => {

  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  const logOut = ()=> {
    signOut(auth).then(() => {
      document.location.reload();
    }).catch((e) => {
      console.log(e + ":logOutに失敗しました")
    });
  }

  return (
    <>
    { currentUser?
      <AppBar 
        position='static' 
        sx={{backgroundColor: "#B1F9D0", mb:5}}>
        <Box sx={{ display: 'flex' }}>
          <Typography 
            variant='h4' 
            sx={{ 
              flexGrow: 1,
              my: 4, 
              ml: 7,
              color: "#000",
              fontWeight: 'bold'
            }}
          >
            <Link to="/top" style={{textDecoration: "none", color: "#000"}}>
              Degital Library
            </Link>
          </Typography>
          <LockOpenIcon 
            sx={{
              fontSize: 37, 
              color: grey[900],
              mr: 1,
              mt: 5
            }}
            onClick={()=> navigate('/admin/book')}
          />
          <AccountCircleIcon 
            sx={{
              fontSize: 40, 
              color: grey[900],
              mr: 3,
              mt: 5
            }}
            onClick={()=> navigate(`/user/${currentUser}`)}
          />
          <Box sx={{mt: 5, mr:3}}>
            <DefaultButton
              type="button" 
              onClick={logOut} 
              label={"SIGNOUT"} 
            />  
          </Box>
        </Box>
      </AppBar>
    : <Navigate to="/" />} 
    </>
  );
};

export default Header;

