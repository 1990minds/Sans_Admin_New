import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, FormControl, InputLabel, MenuItem, Select, Breadcrumbs, Typography } from "@mui/material";
import { createexams, examsSelector, fetchOneExams, updateExams } from "../../api/exams";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './index.css'
import { classesSelector, fetchAllClasses } from "../../api/class";
import dayjs from 'dayjs'



const EditExamsForm = () => {


    const dispatch = useDispatch()
    const nav = useNavigate()
    const {all_classes} = useSelector(classesSelector)
    const [selectedClassID, setSelectedClassID] = useState('');
   const {current_exams} = useSelector(examsSelector)
    const {id} = useParams()
    // const [selectedYear, setSelectedYear] = useState()
    const years = Array.from({ length: 31 }, (_, index) => 2023 + index);
    const academicYears = years.map((startYear) => {
      const endYear = startYear + 1;
      return `${startYear}-${String(endYear).slice(2)}`;
    });

    

    console.log(selectedClassID)


  const [examsData, setExamsData] = useState({
    term: "",
    type: "",
    class: "",
    from_date: null,
    to_date:null,
    year:""
  
  });


  console.log(examsData)

    // Define a mapping of term to corresponding types
    const termToTypesMap = {
      Term1: ['FA1', 'FA2', 'SA1'],
      Term2: ['FA3', 'FA4', 'SA2'],
      Term3: ['FA5', 'FA6', 'SA3'],
    };

  const handleChange = (e, field) => {
    if (field === "from_date") {
      setExamsData({ ...examsData, from_date: e });
    } else if (field === "to_date") {
      setExamsData({ ...examsData, to_date: e });
    } else {
      const { name, value } = e.target;
      setExamsData({ ...examsData, [name]: value });
    }
  };


    useEffect(()=>{
      dispatch(fetchAllClasses())
    },[])


    useEffect(()=>{
        dispatch(fetchOneExams(id))
      },[id])

    // useEffect(()=>{
    //   dispatch(fetchClassSection(selectedClassID))
    //   },[selectedClassID])


    useEffect(() => {
        if (current_exams) {
          setSelectedClassID(current_exams?.class?._id)
          setExamsData({
            term: current_exams?.term || '',
            type: current_exams?.type || '',
            from_date: current_exams?.from_date || '',
            to_date: current_exams.to_date || '',
            year:current_exams?.year || ''
          });
        }
      }, [current_exams]);




  const onFinish = (e) => {
    e.preventDefault();

    const ExamsData ={
       
        term: examsData.term,    
        type: examsData.type,
        class: selectedClassID,
        from_date:examsData.from_date,
        to_date: examsData.to_date,
        year:examsData.year
   

     
    }
    
    console.log("Exams data submitted:", ExamsData);
    dispatch(updateExams(ExamsData, id))
    nav('/exams')
  };

  const buttonStyle = {
    background:'#43468B',
    marginTop:'30px',

    
    
  };
  const theme = createTheme({
    overrides: {
    MuiInputBase: {
    input: {
    padding: '4px 6px',
    height: '16px', 
    },
    },
    },
  });

 
  return (

  <ThemeProvider theme={theme}>



<Typography marginBottom={1} variant="h6">Edit Exams</Typography>





  <Breadcrumbs  aria-label="breadcrumb" style={{marginBottom:'40px'}}>
  <Link underline="hover" color="inherit" to='/'>
    Home
  </Link>
  <Link underline="hover" color="inherit" to='/exams'>
    Exams
  </Link>
  </Breadcrumbs>




<form onSubmit={onFinish}>
<div style={{ margin:'0 auto', padding:'5px', width:'100%' }}>


        
        <Grid item xs={12} sm={3} width={395}   mb={3}>
        <TextField
          select
          name="term"
          label="Term"
          value={examsData.term}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        >
          <MenuItem value="Term1">Term 1</MenuItem>
          <MenuItem value="Term2">Term 2</MenuItem>
          <MenuItem value="Term3">Term 3</MenuItem>
        </TextField>
      </Grid>

{/* 
      <Grid item xs={12} sm={6}  width={395}   mb={3}>
        <TextField
          select
          name="type"
          label="Type"
          value={examsData.type}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        >
          <MenuItem value="FA1">FA 1</MenuItem>
          <MenuItem value="FA2">FA 2</MenuItem>
          <MenuItem value="SA1">SA 1</MenuItem>
          <MenuItem value="TERM1">Term Exam</MenuItem>
        </TextField>
      </Grid> */}

{examsData.term && (
            <Grid item xs={12} sm={6} width={395} mb={3}>
              <TextField
                select
                name="type"
                label="Type"
                value={examsData.type}
                onChange={(e) => handleChange(e, 'type')}
                fullWidth
                required
                size="small"
              >
                {termToTypesMap[examsData.term].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}


      <Grid item xs={12} sm={6}  width={395}  mb={3}>
  <FormControl variant="outlined" size="small" fullWidth gutterBottom >
  <InputLabel id="class-name-label" required>Grade</InputLabel>
  <Select
      labelId="class-name-label"
      id="class-name-select"
      name="class"
      label="Grade"
      value={selectedClassID}
      onChange={(e) => setSelectedClassID(e.target.value)}
      >
      {all_classes?.map((item) => (
      <MenuItem key={item._id} value={item._id} >
      {item?.class_name}
      </MenuItem>
      ))}
  </Select>
  </FormControl>
  </Grid>



  <Grid container spacing={2} mb={3}>

        <Grid item xs={6} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker
          name="from_date"
          label="From Date"
          value={examsData.from_date ? dayjs(examsData.from_date) : null}
          onChange={(date) => handleChange(date, "from_date")}
        //   minDate={new Date()}
          fullWidth     
          required
          className="custom-datepicker"
          renderInput={(props) => <TextField {...props}  />}
        />
        </LocalizationProvider>
        </Grid>


        <Grid item xs={6} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="to_date"
          label="To Date"
          value={examsData.to_date ? dayjs(examsData.to_date) : null}
          onChange={(date) => handleChange(date, "to_date")} 
          fullWidth
          required
          className="custom-datepicker"
          renderInput={(props) => <TextField {...props}  />}
        />
        </LocalizationProvider>
        </Grid>

       
      </Grid>



    <Grid item xs={12} sm={6}  width={395}   mb={3}>
        <TextField
          select
          name="year"
          label="Current Academic Year"
          value={examsData.year}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        >
            {academicYears.map((year) => (
      <MenuItem key={year} value={year}>
      {year}
    </MenuItem>
      ))}
        </TextField>
      </Grid>





     

      <Box style={{ display: 'flex' }}>
      <Button 
      type="submit"
      variant="contained"
      color="primary"
      style={buttonStyle}
      >
      Update Exam
     </Button>
     </Box>


      </div>


    </form>
    </ThemeProvider>
  );
};

export default EditExamsForm;