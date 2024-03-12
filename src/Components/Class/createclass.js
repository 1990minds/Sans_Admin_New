import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box , Typography } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Fullscreen } from "@mui/icons-material";
import { createclasses } from "../../api/class";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import './index.css'
import { fetchAllStoredclass, storedclassSelector } from "../../api/storedclass";


const CreateClassesForm = () => {


    const dispatch = useDispatch()
    const nav = useNavigate()
    const {all_storedclass} = useSelector(storedclassSelector)

    console.log(all_storedclass)


  const [classesData, setClassesData] = useState({
    class_name: "",

  });


console.log(classesData)

useEffect(()=>{
dispatch(fetchAllStoredclass())
},[])


const handleChange = (e) => {
  const { name, value } = e.target;

  console.log(value)
  console.log(name)
  setClassesData({ ...classesData, [name]: value });
}


  const onFinish = (e) => {
    e.preventDefault();

    const ClassesData ={

      class_name: classesData.class_name,
    
    }   
    console.log("Classes data submitted:", ClassesData);
    dispatch(createclasses(ClassesData))
    setClassesData({
      class_name: "",
  
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
     

<div style={{ margin:'0 auto', padding:'20px 5px', width:'100%' }}>

<Box marginBottom={6}>
<Typography gutterBottom variant="h5">Grade Details</Typography>
</Box>


<Grid container spacing={2}>

{/* <Grid item xs={12} sm={4}>
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel id="class-name-label">Class Name</InputLabel>
        <Select
          labelId="class-name-label"
          id="class-name-select"
          name="class_name" // Set the name attribute here
          value={classesData.class_name}
          onChange={handleChange}
          label="Class Name"
        >
          {all_storedclass?.map((item) => (
            <MenuItem key={item._id} value={item.class_name}>
              {item.class_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid> */}

     
        <Grid item xs={12} sm={4}>
        <TextField
        name="class_name"
        label="Grade"
        value={classesData.class_name}
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
      color="primary"
      >
      Save
     </Button>
     </Box>
        </Grid>
        </Grid>




     


      </div>


    </form>
    </ThemeProvider>


  );
};

export default CreateClassesForm;