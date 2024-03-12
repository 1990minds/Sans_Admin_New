import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Breadcrumbs, MenuItem , Typography } from "@mui/material";
import axios from "axios";
import { keyUri, config } from '../../key'
import { createteacher } from "../../api/teacher";
import { useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './index.css'
import { useDebounce } from "use-debounce";




const CreateTeacherForm = () => {

    const dispatch = useDispatch()
    const nav = useNavigate()
    const [search, setSearch] = useState('')
    const [debouncedText] = useDebounce(search, 2000)
    const [flag, setFlag] = useState()
    const [isEmailValid, setIsEmailValid] = useState(true);

  const [teacherData, setTeacherData] = useState({
    name: "",
    gender: "",
    qualification: "",
    dob: null,
    contact_no:"",
    email: "",
    password:"",
    alternative_no: "",
    permanent_address:"",
    current_address: "",
    doj: null,
    subject: "",
    ID_no: "",
  });

  console.log(teacherData)



  useEffect(() => {
    axios.get(keyUri.BACKEND_URI + `/checkteacher?search=${debouncedText}`)
         .then(({ data }) => {
          setFlag(data?.msg);})
         .catch((error) => {
        console.error('AxiosError:', error);
        });
  }, [debouncedText]);

 console.log(flag)

 const mailExist = async(e) =>{
   console.log(e.target.value)
   setSearch(e.target.value)
 }


 const handleChange = (e, field) => {
  if (field === "dob") {
    setTeacherData({ ...teacherData, dob: e });
  } else if (field === "doj") {
    setTeacherData({ ...teacherData, doj: e });
  } else {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });

    // Email validation
    if (name === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const isEmailValid = emailRegex.test(value);
      setIsEmailValid(isEmailValid);
    }
  }
};



  const onFinish = (e) => {
    e.preventDefault();

    const TeacherData ={

      personal_details:{
        name: teacherData.name,
        gender: teacherData.gender,
        dob: teacherData.dob,
        qualification:teacherData.qualification,
        
      },

      contact_details:{
        contact_no: teacherData.contact_no,
        email: teacherData.email,
        password:teacherData.password,
        alternative_no: teacherData.alternative_no,
        permanent_address: teacherData.permanent_address,
        current_address: teacherData.current_address,
      },

      school_details:{
        doj: teacherData.doj,
        subject: teacherData.subject,
        ID_no: teacherData.ID_no,
  
      }

    }
    
    console.log("Teacher data submitted:", TeacherData);
    dispatch(createteacher(TeacherData))
    nav('/teachers')
  };

  const buttonStyle = {
    marginLeft: 'auto',
    marginTop:'20px',
    background:'#43468B'
    
    
  };
  const theme = createTheme({
    overrides: {
    MuiInputBase: {
    input: {
    padding: '4px 6px', // Adjust padding to your preference
    height: '16px', // Adjust height to decrease it
    },
    },
    },
  });

 
  return (

    <ThemeProvider theme={theme}>


<Typography gutterBottom variant="h6">Create Teacher</Typography>


  <Breadcrumbs   aria-label="breadcrumb" >
  <Link underline="hover" color="inherit" to='/'>
    Home
  </Link>
  <Link underline="hover" color="inherit" to='/teachers'>
    Teachers
  </Link>
  </Breadcrumbs>

<form onSubmit={onFinish}>
<div style={{ margin:'0 auto', padding:'5px', width:'100%' }}>



<Box marginBottom={3}>
<Typography gutterBottom fontSize={16} mt={8}>Personal Details</Typography>
</Box>
        <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
        <TextField
        name="name"
        label="Full name"
        value={teacherData.name}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
          select
          name="gender"
          label="Gender"
          value={teacherData.gender}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
      </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="qualification"
        label="Qualification"
        value={teacherData.qualification}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>
   
        <Grid item xs={6} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="dob"
          label="Date of birth"
          value={teacherData.dob}
          onChange={(date) => handleChange(date, "dob")} // Pass "dob" as the field parameter
          fullWidth
          className="custom-datepicker"
          renderInput={(props) => <TextField {...props}  />}
        />
        </LocalizationProvider>
        </Grid>

        </Grid>



        <div style={{ marginBottom: '26px' }}></div>
        <Box marginBottom={3}>
        <Typography gutterBottom  fontSize={16}>Contact Details</Typography>
        </Box>
        <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
        <TextField
        name="contact_no"
        label="Contact no"
        value={teacherData.contact_no}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{inputProps: {maxLength: 10,},}}
        error={teacherData?.contact_no?.length > 0 && teacherData?.contact_no?.length < 10}
        helperText={teacherData?.contact_no?.length > 0 && teacherData?.contact_no?.length < 10? 'Please enter a correct 10-digit number': ''}
        />
        </Grid>

        <Grid item xs={6} sm={3}>
        <TextField
        name="alternative_no"
        label="Alternative no"
        value={teacherData.alternative_no}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{inputProps: {maxLength: 10,},}}
        error={teacherData?.alternative_no?.length > 0 && teacherData?.alternative_no?.length < 10}
        helperText={teacherData?.alternative_no?.length > 0 && teacherData?.alternative_no?.length < 10? 'Please enter a correct 10-digit number': ''}
        />
        </Grid>

        <Grid item xs={6} sm={3}>
        <TextField
        name="email"
        label="Email"
        value={teacherData?.email}
        onChange={(e) => {
          handleChange && handleChange(e);
          mailExist && mailExist(e);
        }}
        fullWidth
        required
        size="small"
        />
        <p style={{lineHeight:'16px', fontSize:'14px', margin:'0px',color:flag == 'Email already exists'? 'red':'green'}}>{flag == 'Email already exists'?`*${flag}`:''}</p>
        <p style={{lineHeight:'16px', fontSize:'14px', margin:'0px',color: 'red'}}> {isEmailValid ? '' : 'Invalid email format. Please enter a valid email address.'}</p>
        </Grid>
        

        <Grid item xs={6} sm={3}>
        <TextField
          size="small"
          name="password"
          label="Password"
          value={teacherData.password}
          onChange={handleChange}
          required
          fullWidth
          />
          </Grid>    
        </Grid>

        <div style={{ marginBottom: '16px' }}></div>

        <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
        <TextField
          name="permanent_address"
          label="Permanent address"
          value={teacherData.permanent_address}
          onChange={handleChange}
          fullWidth
          multiline 
          rows={4} 
          size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="current_address"
        label="Current address"
        value={teacherData.current_address}
        onChange={handleChange}
        fullWidth
        multiline 
        rows={4} 
        size="small"
        />
        </Grid>
        </Grid>




        <div style={{ marginBottom: '26px' }}></div>
        <Box marginBottom={3}>
        <Typography gutterBottom  fontSize={16}>Joining Details</Typography>
        </Box>


        <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="doj"
          label="Date of joining"
          value={teacherData.doj}
          onChange={(date) => handleChange(date, "doj")} // Pass "dob" as the field parameter
          fullWidth
          size="small"
          className="custom-datepicker"
          renderInput={(props) => (
          <TextField {...props}/>)}/>
        </LocalizationProvider>
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="subject"
        label="Major Subject"
        value={teacherData.subject}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="ID_no"
        label="ID no"
        value={teacherData.ID_no}
        onChange={handleChange}
        fullWidth
        size="small"
        style={{ height: '10px' }}
        />
        </Grid>
        </Grid>



      <Box style={{ display: 'flex' }}>
      <Button 
      type="submit"
      variant="contained"
      color="primary"
      style={buttonStyle}
      >
      Create
     </Button>
     </Box>


      </div>


    </form>
    </ThemeProvider>
  );
};

export default CreateTeacherForm;