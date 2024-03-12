import React, { useEffect, useState } from "react";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { StudentShift, deleteStudent } from "../../api/student";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mui/material';
import { Modal, Typography } from '@mui/material';
import { classesSelector, fetchAllClasses } from "../../api/class";
import { fetchClassSection, sectionSelector } from "../../api/section";


export default function Movestudents({StudentIds, SetIds}) {

    console.log(StudentIds)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height:300,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 2,
        p: 2,
      }; 
      
     const dispatch = useDispatch()
    const {all_classes} = useSelector(classesSelector)
    const {class_section} = useSelector(sectionSelector)
    const [selectedClassID, setSelectedClassID] = useState('');
    const [selectedSectionID, setSelectedSectionID] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(()=>{
      dispatch(fetchAllClasses())
      },[])
    
     useEffect(()=>{
      dispatch(fetchClassSection(selectedClassID))
      },[selectedClassID])

      const handleOpen1 = () => setOpen1(true);
      const handleClose1 = () => setOpen1(false);

      const buttonStyle = {
          marginLeft: '40%',
          marginTop:'10%',   
          background:'#43468B' ,
          
        };

    const onFinish = (e) => {
      e.preventDefault();
  
      const StudentData ={
      
        classId: selectedClassID,    
        sectionId: selectedSectionID,
        studentIds: StudentIds,
         
      }
      
      console.log("Student data submitted:", StudentData);
      dispatch(StudentShift(StudentData))
      setSelectedClassID('')
      setSelectedSectionID('')
      handleClose1()
      handleClose()
      SetIds('')
    };
  



  return (
    <div>
    {/* <Tooltip  title={!StudentIds[0] ? "Select Students" : ""}>
    <Button disabled={!StudentIds[0]} color="primary" variant="contained" style={{ width:'100px', marginLeft:'50%'}} onClick={() => {handleOpen1()}}>Move</Button>
    </Tooltip> */}



    <Modal  open={open1}
        onClose={handleClose1}
        BackdropProps={{ invisible: true }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

      <form onSubmit={onFinish}>
      <Box  sx={style}>
      <Typography gutterBottom variant='h6' sx={{marginBottom:'30px'}}>Select class & section for students </Typography>


      
      <Grid container spacing={4} >
      <Grid item xs={10} sm={6}>
      <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel id="class-label">Grade</InputLabel>
      <Select
       labelId="class-label"
       id="class-select"
       name="classId"
       label="Grade"
       value={selectedClassID}
       onChange={(e) => setSelectedClassID(e.target.value)}
       >
      {all_classes?.map((item) => (
      <MenuItem key={item._id} value={item._id}>
      {item?.class_name}
      </MenuItem>
      ))}
      </Select>
      </FormControl>
      </Grid>

      <Grid item xs={10} sm={6}>
      <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel id="section-label">Section</InputLabel>
      <Select
       labelId="section-label"
       id="section-select"
       name="sectionId"
       label="Section Name"
       value={selectedSectionID}
       onChange={(e) => setSelectedSectionID(e.target.value)}
       >
       {class_section?.map((item) => (
       <MenuItem key={item._id} value={item?._id}>
       {item.section_name}
       </MenuItem>
       ))}
       </Select>
       </FormControl>
      </Grid>
      </Grid>
    
      <Box style={{ display: 'flex' }}>
      <Button 
      
      variant="contained"
      color="primary"
      onClick={() => {
           handleOpen();
          }}
      style={buttonStyle}
      >
      Assign
     </Button>

     <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       >
        <Box sx={style}>
          <Typography gutterBottom variant="h6" mb={6}>Confirmation</Typography>
          <Typography gutterBottom mb={6}>
          "Are you sure you want to proceed? Shifting the student will result in the removal of the old section data. Please confirm."
          </Typography>
          <span style={{ display:'flex', justifyContent:'space-between' }}>
            <label>
            <input
            type="checkbox"
            checked={isCheckboxSelected}
            onChange={() => setIsCheckboxSelected(!isCheckboxSelected)}
            />
            <span className='ml-4'>Yes confirm</span>
            </label>
            <label>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
            type="submit"
            color="primary"
            disabled={!isCheckboxSelected}
            onClick={onFinish}>
            Submit
            </Button>
            </label>
          </span>
        </Box>
      </Modal>




     </Box>
    </Box>
    </form>
  </Modal></div>
  )
}
