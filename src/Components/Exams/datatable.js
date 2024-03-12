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
import { Link} from "react-router-dom";
import { Box, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TablePagination, TextField } from "@mui/material";
import { deleteExams, fetchAllExams, examsSelector } from "../../api/exams";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mui/material';
import { Modal, Typography } from '@mui/material';
import { classesSelector, fetchAllClasses } from "../../api/class";
import { fetchClassSection, sectionSelector } from "../../api/section";
import './index.css';
import dayjs from "dayjs";

const ExamsTable = () => {

const dispatch = useDispatch()
const [open, setOpen] = React.useState(false);
const [deleteExamsId, setDeleteExamsId] = useState('');
const [selectedClass, setSelectedClass] = useState('');
const [selectedTerm, setSelectedTerm] = useState('');
const [selectedYear, setSelectedYear] = useState('');
const {all_classes} = useSelector(classesSelector)
const {all_exams}=useSelector(examsSelector)
const [filteredData, setFilteredData] = useState(all_exams);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


console.log('all exms',all_exams)
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
  zIndex:10
};  


useEffect(() => {
  dispatch(fetchAllExams());
}, [dispatch])

useEffect(()=>{
  dispatch(fetchAllClasses())
  },[])

useEffect(()=>{
  dispatch(fetchClassSection(selectedClass))
  },[selectedClass])

const handleDelete = () => {
  dispatch(deleteExams(deleteExamsId))
  handleClose()
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const handleReset = () => {
  setSelectedYear('');
  setSelectedClass('');
  setSelectedTerm('');
};

const hasFilters = selectedYear !== '' || selectedClass !== '' || selectedTerm !== '';

useEffect(() => {
  if (all_exams && all_exams.length > 0) {
      applyFilters();
  }
}, [all_exams, selectedYear, selectedClass, selectedTerm]);


  const applyFilters = () => {
    const filteredData = all_exams?.filter((exams) => {
    const yearMatches = !selectedYear || exams?.year === selectedYear;
    const classMatches = !selectedClass || exams?.class?._id === selectedClass;
    const sectionMatches = !selectedTerm || exams?.term === selectedTerm;
    return yearMatches && classMatches && sectionMatches;
    });

    setFilteredData(filteredData);
  };



  return (
    <div>


      <Typography marginBottom={6} variant="h6">Exams Details</Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom:'6px', marginTop:'10px' }}>
      <Grid container spacing={6} >
      <Grid item xs={6} sm={2}>
      <Button component={Link} to="/create-exams" variant="contained"  color="primary" sx={{backgroundColor:'#292F8F'}} >
      Create Exams
      </Button>
      </Grid>

      <Grid item xs={8} sm={2}  style={{marginLeft:'16%'}}>
        {hasFilters && (
        <p onClick={handleReset} size="small" aria-label="reset">
        {/* <RestartAltIcon className="text-[#43468B]" /> */}  <span className="text-[#54568f] cursor-pointer align-middle font-semibold"> Reset </span>
        </p>
        )}
        </Grid>


      <Grid item xs={6} sm={2}>
      <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel id="year-label">Academic Year</InputLabel>
      <Select
      labelId="year-label"
      id="year-select"
      name="year"
      label="Year"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      >
      {Array.from(new Set(all_exams?.map((item) => item?.year))).map((year) => (
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

      <Grid item xs={6} sm={2}   mb={3}>
      <TextField
          select
          name="term"
          label="Term"
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          fullWidth
          required
          size="small"
          disabled={!selectedClass}
        >
      <MenuItem value="Term1">Term 1</MenuItem>
      <MenuItem value="Term2">Term 2</MenuItem>
      <MenuItem value="Term3">Term 3</MenuItem> 
      </TextField>
      </Grid>

      </Grid>
      </div>

    <TableContainer component={Paper}>
    <Table>
    <TableHead>
    <TableRow>
    <TableCell>Sl No.</TableCell>
    <TableCell>Grade</TableCell>
    <TableCell>Term</TableCell>
    <TableCell>Type</TableCell>
    <TableCell>From Date</TableCell>
    <TableCell>To Date</TableCell>
    <TableCell>Created At</TableCell>
    {/* <TableCell>Status</TableCell>              */}
    <TableCell>Action</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((exams, index) => (
    <TableRow key={exams.id}>
    <TableCell>{index + 1}</TableCell>
    <TableCell>{exams.class?.class_name}</TableCell>
    <TableCell>{exams.term}</TableCell>
    <TableCell>{exams.type}</TableCell>
    <TableCell>{exams.from_date? dayjs(exams.from_date).format('DD-MM-YYYY'): ''}</TableCell>
    <TableCell>{exams.to_date? dayjs(exams.to_date).format('DD-MM-YYYY'): ''}</TableCell>
    <TableCell>{exams.createdAt? dayjs(exams.createdAt).format('DD-MM-YYYY'): ''}</TableCell>
    {/* <TableCell>{exams.status}</TableCell> */}
    <TableCell>
    <Box sx={{ display: 'flex', gap:'8px' }}>
    <Link to={`/edit-exams/${exams?._id}`} onClick={(e) => {e.stopPropagation()}} >
    <ModeEditOutlineOutlinedIcon  style={{
          color:'#757575',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#43468B';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#757575'; 
        }}  />
    </Link>
    <div onClick={(e) => e.stopPropagation()}>
    <DeleteOutlinedIcon  style={{
          color:'#757575',
          transition: 'color 0.3s ease',
          cursor:'pointer'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#EB5757';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#757575'; 
        }}  onClick={() => {setDeleteExamsId(exams?._id); handleOpen()}} />
    <Modal  open={open}
     onClose={handleClose}
     BackdropProps={{ invisible: true }}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description">

     <Box  sx={style}>
    <Typography gutterBottom variant='h6'>Confirm Deletion</Typography>
    <Typography gutterBottom mb={3}>Are you sure you want to delete this exams?</Typography>
    <span style={{float:'right'}}>
    <Button onClick={handleClose} color="primary">Cancel</Button>
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
      count={filteredData?.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>

    );
  };
export default ExamsTable;
