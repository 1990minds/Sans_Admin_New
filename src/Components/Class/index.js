
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { loginSelector } from '../../api/authSlice';
import Datatable from './datatable';
import Createclass from './createclass'
import Button from '@mui/material/Button';
import { classesSelector, fetchAllClasses } from '../../api/class';
import { Box, Typography } from '@mui/material';

function Sections() {

  const [loading, setLoading]=useState(false)
  const dispatch=useDispatch()
  const {all_classes}=useSelector(classesSelector)
  // const {filter}=useSelector(loginSelector)
 
console.log(all_classes)
  
  useEffect(()=>{
    dispatch(fetchAllClasses())
  },[dispatch])


  // const { Search } = Input;

  return (<>
    <div className="mb-4 ">  
    {/* <Search placeholder="Search section" className="mx-3" style={{ width: 230 }} enterButton /> */}
    {/* <Button component={Link} to="/create-sections" variant="contained"  color="primary" sx={{backgroundColor:'#292F8F'}} >
      Create Section
    </Button> */}

    {/* <Createclass/> */}
    
    </div>
    <Box marginBottom={4}>
<Typography gutterBottom variant="h6">Grade Details</Typography>
</Box>


    {
    
     <Datatable loading={loading}
     data ={all_classes}
     />
    
    }
        </>
           )
}

export default Sections