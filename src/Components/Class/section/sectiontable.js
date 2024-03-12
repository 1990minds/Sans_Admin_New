import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Modal, Typography } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { deleteSection } from "../../../api/section";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TablePagination } from '@mui/material';
import dayjs from 'dayjs';
import { fetchAllStudent, studentSelector } from "../../../api/student";

const SectionTable = ({ data }) => {

console.log(data)
const dispatch = useDispatch()
const nav = useNavigate()
const [open, setOpen] = React.useState(false);
const {id} = useParams()
const [Delete, SetDelete] = useState('')
const {all_student}=useSelector(studentSelector)
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


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



console.log(id)
const handleDelete = () => {
  console.log(id)
  dispatch(deleteSection(Delete, id))
  handleClose(false);
};


const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

console.log(all_student)

useEffect(()=>{
  dispatch(fetchAllStudent())
},[])


const countSectionsForStudents = (sectionId) => {
  const sectionsForStudent = all_student?.filter((student) => student?.joining_details?.section?._id  === sectionId);
  console.log(`Sections for class ${sectionId}:`, sectionsForStudent); 
  return sectionsForStudent?.length;
};



  return (
    <div>
    <TableContainer component={Paper}>
    <Table>
    <TableHead>
    <TableRow>
    <TableCell>Sl No.</TableCell>
    <TableCell>Grade</TableCell>
    <TableCell>Section</TableCell>
    <TableCell>Number of Students</TableCell>             
    <TableCell>Grade Teacher</TableCell>
    <TableCell>Action</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((section, index) => ( 
    <TableRow key={section.id}>
    <TableCell>{index + 1}</TableCell>
    <TableCell>{section?.class?.class_name}</TableCell>
    <TableCell>{section?.section_name}</TableCell>
    <TableCell><span className="ml-12">{countSectionsForStudents(section?._id)}</span></TableCell>
    <TableCell>
    <Link to={`/assign-section/${section?._id}`} className={section?.teacher?.personal_details?.name ? '' : 'not-assigned'}
      onClick={(e) => {e.stopPropagation();}}>
    {section?.teacher?.personal_details?.name || 'Not assign'}
    </Link>
    </TableCell>
    <TableCell>
    <Box sx={{ display: 'flex', gap:'6px' }}>
    <Link to={`/edit-sections/${section?._id}`} onClick={(e) => {e.stopPropagation()}} >
    <ModeEditOutlineOutlinedIcon style={{
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
    <div>
   
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
        }}  onClick={() => {SetDelete(section?._id);; handleOpen()}} />
    <Modal  open={open}
     onClose={handleClose}
     BackdropProps={{ invisible: true }}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description">

     <Box  sx={style}>
    <Typography gutterBottom variant='h6'>Confirm Deletion</Typography>
    <Typography gutterBottom mb={3}>Are you sure you want to delete this section?</Typography>
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
  count={data?.length}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  />
  </div>
    );
  };
export default SectionTable;
