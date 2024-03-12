
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import Logo from './Images/sans.jpeg'
import Logo1 from './Images/sans1.jpeg'
import { useDispatch, useSelector } from 'react-redux';
import { authenticateSelector, fetchlogin } from './api/authSlice';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginImg from './Images/login.png'


const useStyles = makeStyles((theme) => ({
  tertiaryAction: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right'
    }
  },
  actions: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3)
    },
  }
}));


export default function SignIn(props) {

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {isAuthenticate} = useSelector(authenticateSelector)
  const classes = useStyles();
  const [data, setData] = useState({email:'', password:''})
  const nav = useNavigate()
  const dispatch = useDispatch()


  
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if(token){
      nav('/dashboard')
    }else{
      nav('/')
    }
  },[token])

  useEffect(()=>{
    if(isAuthenticate){
      nav('/dashboard');
    }else{
      nav('/')
    }
  },[isAuthenticate])

  const changeHandler = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const submitHandler = (e) => {
    // console.log('first')
    e.preventDefault()
    dispatch(fetchlogin(data))
    // console.log(localStorage.getItem('token'))
    // localStorage.getItem('token') ? nav('/dashboard') : nav('/')
  }
  
  return (
    <section>
      <Box className='flex'>
      <img src={LoginImg} alt='Your Image' className='w-[50%] h-[750px]' />
        <Container maxWidth="xs" className=''>
        <Box className='flex justify-center mt-[55%] '>
        <img className='w-[25%] ' src={Logo} alt='logo' />
        <img className='w-[50%] ' src={Logo1} alt='logo' />
        </Box>
        <Box >
        <Box mb={3} textAlign="center" className='mb-5 mt-5'>
        <Typography variant="h5" component="h2" className='text-center text-indigo-900'>Login to Admin Portal</Typography>
        </Box>
        <Box>
        <form onSubmit={submitHandler}>
        <div>
        <FormControl
         sx={{ width: "100%", marginTop: "10px" }}
         size="small"
         variant="outlined"
         fullWidth
         >
         <InputLabel>Enter Email</InputLabel>
         <OutlinedInput
          type="email"
          required
          label="Enter Email"
          name="email" // Make sure to set the name attribute
          value={data.email}
          onChange={changeHandler}                    
          // You can add more attributes or props as needed
          />
          </FormControl>
          </div>


          <FormControl
           style={{marginTop:'20px'}}
           size="small"
           variant="outlined"
           fullWidth
           >
           <InputLabel htmlFor="outlined-adornment-password">
           Enter Password
          </InputLabel>
           <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
            <InputAdornment position="end">
            <IconButton
             aria-label="toggle password visibility"
             onClick={handleClickShowPassword}
             onMouseDown={handleMouseDownPassword}
             edge="end"
             >
             {showPassword ? (
             <VisibilityOff />
              ) : (
              <Visibility />
              )}
              </IconButton>
              </InputAdornment>
              }
              required
              label="Enter Password"
              name="password"
              value={data.password}
              onChange={changeHandler}
              />
              </FormControl>
    {/* <TextField id="outlined-basic1" required='required' value={data.email} type='email' name='email' label="Email" onChange={changeHandler} variant="outlined" fullWidth /><br></br><br></br> */}
      {/* <TextField id="outlined-basic2" required='required' value={data.password} type='password' name='password' label="Password" onChange={changeHandler} variant="outlined" fullWidth /><br></br><br></br> */}
     <Button variant="contained" color='primary'  type='submit' fullWidth  style={{marginTop:'20px'}}>Login</Button>
       </form> 
          </Box>
        </Box>
      </Container>
      </Box>
    </section>
  );
}

