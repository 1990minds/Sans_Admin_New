import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Card, MenuItem, Typography } from "@mui/material";
import { Fullscreen } from "@mui/icons-material";
import {fetchOneClasses, classesSelector, updateClasses } from "../../api/classes";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


const CreateClassesForm = () => {


    const dispatch = useDispatch()
    const nav = useNavigate()
    const {id} = useParams()
    const {current_classes} = useSelector(classesSelector)

console.log(current_classes)

  const [classesData, setClassesData] = useState({
    name: "",
    gender: "",
    qualification: "",
    dob: null,
    contact_no:"",
    email: "",
    alternative_no: "",
    permanent_address:"",
    current_address: "",
    doj: null,
    subject: "",
    ID_no: "",
    // Add more fields as needed
  });
  


  useEffect(()=>{
    dispatch(fetchOneClasses(id))   
    }, [dispatch])




    const handleChange = (e, field) => {
      if (field === "dob") {
        setClassesData({ ...classesData, dob: e });
      } 

      else if(field === "doj"){
        setClassesData({ ...classesData, doj: e });
      }    
      else {
        const { name, value } = e.target;
        setClassesData({ ...classesData, [name]: value });
      }
    };
  
  
  useEffect(() => {
    if (current_classes) {
      setClassesData({
        name: current_classes?.personal_details?.name || '',
        gender: current_classes?.personal_details?.gender || '',
        qualification: current_classes?.personal_details?.qualification || '',
        // dob: current_classes.personal_details.dob || '',
        contact_no:current_classes?.contact_details?.contact_no || '',
        email:current_classes?.contact_details?.email || '',
        alternative_no:current_classes?.contact_details?.alternative_no || '',
        permanent_address:current_classes?.contact_details?.permanent_address || '',
        current_address:current_classes?.contact_details?.current_address || '',
        // doj: current_classes?.personal_details?.doj? dayjs(current_classes.personal_details.doj).format('YYYY-MM-DD'): '',
        subject:current_classes?.school_details?.subject || '',
        ID_no:current_classes?.school_details?.ID_no || '',
      });
    }
  }, [current_classes]);







  const onFinish = (e) => {
    e.preventDefault();

    const ClassesData ={

      personal_details:{
        name: classesData.name,
        gender: classesData.gender,
        dob: classesData.dob,
        qualification: classesData.qualification,
        
      },

      contact_details:{
        contact_no: classesData.contact_no,
        email: classesData.email,
        alternative_no: classesData.alternative_no,
        permanent_address: classesData.permanent_address,
        current_address: classesData.current_address,
      },

      school_details:{
        doj: classesData.doj,
        subject: classesData.subject,
        ID_no: classesData.ID_no,
  
      }

    }
    
    console.log("Classes data submitted:", ClassesData);
    dispatch(updateClasses(ClassesData, id))
    nav('/classess')
  };

  const buttonStyle = {
    marginLeft: 'auto',
    marginTop:'20px',
    
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
    <form onSubmit={onFinish}>
     

<div style={{ margin:'0 auto', padding:'20px 5px', width:'100%' }}>

<Typography gutterBottom variant="h5">Edit Grade</Typography>


        <Box marginBottom={2}>
        <Typography gutterBottom variant="h7">Personal Details</Typography>
        </Box>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
        <TextField
        name="name"
        label="Full name"
        value={classesData.name}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>


        <Grid item xs={12} sm={4}>
        <TextField
          select
          name="gender"
          label="Gender"
          value={classesData.gender}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
      </Grid>


        <Grid item xs={12} sm={4}>
        <TextField
        name="qualification"
        label="Qualification"
        value={classesData.qualification}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>
        </Grid>

        <div style={{ marginBottom: '16px' }}></div>
       
        <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="dob"
          label="Date of birth"
          value={classesData.dob}
          onChange={(date) => handleChange(date, "dob")} // Pass "dob" as the field parameter
          fullWidth
          required
          className="custom-datepicker"
          renderInput={(props) => <TextField {...props}  />}
        />
        </LocalizationProvider>
      </Grid>


        {/* <Grid item xs={12} sm={4}>
        <TextField
        name="gender"
        label="Gender"
        value={classesData.gender}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>


        <Grid item xs={12} sm={4}>
        <TextField
        name="subject"
        label="Subject"
        value={classesData.subject}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid> */}
        </Grid>



        <div style={{ marginBottom: '26px' }}></div>
        <Box marginBottom={2}>
        <Typography gutterBottom variant="h7" mb={10}>Contact Details</Typography>
        </Box>


        <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
        <TextField
        name="contact_no"
        label="Contact no"
        value={classesData.contact_no}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>


        <Grid item xs={12} sm={4}>
        <TextField
        name="email"
        label="Email"
        value={classesData.email}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>


        <Grid item xs={12} sm={4}>
        <TextField
        name="alternative_no"
        label="alternative no"
        value={classesData.alternative_no}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>
        </Grid>

        <div style={{ marginBottom: '16px' }}></div>

        <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
        <TextField
        name="permanent_address"
        label="Permanent address"
        value={classesData.permanent_address}
        onChange={handleChange}
        fullWidth
        required
        multiline 
        rows={4} 
        size="small"
        />
        </Grid>


        <Grid item xs={12} sm={4}>
        <TextField
        name="current_address"
        label="Current address"
        value={classesData.current_address}
        onChange={handleChange}
        fullWidth
        required
        multiline 
        rows={4} 
        size="small"
        />
        </Grid>


        {/* <Grid item xs={12} sm={4}>
        <TextField
        name="doj"
        label="doj"
        value={classesData.doj}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        style={{ height: '10px' }}
        />
        </Grid> */}
        </Grid>




        <div style={{ marginBottom: '26px' }}></div>
        <Box marginBottom={2}>
        <Typography gutterBottom variant="h7">Joining Details</Typography>
        </Box>


        <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="doj"
          label="Date of joining"
          value={classesData.doj}
          onChange={(date) => handleChange(date, "doj")} // Pass "dob" as the field parameter
          fullWidth
          required
          size="small"
          className="custom-datepicker"
          renderInput={(props) => (
          <TextField {...props} />)}/>
        </LocalizationProvider>
        </Grid>


        <Grid item xs={12} sm={4}>
        <TextField
        name="subject"
        label="Subject"
        value={classesData.subject}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>


        <Grid item xs={12} sm={4}>
        <TextField
        name="ID_no"
        label="ID no"
        value={classesData.ID_no}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        style={{ height: '10px' }}
        />
        </Grid>
        </Grid>



      <Box style={{ display: 'flex' }}>
      <Button
      gutterTop
      type="submit"
      variant="contained"
      color="primary"
      style={buttonStyle}
      >
    Save
     </Button>
     </Box>


      </div>


    </form>
    </ThemeProvider>
  );
};

export default CreateClassesForm;