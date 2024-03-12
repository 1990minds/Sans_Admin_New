import React, { useEffect, useState } from 'react'
import { classesSelector, fetchAllClasses } from '../../api/class'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSection, sectionSelector } from '../../api/section'
import { fetchAllTeacher, teacherSelector } from '../../api/teacher'
import { fetchAllStudent, studentSelector } from '../../api/student'
import { Box, Breadcrumbs, Button, Card, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import './dashboard.css'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import BG from "../../Images/bg1.avif"
import Image22 from "../../Images/Sans1.png"


export default function Index() {

const dispatch = useDispatch()
const {all_classes} = useSelector(classesSelector)
const {all_section} = useSelector(sectionSelector)
const {all_teacher} = useSelector(teacherSelector)
const {all_student} = useSelector(studentSelector)
const drawerWidth = 220;




console.log(all_student)


useEffect(()=>{
dispatch(fetchAllClasses())
dispatch(fetchAllSection())
dispatch(fetchAllTeacher())
dispatch(fetchAllStudent())

},[])



const cardStyle = {
  backgroundImage: `url(${BG})`,
  // backgroundPosition: 'left top, right top', 
  backgroundSize: 'auto 200%, auto 200%', 
  paddingLeft:'28%',
  paddingTop:'6px',
  height: '80px',
  width: '100%',  
  position: 'fixed',
  top: 0,
  zIndex: 1000,
};

const textStyle = {
  color: '#43468B',
  fontSize: '44px',
  fontWeight: 'bold',
  
};


const buttonStyle = {
  marginTop:'20px',
  background:'#43468B'
};

const maleStudents = all_student.filter(student => student?.personal_details?.gender === 'male');
const femaleStudents = all_student.filter(student => student?.personal_details?.gender === 'female');

const maleCount = maleStudents.length;
const femaleCount = femaleStudents.length;

console.log(`Number of male students: ${maleCount}`);
console.log(`Number of female students: ${femaleCount}`);


const countSectionsForClassS1 = (classId) => {
  const sectionsForClass = all_section?.filter((section) => {
    const extractedSection = section.section_name.match(/(S\d+)/)?.[0]; 
    return section.class === classId && extractedSection === 'S1';
  });
  return sectionsForClass?.length;
};

const countSectionsForClassS2 = (classId) => {
  const sectionsForClass = all_section?.filter((section) => {
    const extractedSection = section?.section_name?.match(/(S\d+)/)?.[0]; 
    return section.class === classId && extractedSection === 'S2';
  });
  return sectionsForClass?.length;
};


const countClassStudentsS1 = (classId) => {
  const ClassStudents = all_student?.filter((student) => {
    const extractedStudent = student?.joining_details?.section?.section_name?.match(/(S\d+)/)?.[0];
    return student?.joining_details?.class?._id === classId && extractedStudent === 'S1';
  });
  return ClassStudents?.length;
};

const countClassStudentsS2 = (classId) => {
  const ClassStudents = all_student?.filter((student) => {
    const extractedStudent = student?.joining_details?.section?.section_name?.match(/(S\d+)/)?.[0];
    return student?.joining_details?.class?._id === classId && extractedStudent === 'S2';
  });
  return ClassStudents?.length;
};




const countClassGenderS1 = (classId) => {
  const ClassStudents = all_student?.filter((student) => student?.joining_details?.class?._id === classId);
  console.log(ClassStudents)
  const maleCount = ClassStudents?.filter((student) => student?.personal_details?.gender === 'male' && student?.joining_details?.section?.section_name?.match(/(S\d+)/)?.[0] === 'S1').length;
  const femaleCount = ClassStudents?.filter((student) => student?.personal_details?.gender === 'female' && student?.joining_details?.section?.section_name?.match(/(S\d+)/)?.[0] === 'S1').length;

  console.log(`Male students in class ${classId}:`, maleCount);
  console.log(`Female students in class ${classId}:`, femaleCount);

  return {
    total: ClassStudents?.length,
    males: maleCount,
    females: femaleCount,
  };
};


const countClassGenderS2 = (classId) => {
  const ClassStudents = all_student?.filter((student) => student?.joining_details?.class?._id === classId);
  console.log(ClassStudents)
  const maleCount = ClassStudents?.filter((student) => student?.personal_details?.gender === 'male' && student?.joining_details?.section?.section_name?.match(/(S\d+)/)?.[0] === 'S2').length;
  const femaleCount = ClassStudents?.filter((student) => student?.personal_details?.gender === 'female' && student?.joining_details?.section?.section_name?.match(/(S\d+)/)?.[0] === 'S2').length;

  console.log(`Male students in class ${classId}:`, maleCount);
  console.log(`Female students in class ${classId}:`, femaleCount);

  return {
    total: ClassStudents?.length,
    males: maleCount,
    females: femaleCount,
  };
};




const classDataS1 = all_classes.map((item, index) => {
  const className = item.class_name;
  const numberOfStudents = countClassStudentsS1(item._id);
  const colors = ["#F5821F", "#D6CA6F", "#14A850", "#6C8CC8", "#C433FF", "#C756A1" , "#D4FC79" ];
  const fillColor = colors[index % colors.length];
  return { name: className, value: numberOfStudents, fill: fillColor };
});


const classDataS2 = all_classes.map((item, index) => {
  const className = item.class_name;
  const numberOfStudents = countClassStudentsS2(item._id);
  const colors = ["#F5821F", "#D6CA6F", "#14A850", "#6C8CC8", "#C433FF", "#C756A1" , "#D4FC79" ];
  const fillColor = colors[index % colors.length];
  return { name: className, value: numberOfStudents, fill: fillColor };
});



const totalSectionsS1 = all_classes.reduce((acc, item) => acc + countSectionsForClassS1(item?._id), 0);
const totalStudentsS1 = all_classes.reduce((acc, item) => acc + countClassStudentsS1(item?._id), 0);
const totalBoysS1 = all_classes.reduce((acc, item) => acc + countClassGenderS1(item?._id).males, 0);
const totalGirlsS1 = all_classes.reduce((acc, item) => acc + countClassGenderS1(item?._id).females, 0);


const totalSectionsS2 = all_classes.reduce((acc, item) => acc + countSectionsForClassS2(item?._id), 0);
const totalStudentsS2 = all_classes.reduce((acc, item) => acc + countClassStudentsS2(item?._id), 0);
const totalBoysS2 = all_classes.reduce((acc, item) => acc + countClassGenderS2(item?._id).males, 0);
const totalGirlsS2 = all_classes.reduce((acc, item) => acc + countClassGenderS2(item?._id).females, 0);



  return (
    <div >


<div >
   {/* <Breadcrumbs  aria-label="breadcrumb">
   <Link underline="hover" color="inherit" to='/'>
   /Dashboard
   </Link> 
  </Breadcrumbs> */}

 
      <Card style={cardStyle}>
      <h1 variant='h1' style={textStyle}>
        SANS PUBLIC SCHOOL
      </h1>
     </Card>
  

  </div>
      <div  style={{ display: 'flex', gap: '24px', width: '100%' , marginTop:'7%'}}>

      <Link to={'/student'}>
     <Card  
         bordered={false}
         className="criclebox pointer"
         style={{
          height: '85px',
          width: '284px',
          flexShrink: '0',
          borderRadius: '7px',
          background: '#FFF',
          boxShadow: '0px 4px 4px 0px rgba(91, 90, 90, 0.25)',
          fontSize: '16px',
          fontFamily: 'Inter',
          fontWeight: '500',
          color:'#2B2B2D',
          backgroundRepeat: 'no-repeat',
          paddingLeft: '17px',
          paddingTop:'13px'
        }}>
        Total  Number of Students

      <p style={{ color: '#43468B', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700' }}>{all_student?.length}</p>
      </Card>
      </Link>


      <Link to={'/teachers'}>
     <Card  
         bordered={false}
         className="criclebox pointer"
         style={{
          height: '85px',
          width: '284px',
          flexShrink: '0',
          borderRadius: '7px',
          background: '#FFF',
          boxShadow: '0px 4px 4px 0px rgba(91, 90, 90, 0.25)',
          fontSize: '16px',
          fontFamily: 'Inter',
          fontWeight: '500',
          color:'#2B2B2D',
          backgroundRepeat: 'no-repeat',
          paddingLeft: '17px',
          paddingTop:'13px'
        }}>
        Number of Staff members

      <p style={{ color: '#43468B', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700' }}>{all_teacher?.length}</p>
      </Card>
      </Link>


      <Link to={'/class'}>
     <Card  
         bordered={false}
         className="criclebox pointer"
         style={{
          height: '85px',
          width: '284px',
          flexShrink: '0',
          borderRadius: '7px',
          background: '#FFF',
          boxShadow: '0px 4px 4px 0px rgba(91, 90, 90, 0.25)',
          fontSize: '16px',
          fontFamily: 'Inter',
          fontWeight: '500',
          color:'#2B2B2D',
          backgroundRepeat: 'no-repeat',
          paddingLeft: '17px',
         
          paddingTop:'13px'
        }}>
        Number of Grade

      <p style={{ color: '#43468B', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700' }}>{all_classes?.length}</p>
      </Card>
      </Link>


      <Link to={'/class'}>
     <Card  
         bordered={false}
         className="criclebox pointer"
         style={{
          height: '85px',
          width: '284px',
          flexShrink: '0',
          borderRadius: '7px',
          background: '#FFF',
          boxShadow: '0px 4px 4px 0px rgba(91, 90, 90, 0.25)',
          fontSize: '16px',
          fontFamily: 'Inter',
          fontWeight: '500',
          color:'#2B2B2D',
          backgroundRepeat: 'no-repeat',
          paddingLeft: '17px',
     
          paddingTop:'13px'
        }}>
        Number of Sections

      <p style={{ color: '#43468B', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700' }}>{all_section?.length}</p>
      </Card>
      </Link>
   
  </div>




  <Card
  bordered={false}
  className="criclebox pointer"
  style={{
    height: '192px',
    width: '100%',
    flexShrink: '0',
    borderRadius: '16px',
    background: '#E9F2FF',
    boxShadow: '0px 4px 4px 0px rgba(91, 90, 90, 0.25)',
    fontSize: '24px',
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#000',
    backgroundRepeat: 'no-repeat',
    paddingLeft: '17px',
    paddingTop: '13px',
    marginTop: '38px',
    position: 'relative', 
  }}
>
  <span className='flex justify-between'>
    <span>
      <span>Create report cards for all the</span><br />
      Grades here. 
     <br/> 
    <Link to={'/student'}>
    <Button
      type="submit"
      variant="contained"
      style={buttonStyle}
    >
      Download Report
    </Button>
  </Link>

  </span>
    <img
      src={Image22}
      alt="Report Card"
      style={{
        // width: '140px', 
        height: '190px',
        marginRight: '10px', 
      }}
    />
  </span>

 

 
</Card>

<div>

</div>






<div className='flex w-full  mt-10 justify-start gap-10 '>

<div>

<h1 class='text-2xl bg-[#FFFF] text-[#43468B] z-30 p-1 shadow-md'>S1 Block - Students</h1>
      <ResponsiveContainer width={300} height={300}>
      <PieChart width={600} height={400}>
      <Pie
      data={classDataS1}
          dataKey="value" cx="50%"cy="50%"innerRadius={70}outerRadius={110}label>
          {
          classDataS1?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
            ))
            }
      </Pie>
      <Tooltip />
      </PieChart>
      </ResponsiveContainer>


      <h1 class='text-2xl bg-[#FFFF] text-[#43468B] z-30 p-1 shadow-md'>S2 Block - Students</h1>
      <ResponsiveContainer width={300} height={300}>
      <PieChart width={600} height={400}>
      <Pie
      data={classDataS2}
          dataKey="value" cx="50%"cy="50%"innerRadius={70}outerRadius={110}label>
          {
          classDataS2?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
            ))
            }
      </Pie>
      <Tooltip />
      </PieChart>
      </ResponsiveContainer>

{/* <span style={{marginTop:'4px'}} > */}

      {/* <Card  
         bordered={false}
         className="criclebox pointer"
         style={{
          height: '85px',
          width: '284px',
          flexShrink: '0',
          borderRadius: '7px',
          background: '#E9F2FF',
          boxShadow: '0px 4px 4px 0px rgba(91, 90, 90, 0.25)',
          fontSize: '16px',
          fontFamily: 'Inter',
          fontWeight: '500',
          color:'#2B2B2D',
          backgroundRepeat: 'no-repeat',
          paddingLeft: '17px',
          paddingTop:'13px',
          marginTop:'20px'
        }}>
        Total  Number of Boys

      <p style={{ color: '#43468B', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700' }}>{maleCount}</p>
      </Card>
      </span>


      <Card  
         bordered={false}
         className="criclebox pointer"
         style={{
          height: '85px',
          width: '284px',
          flexShrink: '0',
          borderRadius: '7px',
          background: '#E9F2FF',
          boxShadow: '0px 4px 4px 0px rgba(91, 90, 90, 0.25)',
          fontSize: '16px',
          fontFamily: 'Inter',
          fontWeight: '500',
          color:'#2B2B2D',
          backgroundRepeat: 'no-repeat',
          paddingLeft: '17px',
          paddingTop:'13px',
          marginTop:'20px'
        }}>
        Total  Number of Girls

      <p style={{ color: '#43468B', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700' }}>{femaleCount}</p>
      </Card> */}





      

</div>



        <div className=' w-full'>
         <TableContainer component={Paper} sx={{ width: '100%', display:'flex', gap:'6px' }}>
         <Table>
         <TableHead>
         <TableRow>
         <TableCell></TableCell>
         <TableCell></TableCell>    
        <TableCell colSpan={5} style={{fontSize:'20px', paddingLeft:'16%'}}>S1 Block</TableCell>
        </TableRow>
        </TableHead>
        
        <TableCell style={{background:'#43468B', color:'white'}}>Sl No.</TableCell>
        <TableCell style={{background:'#43468B', color:'white'}}>Grade</TableCell>
        <TableCell style={{background:'#43468B', color:'white'}}>No. of Section</TableCell>
        <TableCell style={{background:'#43468B', color:'white'}}>No. of Students</TableCell>
        <TableCell style={{background:'#43468B', color:'white'}}>No. of Boys</TableCell>
        <TableCell style={{background:'#43468B', color:'white'}}>No. of Girls</TableCell>
       
       <TableBody>
       {all_classes?.map((item, index) => (
       <TableRow
        className={index % 2 === 0 ? 'even-row' : 'odd-row'}
        style={{ height: '10px' }}
        key={item?._id}
        >
        <TableCell>{index + 1}</TableCell>
        <TableCell>{item?.class_name}</TableCell>
        <TableCell>
        <span className='ml-10'>{countSectionsForClassS1(item?._id)}</span>
        </TableCell>
        <TableCell>
        <span className='ml-10'>{countClassStudentsS1(item?._id)}</span>
        </TableCell>
        <TableCell>
        <span className='ml-8'>{countClassGenderS1(item?._id)?.males}</span>
        </TableCell>
        <TableCell>
        <span className='ml-10'>{countClassGenderS1(item?._id)?.females}</span>
        </TableCell>
          </TableRow>
      ))}
       <TableRow >
       <TableCell ></TableCell>
          <TableCell  style={{fontWeight:'bold', fontSize:'16px ', color:'#43468B',}}> Total</TableCell>
          <TableCell>
            <span className='ml-10 text-[15px] font-bold text-[#43468B]'>{totalSectionsS1}</span>
          </TableCell>
          <TableCell>
            <span className='ml-10 text-[15px] font-bold text-[#43468B]'>{totalStudentsS1}</span>
          </TableCell>
          <TableCell>
            <span className='ml-8 text-[15px] font-bold text-[#43468B]'>{totalBoysS1}</span>
          </TableCell>
          <TableCell>
            <span className='ml-10 text-[15px] font-bold text-[#43468B]'>{totalGirlsS1}</span>
          </TableCell>
        </TableRow>
    </TableBody>
  </Table>


     <Table style={{width:'75%'}}>
    <TableHead>
    <TableRow>
    <TableCell></TableCell> 
    <TableCell colSpan={5} style={{fontSize:'20px',paddingLeft:'16%'}}>S2 Block</TableCell>        
    </TableRow>
    </TableHead>
    <TableCell style={{background:'#43468B', color:'white'}}>No. of Section</TableCell>
    <TableCell style={{background:'#43468B', color:'white'}}>No. of Students</TableCell>
    <TableCell style={{background:'#43468B', color:'white'}}>No. of Boys</TableCell>
    <TableCell style={{background:'#43468B', color:'white'}}>No. of Girls</TableCell>
   
    <TableBody>
    {all_classes?.map((item, index) => (
     <TableRow
    className={index % 2 === 0 ? 'even-row1' : 'odd-row1'}
    style={{ height: '10px' }}
    key={item?._id}
    >
    <TableCell>
    <span className='ml-10'>{countSectionsForClassS2(item?._id)}</span>
    </TableCell>
    <TableCell>
    <span className='ml-10'>{countClassStudentsS2(item?._id)}</span>
    </TableCell>
    <TableCell>
    <span className='ml-8'>{countClassGenderS2(item?._id).males}</span>
    </TableCell>
    <TableCell>
    <span className='ml-10'>{countClassGenderS2(item?._id).females}</span>
    </TableCell>         
    </TableRow>
      ))}
       <TableRow >
          <TableCell>
            <span className='ml-10 text-[15px] font-bold text-[#43468B]'>{totalSectionsS2}</span>
          </TableCell>
          <TableCell>
            <span className='ml-10 text-[15px] font-bold text-[#43468B]'>{totalStudentsS2}</span>
          </TableCell>
          <TableCell>
            <span className='ml-8 text-[15px] font-bold text-[#43468B]'>{totalBoysS2}</span>
          </TableCell>
          <TableCell>
            <span className='ml-10 text-[15px] font-bold text-[#43468B]'>{totalGirlsS2}</span>
          </TableCell>
        </TableRow>
    </TableBody>
  </Table>
</TableContainer>
      </div>
      </div>
    </div>
  )
}
