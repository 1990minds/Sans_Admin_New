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
import { Link, useNavigate} from "react-router-dom";
import { Box, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TablePagination, CircularProgress  } from "@mui/material";
import { deleteStudent, fetchAllStudent, studentSelector } from "../../api/student";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mui/material';
import { Modal, Typography , IconButton } from '@mui/material';
import { classesSelector, fetchAllClasses } from "../../api/class";
import { fetchClassSection, sectionSelector } from "../../api/section";
import MoveStudent from "./movestudents";
import './index.css'
import GetAppIcon from '@mui/icons-material/GetApp';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { keyUri, config } from '../../key'
import Report from './reportlkgtoukg'
import Report1to4Term1 from './report1to4TERM1'
import Report1to4Term2 from "./report1to4TERM2";
import Report1to4Term3 from "./report1to4TERM3";
import Report5to10Term1 from './report5to10TERM1'
import Report5to10Term2 from './report5to10TERM2'
import Report5to10Term3 from './report5to10TERM3'
import { examsSelector, fetchAllExams } from "../../api/exams";
import ClearIcon from '@mui/icons-material/Clear';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const StudentTable = () => {

const dispatch = useDispatch()
const [open, setOpen] = React.useState(false);
const [deleteStudentId, setDeleteStudentId] = useState('');
const [selectedClass, setSelectedClass] = useState('');
const [selectedSection, setSelectedSection] = useState('');
const [selectedYear, setSelectedYear] = useState('');
const {all_classes} = useSelector(classesSelector)
const {all_student}=useSelector(studentSelector)
const {all_exams}=useSelector(examsSelector)
const {class_section} = useSelector(sectionSelector)
const [selectedStudentIds, setSelectedStudentIds] = useState([]);
const [filteredData, setFilteredData] = useState(all_student);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [open1, setOpen1] = React.useState(false);
const handleOpen1 = () => setOpen1(true);
const [studentData, setStudentData] = useState(null)
const [reportData, setReportData] = useState(null)
const handleClose1 = () => {setOpen1(false);setReportData(null)};
const nav = useNavigate()
const [loading, setLoading] = useState(true);




console.log(reportData)
console.log(studentData)

console.log(selectedStudentIds)

console.log(all_exams)

const style = {
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

const style1 = {
  position: 'absolute',
  top: '55%', 
  left: '55%',
  transform: 'translate(-50%, -50%)',
  width: 1030,
  bgcolor: 'background.paper',
  p: 4,
  maxHeight: '72vh',
  overflowY: 'scroll', 
  border: '1px solid #43468B',
};

useEffect(() => {
  dispatch(fetchAllStudent());
  dispatch(fetchAllExams());
}, [dispatch])

useEffect(()=>{
  dispatch(fetchAllClasses())
  },[])

useEffect(()=>{
  dispatch(fetchClassSection(selectedClass))
  },[selectedClass])

const handleDelete = () => {
  dispatch(deleteStudent(deleteStudentId))
  handleClose()
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};


const handleClickrow = (studentId)=> {
  const url = `/student/${studentId}`;
  nav(url);

}

const onFinish = (id, term) => {
  console.log(id, term);
  const pdfValues = {
    studentid: id,
    term: term,
  };
  setStudentData(pdfValues)
}


useEffect(() => {
  if (studentData) {
  const fetchReportData = async () => {
  try {
   const response = await fetch(keyUri.BACKEND_URI + '/report', {
   method: 'POST',
  headers: {
  'Accept': 'application/json',
   'Content-Type': 'application/json',
   },
   body: JSON.stringify(studentData), 
   });

   console.log(response)
   if (response.status === 404) {
    setReportData(null);
    }

  if (!response.ok) {
  throw new Error('Network response was not ok');
  }
  const studentReport = await response.json();
  console.log(studentReport)
  setReportData(studentReport);
  setLoading(false);  
  } catch (error) {
  console.error('Fetch error:', error);
  }  finally {
    setLoading(false); 
  }

};
  fetchReportData(); 
  }
}, [studentData]);


useEffect(() => {
  const storedYear = localStorage.getItem('selectedYear');
  const storedClass = localStorage.getItem('selectedClass');
  const storedSection = localStorage.getItem('selectedSection');

  if (storedYear) setSelectedYear(storedYear);
  if (storedClass) setSelectedClass(storedClass);
  if (storedSection) setSelectedSection(storedSection);
}, []);

useEffect(() => {
  if (all_student && all_student?.length > 0) {
      applyFilters();}
  }, [all_student, selectedYear, selectedClass, selectedSection]);

  const applyFilters = () => {
    const filteredData = all_student?.filter((student) => {
    const yearMatches = !selectedYear || student?.joining_details?.year === selectedYear;
    const classMatches = !selectedClass || student?.joining_details?.class?._id === selectedClass;
    const sectionMatches = !selectedSection || student?.joining_details?.section?._id === selectedSection;
    return yearMatches && classMatches && sectionMatches;
    });
    setFilteredData(filteredData);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setSelectedYear(value);
    localStorage.setItem('selectedYear', value);
  };

  const handleClassChange = (e) => {
    const value = e.target.value;
    setSelectedClass(value);
    localStorage.setItem('selectedClass', value);
  };

  const handleSectionChange = (e) => {
    const value = e.target.value;
    setSelectedSection(value);
    localStorage.setItem('selectedSection', value);
  };


  const handleReset = () => {
    setSelectedYear('');
    setSelectedClass('');
    setSelectedSection('');
    localStorage.removeItem('selectedYear');
    localStorage.removeItem('selectedClass');
    localStorage.removeItem('selectedSection');
  };

  const hasFilters = selectedYear !== '' || selectedClass !== '' || selectedSection !== '';

  const handleCheckboxChange = (studentId) => {
        setSelectedStudentIds((prevSelectedIds) => {
        if (prevSelectedIds.includes(studentId)) {
        return prevSelectedIds.filter((id) => id !== studentId);
        } else {
       return [...prevSelectedIds, studentId];
       }
    });
  };

  const handleSelectAll = () => {
    if (selectedStudentIds?.length === filteredData?.length) {
        setSelectedStudentIds([]);
    } else {
        setSelectedStudentIds(filteredData?.map((student) => student?._id));
    }
};


// Term Icons Color Changing Function //

function isIconEnabled(student, allExams) {
  console.log(allExams);
  const termToCheck = 'Term1';
  const classToCheck = student?.joining_details?.class?.class_name;

  const matchingExams = allExams?.filter((exam) => {
  return (
  exam?.term === termToCheck &&
  exam?.class?.class_name === classToCheck &&
  (
  classToCheck === 'Junior KG' ||
  classToCheck === 'Senior KG' ||
  classToCheck === 'Prep' ||
  (exam?.type === 'FA1' || exam?.type === 'FA2' || exam?.type === 'SA1' || exam?.type === 'TERM1')
  )
  );
  });

  if (classToCheck === 'Junior KG' || classToCheck === 'Senior KG' || classToCheck === 'Prep') {
  return matchingExams.some((exam) => exam?.type === 'FA1');
  }

  const allExamsPresent =
    matchingExams?.some((exam) => exam?.type === 'FA1') &&
    matchingExams?.some((exam) => exam?.type === 'FA2') &&
    matchingExams?.some((exam) => exam?.type === 'SA1') 
  //  matchingExams?.some((exam) => exam?.type === 'TERM1');

  return allExamsPresent;
}


function isIconEnabled1(student, allExams) {
  console.log(allExams);
  const termToCheck = 'Term2';
  const classToCheck = student?.joining_details?.class?.class_name;

  const matchingExams = allExams?.filter((exam) => {
    return (
    exam?.term === termToCheck &&
    exam?.class?.class_name === classToCheck &&
    (
    classToCheck === 'Junior KG' ||
    classToCheck === 'Senior KG' ||
    classToCheck === 'Prep' ||
    (exam.type === 'FA3' || exam?.type === 'FA4' || exam.type === 'SA2' )
    )
    );
  });

  if (classToCheck === 'Junior KG' || classToCheck === 'Senior KG' || classToCheck === 'Prep') {
    return matchingExams.some((exam) => exam?.type === 'FA3');
  }

  const allExamsPresent =
    matchingExams?.some((exam) => exam?.type === 'FA3') &&
    matchingExams?.some((exam) => exam?.type === 'FA4') &&
    matchingExams?.some((exam) => exam?.type === 'SA2') 
    // && matchingExams?.some((exam) => exam?.type === 'TERM2');
  return allExamsPresent;
}


function isIconEnabled2(student, allExams) {
  console.log(allExams);
  const termToCheck = 'Term3';
  const classToCheck = student?.joining_details?.class?.class_name;

  const matchingExams = allExams?.filter((exam) => {
  return (
  exam.term === termToCheck &&
  exam.class.class_name === classToCheck &&
  (
  classToCheck === 'Junior KG' ||
  classToCheck === 'Senior KG' ||
  classToCheck === 'Prep' ||
  (exam.type === 'FA5' || exam?.type === 'FA6' || exam?.type === 'SA3')
  )
  );
  });

  if (classToCheck === 'Junior KG' || classToCheck === 'Senior KG' || classToCheck === 'Prep') {
  return matchingExams?.some((exam) => exam?.type === 'FA5');
  }

  const allExamsPresent =
  matchingExams?.some((exam) => exam?.type === 'FA5') &&
  matchingExams?.some((exam) => exam?.type === 'FA6') &&
  matchingExams?.some((exam) => exam?.type === 'SA3') 
  // && matchingExams?.some((exam) => exam?.type === 'TERM3');
  return allExamsPresent;
  }

  return (
    <div>
      <div>

      <Typography marginBottom={6} variant="h6">Student Details</Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end' , marginBottom:'30px', marginTop:'20px' }}>
      <Grid container spacing={6} >
      <Grid item xs={6} sm={2}>
      <Button component={Link} to="/create-student" variant="contained"  color="primary" sx={{backgroundColor:'#292F8F'}} >
      Create Student
      </Button>
      </Grid>

      <Grid item xs={6} sm={2} >
      <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel id="year-label">Academic Year</InputLabel>
      <Select
      labelId="year-label"
      id="year-select"
      name="year"
      label="Year"
      value={selectedYear}
      // onChange={(e) => setSelectedYear(e.target.value)}
      onChange={(e) => handleYearChange(e)}
      >
   
      {Array?.from(new Set(all_student?.map((item) => item?.joining_details?.year))).map((year) => (
      <MenuItem key={year} value={year}>
      {year}
      </MenuItem>
      ))}
      </Select>
     </FormControl>
     </Grid>

        <Grid item xs={6} sm={2}>
        <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel id="class-label">Grade</InputLabel>
        <Select
         labelId="class-label"
         id="class-select"
         name="class"
         label="Grade"
         value={selectedClass}
        //  onChange={(e) => setSelectedClass(e.target.value)}
      onChange={(e) => handleClassChange(e)}

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
        <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel id="section-label">Section</InputLabel>
        <Select
         labelId="section-label"
         id="section-select"
         name="section"
         label="Section Name"
         value={selectedSection}
        //  onChange={(e) => setSelectedSection(e.target.value)}
      onChange={(e) => handleSectionChange(e)}

         disabled={!selectedClass}
         >
         {class_section?.map((item) => (
         <MenuItem key={item._id} value={item?._id}>
         {item.section_name}
         </MenuItem>
         ))}
         </Select>
         </FormControl>
        </Grid>

        <Grid item xs={8} sm={2}>
        {hasFilters && (
        <p onClick={handleReset} size="small" aria-label="reset">
        {/* <RestartAltIcon className="text-[#43468B]" /> */}  <span className="text-[#54568f] cursor-pointer align-middle font-semibold"> Reset </span>
        </p>
        )}
        </Grid>


        <Grid item xs={6} sm={2} >
        <MoveStudent  StudentIds={selectedStudentIds}  SetIds={setSelectedStudentIds}/>
        </Grid>
        </Grid>
      </div>

    <TableContainer component={Paper}>
    <Table>
    <TableHead>
    <TableRow>
    <TableCell>Sl No.</TableCell>
    <TableCell>Batch</TableCell>
    <TableCell>Admission No.</TableCell>
    <TableCell>Register No.</TableCell>
    <TableCell>Student Name</TableCell>
    <TableCell>Grade</TableCell>
    <TableCell>Section</TableCell>             
    <TableCell>Term 1</TableCell>
    <TableCell>Term 2</TableCell>
    <TableCell>Term 3</TableCell>
    <TableCell>Action</TableCell>
    {/* <TableCell className="text-white" ><Checkbox 
                checked={selectedStudentIds.length === filteredData.length}
                indeterminate={selectedStudentIds.length > 0 && selectedStudentIds.length < filteredData.length}
                onChange={handleSelectAll}
                style={{ color: 'white' }}
            /></TableCell> */}
    </TableRow>
    </TableHead>
    <TableBody>
    {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((student, index) => (
    <TableRow onClick={() => handleClickrow(student?._id)} style={{ cursor: 'pointer' }} key={student.id}>
    <TableCell>{index + 1}</TableCell>
    <TableCell>{student.joining_details?.year}</TableCell>
    <TableCell>{student.joining_details?.admission_number}</TableCell>
    <TableCell>{student.joining_details?.register_number}</TableCell>
    <TableCell>{student.personal_details?.full_name}</TableCell>
    <TableCell>{student.joining_details?.class?.class_name}</TableCell>
    <TableCell>{student.joining_details?.section?.section_name}</TableCell>
    <TableCell ><div className="pl-4 "  onClick={(e) => e.stopPropagation()}> <GetAppIcon style={{cursor:'pointer', color:isIconEnabled(student, all_exams) ? '#F5821F' : 'gray'}} onClick={() => {if (isIconEnabled(student, all_exams)) {onFinish(student?._id, 'Term1'); handleOpen1()}}}/></div></TableCell>
    <TableCell><div className="pl-4 "  onClick={(e) => e.stopPropagation()}> <GetAppIcon style={{cursor:'pointer', color:isIconEnabled1(student, all_exams) ? '#F5821F' : 'gray'}}  onClick={() => {if (isIconEnabled1(student, all_exams)) {onFinish(student?._id, 'Term2'); handleOpen1()}}}/></div></TableCell>    
    <TableCell><div className="pl-4 "  onClick={(e) => e.stopPropagation()}><GetAppIcon style={{cursor:'pointer', color:isIconEnabled2(student, all_exams) ? '#F5821F' : 'gray'}}  onClick={() => {if (isIconEnabled2(student, all_exams)) {onFinish(student?._id, 'Term3'); handleOpen1()}}}/></div></TableCell>

    <TableCell>
    <Box sx={{ display: 'flex', gap:'10px' }}>
    <Link to={`/edit-student/${student?._id}`} onClick={(e) => {e.stopPropagation()}} >
    <ModeEditOutlineOutlinedIcon     style={{
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
    <div onClick={(e) => e.stopPropagation()}>
    {/* <DeleteOutlinedIcon   
      style={{
          color:'#757575',
          transition: 'color 0.3s ease',
          cursor:'pointer'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#EB5757';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#757575'; 
        }} onClick={() => {setDeleteStudentId(student?._id); handleOpen()}} /> */}
    <Modal  open={open}
     onClose={handleClose}
     BackdropProps={{ invisible: true }}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description">

     <Box  sx={style}>
    <Typography gutterBottom variant='h6'>Confirm Deletion</Typography>
    <Typography gutterBottom mb={3}>Are you sure you want to delete this student?</Typography>
    <span style={{float:'right'}}>
    <Button onClick={handleClose} color="primary">Cancel</Button>
    <Button onClick={handleDelete} color="primary">Yes, Delete</Button>
    </span>
    </Box>
    </Modal>
    </div>
    </Box>
    </TableCell>
    {/* <TableCell>
    <Checkbox onClick={(e) => e.stopPropagation()}
    checked={selectedStudentIds.includes(student?._id)}
    onChange={() => handleCheckboxChange(student?._id)}
    />
  </TableCell> */}
   </TableRow>
  ))}
  </TableBody>
    </Table>
  </TableContainer>
  <TablePagination
    component="div"
    count={filteredData?.length}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    />
    <Modal
    open={open1}
    onClose={handleClose1}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    BackdropProps={{ invisible: true }}
    >



    <Box sx={style1}>
    {(() => {
      const ClassName = reportData?.student?.joining_details?.class?.class_name;
      if (reportData === null || reportData?.cotermdata === null) {
      if (loading) {   
      setTimeout(() => {
      setLoading(false); 
      }, 3000);

      return (
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        >
        <div className="text-xl text-[#43468B]">
        {loading && <CircularProgress />}
        </div>
        </Box>
        );
        }
        return (
        <div
        style={{
        color: 'red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        }}
         >
        <span>
        <ErrorOutlineIcon />
        </span>
        <span className="text-xl font-serif">
        This student coscholastic term marks not updated.
        </span>
        </div>
        );
      } else {
          if (ClassName === 'Prep' || ClassName === 'Junior KG' || ClassName === 'Senior KG') {
          return <Report data={reportData} termData={studentData} />;
        } else if (ClassName === 'Grade 1' || ClassName === 'Grade 2' || ClassName === 'Grade 3' || ClassName === 'Grade 4') {
          const { term } = studentData;

          if (term === 'Term1') {
            return <Report1to4Term1 data={reportData} termData={studentData} />;
          } else if (term === 'Term2') {
            return <Report1to4Term2 data={reportData} termData={studentData} />;
          } else {
            // Handle other terms if necessary
            return  <Report1to4Term3 data={reportData} termData={studentData} />;
          }


        } else if (ClassName === 'Grade 5' || ClassName === 'Grade 6' || ClassName === 'Grade 7' || ClassName === 'Grade 8' || ClassName === 'Grade 9' || ClassName === 'Grade 10') {
          const { term } = studentData;

          if (term === 'Term1') {
            return <Report5to10Term1 data={reportData} termData={studentData} />;
          } else if (term === 'Term2') {
            return <Report5to10Term2 data={reportData} termData={studentData} />;
          } else {
            // Handle other terms if necessary
            return  <Report5to10Term3 data={reportData} termData={studentData} />;
          }
        }
      }
    })()}
  </Box>

   </Modal>
  </div>
  </div>
  );
  };
export default StudentTable;
