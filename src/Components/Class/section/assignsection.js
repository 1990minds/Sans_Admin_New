import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Breadcrumbs, Card, MenuItem, Typography } from "@mui/material";
import { Fullscreen } from "@mui/icons-material";
import {fetchOneSection, sectionSelector, updateSection } from "../../../api/section";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Select, FormControl, InputLabel } from '@mui/material';
import { fetchAllTeacher, teacherSelector } from "../../../api/teacher";
import '../index.css'


const AssignSectionForm = () => {


    const dispatch = useDispatch()
    const nav = useNavigate()
    const {id} = useParams()
    const {current_section} = useSelector(sectionSelector)
    const {all_teacher} = useSelector(teacherSelector)

console.log(all_teacher)
console.log(current_section)

  const [sectionData, setSectionData] = useState({
    section_name: "",
    teacher: "",

  });
  


  useEffect(()=>{
  dispatch(fetchOneSection(id))   
  dispatch(fetchAllTeacher())
  }, [id])




    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        console.log(name)
        setSectionData({ ...sectionData, [name]: value });
      }
  
  
  useEffect(() => {
    if (current_section) {
    setSectionData({
       section_name: current_section?.section_name || '',
       teacher: current_section?.teacher?._id|| '',
        
      });
    }
  }, [current_section]);







  const onFinish = (e) => {
    e.preventDefault();

    const SectionData ={

        section_name: sectionData.section_name,
        teacher: sectionData.teacher,

    }
    
    console.log("Section data submitted:", SectionData);
    dispatch(updateSection(SectionData, id))
    nav(-1)
  
  };

  const buttonStyle = {
    // marginLeft: 'auto',
    marginTop:'40px',
    width:'200px',
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

<Typography gutterBottom variant="h6" style={{marginBottom:'8px'}}>Teacher Assign</Typography>

<Breadcrumbs   aria-label="breadcrumb" style={{marginLeft:'6px', marginBottom:'60px'}}>
  <Link underline="hover" color="inherit" to='/'>
    Home
  </Link>
  <Link underline="hover" color="inherit" to='/class'>
    Grade
  </Link>
  <Typography underline="hover" color="inherit" >
    {current_section?.section_name}
  </Typography>
 
  </Breadcrumbs>



    <form onSubmit={onFinish}>
     

      <div style={{width:'600px'}}>

       

        <Grid item className="mb-20" xs={8} sm={2}>
        <TextField
        name="section_name"
        label="Section name"
        value={sectionData.section_name}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        disabled
        />
        </Grid>

        <div style={{ marginBottom: '24px' }}></div>



     

      <Grid item xs={8} sm={2}>
      <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="teacher-name-label">Teacher Name</InputLabel>
      <Select
      labelId="teacher-name-label"
      id="teacher-name-select"
      name="teacher" 
      value={sectionData?.teacher}
      onChange={handleChange} 
      label="Teacher Name"
      >
      {all_teacher?.map((item) => (
      <MenuItem key={item._id} value={item?._id}>
      {item.personal_details?.name} 
      </MenuItem>
      ))}
      </Select>
      </FormControl>
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

export default AssignSectionForm;