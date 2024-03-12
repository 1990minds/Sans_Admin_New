import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { classesSelector, fetchAllClasses } from "../../api/class";
import { fetchClassSection, sectionSelector } from "../../api/section";
import { assignteacherdataSelector, fetchOneassignTeacherdata, updateassignTeacherdata } from "../../api/assignteacherdata";
import { actualsubjectSelector, fetchAllActualSubject } from "../../api/actualsubject";

const EditAssign = ( {AssignId, cancel} ) => {

console.log(AssignId)
const dispatch = useDispatch()
const nav = useNavigate()
const {id} = useParams()
const {all_classes} = useSelector(classesSelector)
const {all_actualsubject} = useSelector(actualsubjectSelector)
const {class_section} = useSelector(sectionSelector)
const {current_assignteacherdata} = useSelector(assignteacherdataSelector)
const [selectedClass, setSelectedClass] = useState('');
const [filteredSubjects, setFilterSubject] = useState([])
const [assignData, setAssignData] = useState({

        subject_name: "",
        section: "",
        class_teacher: ""
      
        });

        console.log(current_assignteacherdata)

     useEffect(()=>{

      dispatch(fetchOneassignTeacherdata(AssignId)) 

     },[AssignId])   


      useEffect(()=>{
      dispatch(fetchAllClasses())
      dispatch(fetchAllActualSubject()) 
      },[])

      useEffect(() => {
      const filteredSubjects = all_actualsubject?.filter((item) => {
      return item?.class === selectedClass;
      });
      setFilterSubject(filteredSubjects);
      }, [selectedClass, all_actualsubject]);


      useEffect(()=>{
      dispatch(fetchClassSection(selectedClass))
      },[selectedClass])


      const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedAssignData = { ...assignData }; 
        if (name === 'subject_name') {
          updatedAssignData.subject_name = value;
          if (value === 'CO-SCHOLASTIC') {
            updatedAssignData.class_teacher = 'yes';
          } else {
            updatedAssignData.class_teacher = ''; 
          }  
          updatedAssignData.section = ''; 
        } else if (name === 'class_teacher') {
          updatedAssignData.class_teacher = value;
        } else if (name === 'section') {
          updatedAssignData.section = value;
        }
      
        setAssignData(updatedAssignData);
      };
      

      useEffect(() => {
        if (current_assignteacherdata) {
          setAssignData({
            // name: current_teacher?.personal_details?.name || '',
            class1:current_assignteacherdata?.class?.class_name,
            subject1:current_assignteacherdata?.subject_name  || '',
            section1:current_assignteacherdata?.section?.section_name || '',
            teacher1:current_assignteacherdata?.class_teacher || '',
            teacher:id
          });
        }
      }, [current_assignteacherdata]);



      const onFinish = (e) => {

        console.log(selectedClass)
        e.preventDefault();
    
        const AssignData ={

          class:selectedClass,
          subject_name:assignData.subject_name,
          section:assignData.section,
          class_teacher:assignData.class_teacher,
    
        }
        
        console.log("aaa:", AssignData);
        dispatch(updateassignTeacherdata(AssignData, AssignId, id))
        setAssignData({subject_name: "",section: "",class_teacher: "",});
        setSelectedClass({class: ""});
        cancel()
      };


      const buttonStyle = {
        background:'#43468B',
        float:'right'
      };

return (

<div>

<Typography fontSize={16} mb={4}>Edit assign data</Typography>
<Typography gutterBottom> * Your Current assigned Data</Typography>

<Grid container spacing={4} mb={4}>
<Grid item xs={6} sm={3}>
    <TextField
          name="class1"
          // label="Grade"
          fullWidth
          size="small"
          value={assignData.class1}
          InputProps={{
          readOnly: true,
          }}
          disabled
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          name="subject1"
          // label="Subject"
          fullWidth
          required
          size="small"
          value={assignData.subject1}
          InputProps={{
            readOnly: true,
          }}
          disabled
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          name="section1"
          // label="Section"
          fullWidth
          required
          size="small"
          value={assignData.section1}
          InputProps={{
            readOnly: true,
          }}
          disabled
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          name="teacher1"
          // label="Grade Teacher"
          fullWidth
          required
          size="small"
          value={assignData.teacher1}
          InputProps={{
            readOnly: true,
          }}
          disabled
        />
      </Grid>
    </Grid>



<Typography gutterBottom className=" text-red-600"> * Pick a new choice to Reassign </Typography>
<form >
<Grid container spacing={4} mb={8}>

<Grid item xs={6} sm={3}>
  <FormControl variant="outlined" size="small" fullWidth>
  <InputLabel id="class-name-label">Grade</InputLabel>
  <Select
      labelId="class-name-label"
      id="class-name-select"
      name="class"
      label="Grade"
      value={selectedClass}
      onChange={(e) => setSelectedClass(e.target.value)}
    >
      {all_classes?.map((item) => (
      <MenuItem key={item._id} value={item._id}>
      {item?.class_name}
      </MenuItem>
      ))}
  </Select>
  </FormControl>
</Grid>


<Grid item xs={6} sm={3}>

  <FormControl variant="outlined" size="small" fullWidth>
    <InputLabel id="subject-name-label">Subject</InputLabel>
    <Select
      labelId="subject-name-label"
      id="subject-name-select"
      name="subject_name"
      label="Subject Name"
      value={assignData?.subject_name}
      onChange={handleChange}
    >
      {selectedClass ? (
      filteredSubjects?.map((item) => (
      <MenuItem key={item._id} value={item?.subject_name}>
      {item?.subject_name}
      </MenuItem>
      ))
      ) : (
      <h1  style={{color:'red', padding:'30px'}}>
          Please select the class first
        </h1>
      )}
    </Select>
  </FormControl>
</Grid>



    <Grid item xs={6} sm={3}>
 
    <FormControl variant="outlined" size="small" fullWidth>
    <InputLabel id="class-name-label">Section</InputLabel>
    <Select
        labelId="class-name-label"
        id="class-name-select"
        name="section"
        label="Section Name"
        value={assignData?.section_name}
        onChange={handleChange}
        >
        {class_section?.map((item) => (
        <MenuItem key={item._id} value={item?._id}>
        {item?.section_name}
        </MenuItem>
        ))}
    </Select>
    </FormControl>
    </Grid>

    <Grid item xs={6} sm={3}>
  <TextField
    select
    name="class_teacher"
    label="Grade Teacher"
    value={assignData.class_teacher}
    onChange={handleChange}
    fullWidth
    required
    size="small"
    disabled={assignData.subject_name === 'CO-SCHOLASTIC'} 
  >
    <MenuItem value="yes">Yes</MenuItem>
    <MenuItem value="no">No</MenuItem>
  </TextField>
</Grid>

    </Grid>

  <Grid item xs={6} sm={3} >
      <Button onClick={onFinish} 
      type="submit"
      variant="contained" 
      color="primary" 
      style={buttonStyle}  
      >
    Update
      </Button>
  </Grid>
 

</form>

</div>

)}
export default EditAssign;
