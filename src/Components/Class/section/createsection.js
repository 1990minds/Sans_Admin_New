import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box , Typography } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Fullscreen } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from "react-router-dom";
import '../index.css'
import { fetchAllStoredclass, storedclassSelector } from "../../../api/storedclass";
import { createsection } from "../../../api/section";
import { fetchAllTeacher } from "../../../api/teacher";


const CreateSectionForm = () => {


    const dispatch = useDispatch()
    const nav = useNavigate()
    const {all_storedclass} = useSelector(storedclassSelector)
    const {id} = useParams()

    console.log(all_storedclass)


  const [sectionData, setSectionData] = useState({
    section_name: "",

  });


  const buttonStyle = {
    background:'#43468B'
  };



console.log(sectionData)

useEffect(()=>{
dispatch(fetchAllTeacher())
},[])


const handleChange = (e) => {
  const { name, value } = e.target;

  console.log(value)
  console.log(name)
  setSectionData({ ...sectionData, [name]: value });
}


  const onFinish = (e) => {
    e.preventDefault();

    const SectionData ={

      section_name: sectionData.section_name,
      class:id

    
    }   
    console.log("Section data submitted:", SectionData);
    dispatch(createsection(SectionData , id))
    setSectionData({
      section_name: "",
  
    });
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
     

<div style={{ margin:'0 auto', padding:'5px', width:'100%' }}>




<Grid container spacing={2}>

     
        <Grid item xs={12} sm={4}>
        <TextField
        name="section_name"
        label="Section Name"
        value={sectionData.section_name}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>


      <Grid item xs={12} sm={4}>
      <Box style={{ display: 'flex' }}>
      <Button 
      type="submit"
      variant="contained"
      style={buttonStyle}
      >
      Create Section
     </Button>
     </Box>
        </Grid>
        </Grid>




     


      </div>


    </form>
    </ThemeProvider>


  );
};

export default CreateSectionForm;