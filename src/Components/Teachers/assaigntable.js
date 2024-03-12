import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link, useParams } from "react-router-dom";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select,TablePagination, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mui/material';
import { classesSelector, fetchAllClasses } from "../../api/class";
import { fetchClassSection, sectionSelector } from "../../api/section";
import { assignteacherdataSelector, createassignteacherdata, deleteassignTeacherdata, fetchIndividualTeacherData } from "../../api/assignteacherdata";
import EditAssign from './editassign'
import Modal from '@mui/material/Modal';
import { actualsubjectSelector, fetchAllActualSubject } from "../../api/actualsubject";



const AssaignTable = ({ data }) => {
console.log(data)
const dispatch = useDispatch()
const {id} = useParams()
const {all_classes} = useSelector(classesSelector)
const {all_actualsubject} = useSelector(actualsubjectSelector)
const {class_section} = useSelector(sectionSelector)
const {all_assignteacherdata} = useSelector(assignteacherdataSelector)
const [selectedClass, setSelectedClass] = useState('');
const [filteredSubjects, setFilterSubject] = useState([])
const [Delete, SetDelete] = useState('')
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const [selectedTeacherId, setSelectedTeacherId] = useState(null);
const [open, setOpen] = React.useState(false);
const [open1, setOpen1] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const handleOpen1 = () => setOpen1(true);
const handleClose1 = () => setOpen1(false);

const [assignData, setAssignData] = useState({

        subject_name: "",
        section: "",
        class_teacher: ""
      
        });

        const isButtonDisabled = !Object.values(assignData).every(value => value !== '');

        const style = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1100,
          bgcolor: 'background.paper',
          border: '1px solid #43468B',
          boxShadow: 2,
          p: 2,
        };  

        const style1 = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '1px solid #43468B',
          boxShadow: 2,
          p: 2,
        };  
        
        

      useEffect(()=>{
      dispatch(fetchAllClasses())
      dispatch(fetchAllActualSubject()) 
      
      },[])


      useEffect(()=>{
      dispatch(fetchClassSection(selectedClass))
      },[selectedClass])


      const handleChangePage = (event, newPage) => {
      setPage(newPage);
      };
        
      const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      };
        

      useEffect(() => {
      const filteredSubjects = all_actualsubject?.filter((item) => {
      return item?.class === selectedClass;
      });
      setFilterSubject(filteredSubjects);
      }, [selectedClass, all_actualsubject]);



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


      const onFinish = (e) => {
      e.preventDefault();    
      const AssignData ={
          class:selectedClass,
          subject_name:assignData.subject_name,
          section:assignData.section,
          class_teacher:assignData.class_teacher,
          teacher:id   
        }
        dispatch(createassignteacherdata(AssignData, id))
        setAssignData({subject_name: "",section: "",class_teacher: "",});
        setSelectedClass({class: ""});
      };
    

      const handleClickEdit = (e, id) => {
        e.stopPropagation();
        setSelectedTeacherId(id);
        handleOpen(); 
      };


      const handleDelete = () => {
        dispatch(deleteassignTeacherdata(Delete, id))
        handleClose1();
      };

      useEffect(()=>{
      dispatch(fetchIndividualTeacherData(id))
      },[id])


      const buttonStyle = {
        background:'#43468B'
      };



return (

<div>
<div>

<Typography fontSize={16} mb={4}>Assign</Typography>

<form >
<Grid container spacing={2} mb={3}>

  <Grid item xs={6} sm={2}>
  <FormControl variant="outlined" size="small" fullWidth required>
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


  <Grid item xs={6} sm={2}>
  <FormControl variant="outlined" size="small" fullWidth required>
  <InputLabel id="subject-name-label">Subject</InputLabel>
  <Select
      labelId="subject-name-label"
      id="subject-name-select"
      name="subject_name"
      label="Subject Name"
      value={assignData?.subject_name}
      onChange={handleChange}
      required  
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



  <Grid item xs={6} sm={2}>
  <FormControl variant="outlined" size="small" fullWidth required>
  <InputLabel id="class-name-label">Section</InputLabel>
  <Select
      labelId="class-name-label"
      id="class-name-select"
      name="section"
      label="Section Name"
      value={assignData?.section}
      onChange={handleChange}
      >
      {class_section?.map((item) => (
      <MenuItem key={item._id} value={item?._id}>
      {item.section_name}
      </MenuItem>
      ))}
  </Select>
  </FormControl>
  </Grid>

  <Grid item xs={6} sm={2}>
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

  <Grid item xs={6} sm={3}>
  <Button onClick={onFinish}
      type="submit"
      variant="contained"
      style={{...buttonStyle,
        width: '50%',
        background: isButtonDisabled ? '#E0E0E0' : '#43468B',
      }}
      disabled={isButtonDisabled}
    >
      Assign
    </Button>
  </Grid>
 
</Grid>
</form>

</div>





    <TableContainer component={Paper}>
    <Table>
    <TableHead>
    <TableRow>
    <TableCell>Sl No.</TableCell>
    <TableCell>Grade</TableCell>
    <TableCell>Subject</TableCell>
    <TableCell>Section</TableCell>             
    <TableCell>Grade Teacher</TableCell>
    <TableCell>Action</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {all_assignteacherdata?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((teacher, index) => (  
    <TableRow   key={teacher?.id}>
    <TableCell>{index + 1}</TableCell>
    <TableCell>{teacher?.class?.class_name}</TableCell>
    <TableCell>{teacher?.subject_name}</TableCell>
    <TableCell>{teacher?.section?.section_name}</TableCell>
    <TableCell>{teacher?.class_teacher}</TableCell>
    <TableCell>
    <Box sx={{ display: 'flex', gap:'6px' }}>
    <Link  onClick={(e) => {e.stopPropagation(); handleClickEdit(e, teacher?._id)}} >
    <ModeEditOutlineOutlinedIcon  style={{
          color:'#757575',
          transition: 'color 0.3s ease',
          
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#43468B';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#757575'; 
        }} />
    </Link>
    <div onClick={(e)=>{e.stopPropagation()}}>
    <h2>
    <DeleteOutlinedIcon style={{
          color:'#757575',
          transition: 'color 0.3s ease',
          cursor: 'pointer',
          
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#EB5757';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#757575'; 
        }} onClick={() => {SetDelete(teacher?._id); handleOpen1()}} />
    </h2>
    <Modal  open={open1}
     onClose={handleClose1}
     BackdropProps={{ invisible: true }}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description">

     <Box  sx={style1}>
    <Typography gutterBottom variant='h6'>Confirm Deletion</Typography>
    <Typography gutterBottom mb={3}>Are you sure you want to delete this section?</Typography>
    <span style={{float:'right'}}>
    <Button onClick={handleClose1} color="primary">Cancel</Button>
    <Button onClick={handleDelete} color="primary">Yes, Delete</Button>
    </span>
    </Box>
    </Modal>
    </div>
    </Box>
    </TableCell>
    </TableRow>

    ))}
    </TableBody>
    </Table>
    </TableContainer>
    <TablePagination
    component="div"
    count={all_assignteacherdata?.length}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    />


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ invisible: true }}
      >
       <Box sx={style}>
       <EditAssign AssignId={selectedTeacherId} cancel={handleClose}/>

      </Box>

       
      </Modal>



    </div>
    );
    };
export default AssaignTable;
