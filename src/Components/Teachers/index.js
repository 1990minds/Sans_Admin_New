
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { loginSelector } from '../../api/authSlice';
import { fetchAllTeacher, teacherSelector } from '../../api/teacher';
import Datatable from './datatable';
import Button from '@mui/material/Button';
import { FormControl, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useDebounce } from "use-debounce";
import { keyUri, config } from '../../key'
import axios from 'axios'

function Teachers() {


  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #43468B',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  const [loading, setLoading]=useState(false)
  const dispatch=useDispatch()
  const {all_teacher}=useSelector(teacherSelector)
  const [search, setSearch] = useState('')
  const [filter,setFilter]=useState([])
  const [debouncedText] = useDebounce(search, 1000);
  
 
  
  useEffect(()=>{
    dispatch(fetchAllTeacher())
  },[dispatch])

  useEffect(() => {
  setLoading(true);
  axios.get(keyUri.BACKEND_URI + `/teacher?search=${debouncedText}`, config)
  .then(({ data }) => {
  setFilter(data?.filterTeacher);
  setLoading(false);
  })
  .catch((error) => {
  console.error('Error fetching teacher data:', error);
  setLoading(false);
  });
  }, [dispatch, debouncedText]);

  const onSearch = (e) => {
  setLoading(true)
  setSearch(e.target.value)        
  }
       

  return (<>
    <div className="mb-4 ">  
    <Typography marginBottom={3} variant="h6">Teacher Details</Typography>
    <div className='flex justify-between'>
    <Button component={Link} to="/create-teachers" variant="contained"  color="primary" sx={{backgroundColor:'#292F8F'}} >
      Create Teacher
    </Button>


        <FormControl className={search}>
        <TextField
          size="small"
          variant="outlined"
          value={search}
          onChange={onSearch}
          InputProps={{
          startAdornment: (
          <InputAdornment position="start">
          <SearchIcon />
          </InputAdornment>
          ),
          }}
        />
      </FormControl>





    </div>
    </div>
    {  
     <Datatable  data ={(filter?.length >= 0) ? filter : all_teacher} loading={loading}/>
    }
    </>
    )
    }

export default Teachers