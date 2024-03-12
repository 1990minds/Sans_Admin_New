import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Card, MenuItem, Typography } from "@mui/material";
import { Fullscreen } from "@mui/icons-material";
import {fetchOneTeacher, teacherSelector, updateTeacher } from "../../api/teacher";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams, Link } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import dayjs from "dayjs";
import AssaignTable from "./assaigntable";


const AssaignTeacherForm = () => {


    const dispatch = useDispatch()
    const nav = useNavigate()
    const {id} = useParams()
    const {current_teacher} = useSelector(teacherSelector)

console.log(current_teacher)

  const [teacherData, setTeacherData] = useState({
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
    dispatch(fetchOneTeacher(id))   
    }, [dispatch])




    const handleChange = (e, field) => {
      if (field === "dob") {
        setTeacherData({ ...teacherData, dob: e });
      } 

      else if(field === "doj"){
        setTeacherData({ ...teacherData, doj: e });
      }    
      else {
        const { name, value } = e.target;
        setTeacherData({ ...teacherData, [name]: value });
      }
    };
  
  
  // useEffect(() => {
  //   if (current_teacher) {
  //     setTeacherData({
  //       name: current_teacher?.personal_details?.name || '',
  //       gender: current_teacher?.personal_details?.gender || '',
  //       qualification: current_teacher?.personal_details?.qualification || '',
  //       // dob: current_teacher.personal_details.dob || '',
  //       contact_no:current_teacher?.contact_details?.contact_no || '',
  //       email:current_teacher?.contact_details?.email || '',
  //       alternative_no:current_teacher?.contact_details?.alternative_no || '',
  //       permanent_address:current_teacher?.contact_details?.permanent_address || '',
  //       current_address:current_teacher?.contact_details?.current_address || '',
  //       // doj: current_teacher?.personal_details?.doj? dayjs(current_teacher.personal_details.doj).format('YYYY-MM-DD'): '',
  //       subject:current_teacher?.school_details?.subject || '',
  //       ID_no:current_teacher?.school_details?.ID_no || '',
  //     });
  //   }
  // }, [current_teacher]);







  const onFinish = (e) => {
    e.preventDefault();

    const TeacherData ={

      personal_details:{
        name: teacherData.name,
        gender: teacherData.gender,
        dob: teacherData.dob,
        qualification: teacherData.qualification,
        
      },

      contact_details:{
        contact_no: teacherData.contact_no,
        email: teacherData.email,
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
    dispatch(updateTeacher(TeacherData, id))
    nav('/teachers')
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

<Typography gutterBottom variant="h6" >Teacher {current_teacher?.personal_details?.name} Details</Typography>

<Breadcrumbs style={{marginBottom:'50px'}}  aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to='/'>
    Home
  </Link>
  <Link underline="hover" color="inherit" to='/teachers'>
    Teachers
  </Link>
  <Typography color="text.primary">{current_teacher?.personal_details?.name}</Typography>
  </Breadcrumbs>



    <form onSubmit={onFinish}>
     

<div className="flex gap-8 " >
<div >



<Card sx={{ width: '397px',  backgroundColor: '#F1F2F4', borderRadius:'17px' }}>
  <Box ml={2} mt={2}>
  <Typography color="#292F8F" fontSize='12px' >Name</Typography>
  <Typography fontSize='16px' fontWeight='400' >{current_teacher?.personal_details?.name || 'null'}</Typography>

  <br/>

  <Grid container spacing={6} mb={2} >
  <Grid item >
  <div style={{marginBottom:'8px'}} >
  <Typography color="#292F8F" fontSize={12}  >Date of Joining</Typography>
  <Typography fontSize={16} fontWeight={400} >{dayjs(current_teacher?.personal_details?.doj).format('DD-MM-YYYY') || 'null'}</Typography>
  </div>
 
  <div style={{marginBottom:'8px'}}>
  <Typography color="#292F8F" fontSize={12}  >Qualification</Typography>
  <Typography fontSize={16} fontWeight={400} >{current_teacher?.personal_details?.qualification || 'null'}</Typography>
  </div>

  <div style={{marginBottom:'8px'}} >
  <Typography color="#292F8F" fontSize={12}  >Date of Birth</Typography>
  <Typography fontSize={16} fontWeight={400} >{dayjs(current_teacher?.personal_details?.dob).format('DD-MM-YYYY') || 'null'}</Typography>
  </div>
 
  <div style={{marginBottom:'8px'}}>
  <Typography color="#292F8F" fontSize={12}  >Phone</Typography>
  <Typography fontSize={16} fontWeight={400} >{current_teacher?.contact_details?.contact_no || 'null'}</Typography>
  </div>


  <div style={{marginBottom:'8px'}}>
  <Typography color="#292F8F" fontSize={12}  >Current Address</Typography>
 <div color="#292F8F" fontSize={12}  style={{ wordWrap: 'break-word', width: '150px' }}>
    {current_teacher?.contact_details?.current_address || 'null'}
  </div>
  </div>
  </Grid>

  <Grid item>
  <div style={{marginBottom:'8px'}} >
  <Typography color="#292F8F" fontSize={12}  >Gender</Typography>
  <Typography fontSize={16} fontWeight={400} >{current_teacher?.personal_details?.gender || 'null'}</Typography>
  </div>
 
  <div style={{marginBottom:'8px'}}>
  <Typography color="#292F8F" fontSize={12}  >Major in</Typography>
  <Typography fontSize={16} fontWeight={400}>{current_teacher?.school_details?.subject || 'null'}</Typography>
  </div>

  <div style={{marginBottom:'8px'}} >
  <Typography color="#292F8F" fontSize={12}  >Email</Typography>
  <Typography fontSize={16} fontWeight={400} >{current_teacher?.contact_details?.email || 'null'}</Typography>
  </div>
 
  <div style={{marginBottom:'8px'}}>
  <Typography color="#292F8F" fontSize={12}  >Alternate Phone</Typography>
  <Typography fontSize={16} fontWeight={400}>{current_teacher?.contact_details?.alternative_no || 'null'}</Typography>
  </div>

  <div style={{ marginBottom: '8px' }}>
  <Typography color="#292F8F" fontSize={12}>Perm. Address</Typography>
  <div style={{ fontSize: 16, fontWeight: 400, wordWrap: 'break-word', width: '150px' }}>
    {current_teacher?.contact_details?.permanent_address || 'null'}
  </div>
</div>


  </Grid>
  </Grid>

</Box>

</Card>
</div>

<div style={{ flex: 1 }} className="mt-2">
  <AssaignTable/>
</div>
      </div>


    </form>
    </ThemeProvider>
  );
};

export default AssaignTeacherForm;