import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Modal, Typography } from '@mui/material';
import { deleteClasses } from '../../api/class';
import { useDispatch, useSelector } from 'react-redux';
import {Button,TablePagination,} from '@mui/material';
import './index.css';
import { fetchAllSection, fetchClassSection, sectionSelector } from '../../api/section';
import student, { fetchAllStudent, studentSelector } from '../../api/student';

  const ClassesTable = ({ data }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [deleteClassId, setDeleteClassId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [open, setOpen] = React.useState(false);
  const {all_section} = useSelector(sectionSelector)
  const {all_student} = useSelector(studentSelector)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 2,
    p: 2,
  };  


  console.log(all_student)

  const handleDelete = () => {
    dispatch(deleteClasses(deleteClassId));
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTableRowClick = (classid) => {
    const url = `/section/${classid}`;
    nav(url);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(0);
  };
  



useEffect(()=>{
  dispatch(fetchAllSection())
  dispatch(fetchAllStudent())
},[])



const countSectionsForClass = (classId) => {
  const sectionsForClass = all_section?.filter((section) => section?.class === classId);
  console.log(`Sections for class ${classId}:`, sectionsForClass); 
  return sectionsForClass?.length;
};


const countClassStudents = (classId) => {
  const ClassStudents = all_student?.filter((student) => student?.joining_details?.class?._id === classId);
  console.log(`Sections for class ${classId}:`, ClassStudents); 
  return ClassStudents?.length;
};



  return (
    <div>
      <TableContainer component={Paper}>
      <Table>
      <TableHead>
      <TableRow>
      <TableCell>Sl No.</TableCell>
      <TableCell>Grade</TableCell>
      <TableCell>No. of Section</TableCell>
      <TableCell>No. of Students</TableCell>
      {/* <TableCell>Action</TableCell> */}
      </TableRow>
      </TableHead>
      <TableBody>
      {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item, index) => (
   
     <TableRow className="custom-table-row "
      onClick={() => handleTableRowClick(item?._id)}
      style={{ cursor: 'pointer', height:'10px' }}
      key={item?._id}
      >

      <TableCell>{index + 1}</TableCell>
    
      <TableCell>{item?.class_name}</TableCell>
      <TableCell><span className='ml-10'>{countSectionsForClass(item?._id)}</span></TableCell>
      <TableCell><span className='ml-10'>{countClassStudents(item?._id)}</span></TableCell>
      {/* <TableCell>


      <Box sx={{ display: 'flex' }}>
      <div onClick={(e) => e.stopPropagation()}>
 
      <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => {setDeleteClassId(item?._id);handleOpen();}}/>
  
        <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      <Box  sx={style}>
      <Typography gutterBottom variant='h6'>Confirm Deletion</Typography>
      <Typography gutterBottom mb={3}>Are you sure you want to delete this class?</Typography>
      <span style={{float:'right'}}>
      <Button onClick={handleClose} color="primary">Cancel</Button>
      <Button onClick={handleDelete} color="primary">Yes, Delete</Button>
      </span>
      </Box>
      </Modal>
      </div>
      </Box>
      </TableCell> */}
      </TableRow>



      ))}
      </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ClassesTable;