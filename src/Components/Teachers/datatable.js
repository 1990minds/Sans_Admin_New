import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { deleteTeacher } from "../../api/teacher";
import { useDispatch } from "react-redux";
import { Button } from '@mui/material';
import { Modal, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {  TablePagination} from "@mui/material";

const TeacherTable = ({ data }) => {

const dispatch = useDispatch()
const nav = useNavigate()
const [open, setOpen] = React.useState(false);
const [deleteTeacherId, setDeleteTeacherId] = useState('');
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
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



const handleDelete = () => {
  dispatch(deleteTeacher(deleteTeacherId))
  setOpen(false);
};

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const handleTableRowClick =(teacherId) => {

  const url = `/teacherassaign/${teacherId}`;
  nav(url);
}

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};




  return (
    <div>
    <TableContainer component={Paper}>
    <Table>
    <TableHead>
    <TableRow>
    <TableCell>Sl No.</TableCell>
    <TableCell>Teacher Name</TableCell>
    <TableCell>Date of Joining</TableCell>
    <TableCell>Major in</TableCell>             
    <TableCell>Phone No.</TableCell>
    <TableCell>Action</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {data?.length > 0 ? (
     data?.map((teacher, index) => (  
    <TableRow onClick={() => handleTableRowClick(teacher?._id)} style={{ cursor: 'pointer' }} key={teacher.id}>
    <TableCell>{index + 1}</TableCell>
    <TableCell>{teacher.personal_details?.name}</TableCell>
    <TableCell>
     {teacher?.school_details?.doj? dayjs(teacher?.school_details?.doj).format('DD-MM-YYYY'): ''}
    </TableCell>
    <TableCell>{teacher?.school_details?.subject}</TableCell>
    <TableCell>{teacher?.contact_details?.contact_no}</TableCell>
    <TableCell>
    <Box sx={{ display: 'flex', gap:'8px' }}>
    <Link
      to={`/edit-teachers/${teacher?._id}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{ textDecoration: 'none' }}
    >
      <ModeEditOutlineOutlinedIcon
        style={{
          color:'#757575',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#43468B';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#757575'; 
        }}
      />
    </Link>
    {/* <div onClick={(e) => e.stopPropagation()}>
    <DeleteOutlinedIcon   style={{
          cursor: 'pointer' , color:'#757575',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#EB5757';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#757575'; 
        }}  onClick={() => {setDeleteTeacherId(teacher?._id); handleOpen()}} />
    <Modal  open={open}
     onClose={handleClose}
     BackdropProps={{ invisible: true }}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description">

     <Box  sx={style}>
    <Typography gutterBottom variant='h6'>Confirm Deletion</Typography>
    <Typography gutterBottom mb={3}>Are you sure you want to delete this teacher?</Typography>
    <span style={{float:'right'}}>
      <Button onClick={handleClose} color="primary">Cancel</Button>
      <Button onClick={handleDelete} color="primary">Yes, Delete</Button>
      </span>
      </Box>
    </Modal>
    </div> */}
   </Box>
   </TableCell>
   </TableRow>
  ))): (
    <TableRow>
      <TableCell colSpan={6} align="center" >
       <span className="text-red-500"> No data available</span>
      </TableCell>
    </TableRow>
  )}
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
export default TeacherTable;
