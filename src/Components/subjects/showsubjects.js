import React, { useEffect, useState } from 'react'
import { classesSelector, fetchAllClasses } from "../../api/class";
import { Box, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassSubject, subjectSelector } from '../../api/subject';
import CircleIcon from '@mui/icons-material/Circle';
import logo from "../../Images/sans-01.png";




function Showsubjects() {


    const {all_classes} = useSelector(classesSelector)
    const {all_subject} = useSelector(subjectSelector)
    const dispatch = useDispatch()
    const [selectedClassID, setSelectedClassID] = useState('65126f948ff1cfb9cd36541d');

      useEffect(()=>{
      dispatch(fetchAllClasses())
      },[])

      useEffect(()=>{
      dispatch(fetchClassSubject(selectedClassID))
      }, [selectedClassID])


    // useEffect(() => {
    //   if (current_teacher) {
    //     setTeacherData({
    //       name: current_teacher?.personal_details?.name || '',
    //     });
    //   }
    // }, [current_teacher]);



  return (
    <div >


<Typography variant='h6' marginBottom={5}>Subjects Details</Typography>


        <Grid item xs={6} sm={2} mb={6}>
            <FormControl variant="outlined" size="small" style={{width:'30%'}} >
            <InputLabel id="class-name-label">Grade</InputLabel>
            <Select
            labelId="class-name-label"
            id="class-name-select"
            name="class_name"
            label="Grade"
            value={selectedClassID}
            onChange={(e) => setSelectedClassID(e.target.value)}
            >
            {all_classes?.map((item) => (
            <MenuItem key={item._id} value={item?._id}>
            {item.class_name}
            </MenuItem>
            ))}
            </Select>
            </FormControl>
        </Grid>

<Box>

        <img src={logo} alt="logo" className=" w-full mb-10  " />


        <div>
        {all_subject ? (
        <Box sx={{display: 'flex', flexWrap: 'wrap',gap: '28px',}}>
        {all_subject?.subject?.map((item) => (
        <Card
         key={item?.subject?.subject_name} 
          sx={{flex: '1 1 calc(25% - 16px)', backgroundColor: '#EFEFEF',borderRadius: '11px',}}>
          <Typography
            color="#ffff"
            bgcolor="#43468B"
            fontSize="16px"
            style={{ padding: '6px' }}
            pl={2}
          >
            {item?.subject?.subject_name}
          </Typography>

          <ul style={{paddingLeft:'2px', fontSize:'14px',   listStyle: 'none', paddingTop:'2px',}}>
          {item.subject.topics.map((topic) => (
          <li key={topic?.topic_id} style={{paddingLeft: '10px',  display: 'flex', alignItems: 'center',}}>
          <CircleIcon style={{ marginRight: '5px', fontSize:'6px' }} />
          {topic?.topic_name}
          </li>
          ))}
          </ul>
          </Card>
          ))}
         </Box>
         ) : (
        <Card
        sx={{
        width: '290px',
        height: '125px',
        backgroundColor: '#F1F2F4',
        borderRadius: '11px',
      }}
    >
      Please select class
    </Card>
  )}
</div>



</Box>












    </div>
  )
}

export default Showsubjects