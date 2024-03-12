
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import SectionTable from './sectiontable';
import CreateSection from './createsection'
import { sectionSelector, fetchClassSection } from '../../../api/section';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { classesSelector, fetchOneClasses } from '../../../api/class';
import { Box } from '@mui/material';



function Sections() {

  const [loading, setLoading]=useState(false)
  const dispatch=useDispatch()
  const {class_section}=useSelector(sectionSelector)
  const {current_classes} = useSelector(classesSelector)
  const {id} = useParams()
  // const {filter}=useSelector(loginSelector)
 
console.log(class_section)
console.log(current_classes)
  
  useEffect(()=>{
    dispatch(fetchClassSection(id))
    dispatch(fetchOneClasses(id))
  },[id])


  // const { Search } = Input;

  return (<>
  <div className='mb-4' >  


  
<Typography marginBottom={1} variant="h6">Create Section</Typography>


  <Breadcrumbs  aria-label="breadcrumb" style={{marginLeft:'6px', marginBottom:'30px'}}>
  <Link underline="hover" color="inherit" to='/'>
    Home
  </Link>
  <Link underline="hover" color="inherit" to='/class'>
    Grade
  </Link>
  <Typography color="text.primary">{current_classes?.class_name}</Typography>
  </Breadcrumbs>

  <CreateSection/>
    
  </div>
  {<SectionTable loading={loading}data ={class_section}/>}
  </>
  )
}

export default Sections