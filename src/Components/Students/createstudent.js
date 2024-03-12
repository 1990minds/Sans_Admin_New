import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, FormControl, InputLabel, MenuItem, Select, Breadcrumbs, Typography } from "@mui/material";
import { createstudent } from "../../api/student";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './index.css'
import { classesSelector, fetchAllClasses } from "../../api/class";
import { fetchClassSection, sectionSelector } from "../../api/section";
import storage from "../Shared/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';




const CreateStudentForm = () => {

    const dispatch = useDispatch()
    const nav = useNavigate()
    const {all_classes} = useSelector(classesSelector)
    const {class_section} = useSelector(sectionSelector)
    const [selectedClassID, setSelectedClassID] = useState('');
    const [uploadSuccessMsg, setLogoUploadSuccess] = useState("");
    const [logoPercent, setLogoPercent] = useState(0);
    const [Logo, SetLogo] = useState("");
    const [pdfurl, setPdfUrl] = useState("");
    const [tcurl, setTcUrl] = useState("");
    const [fileName, setFileName] = useState('')  
    const [TcfileName, setTcFileName] = useState('')  
    const [loading, setLoading] = useState(false)
    const [loader, setLoader] = useState(false)


    const years = Array.from({ length: 31 }, (_, index) => 2023 + index);

    const academicYears = years.map((startYear) => {
      const endYear = startYear + 1;
      return `${startYear}-${String(endYear).slice(2)}`;
    });

    console.log(pdfurl)

    console.log(selectedClassID)


  const [studentData, setStudentData] = useState({
    full_name: "",
    dob: null,
    gender: "",
    blood_group: "",
    birth_place:"",
    mother_tongue: "",
    caste: "",
    religion:"",
    nationality: "",
    standard_last_studied: "",
    student_image: "",
    father_name: "",
    father_qualification: "",
    father_occupation: "",
    mother_qualification: "",
    mother_name: "",
    mother_occupation: "",
    father_no:"",
    mother_no: "",
    permanent_address: "",
    current_address:"",
    adhaar_no: "",
    caste_no: "",
    doj: null,
    class: "",
    section: "",
    admission_number: "",
    register_number: "",
    year:"",
    height:"",
    weight:"",
    tc_no:"",
    sats_id:"",
  });


  console.log(studentData)
  console.log(studentData.section)

  const handleChange = (e, field) => {
    if (field === "dob") {
      setStudentData({ ...studentData, dob: e });
    } else if (field === "doj") {
      setStudentData({ ...studentData, doj: e });
    } else {
      const { name, value } = e.target;
      setStudentData({ ...studentData, [name]: value });
    }
  };


    useEffect(()=>{
      dispatch(fetchAllClasses())
    },[])

    useEffect(()=>{
    dispatch(fetchClassSection(selectedClassID))
    },[selectedClassID])


    const calculateBMI = () => {
    const heightInMeters = studentData.height / 100; 
    const weight = parseFloat(studentData.weight);
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setStudentData((prevData) => ({
    ...prevData,
    bmi,
    }));
    };


    React.useEffect(() => {
          calculateBMI();
    }, [studentData.height, studentData.weight]);


  const handleDeleteClickLogo = () => {
    SetLogo('');
    setLogoUploadSuccess("");
  };




  const handleFileInputChange = (event) => {
  setLogoPercent(0);
  const newSelectedFile = event.target.files[0];
  const isJpgOrPng = newSelectedFile.type === "image/jpeg" || newSelectedFile.type === "image/png" || newSelectedFile.type === "image/webp";
      if (!isJpgOrPng) {
        toast.warning("You can only upload JPG/PNG/WEBP file!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeButton: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      const isLt100KB = newSelectedFile.size / 1024 < 100;
      if (!isLt100KB) {
        toast.warning("Image size must be less than 100kb", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if(isJpgOrPng && isLt100KB) {
    const storageRef = ref(storage,`/sans/${newSelectedFile.name}`);
    const uploadFile = uploadBytesResumable(storageRef, newSelectedFile);
    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setLogoPercent(percent);
        if (percent == 100) setLogoUploadSuccess("Image Uploaded Successfully.");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
          SetLogo(url);
        });
      }
    );
      }
  };

  const uploadFile = async (event) => {
    setLoading(true); 
 try {
  const item = event.target.files[0];
  setFileName(item?.name);
  const storageRef = ref(storage, `/sans/${item?.name}`);
  const uploadFile = uploadBytesResumable(storageRef, item);
  uploadFile.on('state_changed', (snapshot) => {
  }, (error) => {
    setLoading(false);
  }, () => {
  getDownloadURL(uploadFile?.snapshot?.ref)
  .then((url) => {
    setPdfUrl(url);
   })
  .catch((error) => {
  })
  .finally(() => {
    setLoading(false);
  });
  });
  } catch (error) {
  console.error('Error uploading file:', error);
  setLoading(false); 
  }
  };


  const handleDeletePdf = () => {
    setPdfUrl('');
  };
      
  
  
  const uploadTcFile = async (event) => {
        setLoader(true); 
     try {
      const item = event.target.files[0];
      setTcFileName(item?.name);
      const storageRef = ref(storage, `/sans/${item?.name}`);
      const uploadFile = uploadBytesResumable(storageRef, item);
      uploadFile.on('state_changed', (snapshot) => {
      }, (error) => {
      setLoader(false);
      }, () => {
      getDownloadURL(uploadFile?.snapshot?.ref)
      .then((url) => {
       setTcUrl(url);
       })
      .catch((error) => {
      })
      .finally(() => {
       setLoader(false);
      });
      });
      } catch (error) {
      console.error('Error uploading file:', error);
      setLoader(false); 
      }
      };

      const handleDeleteTc = () => {
        setTcUrl('');
      };
      


  const onFinish = (e) => {
    e.preventDefault();

    const StudentData ={
      personal_details:{
        full_name: studentData.full_name,    
        dob: studentData.dob,
        gender: studentData.gender,
        blood_group:studentData.blood_group,
        birth_place: studentData.birth_place,
        mother_tongue: studentData.mother_tongue,
        caste:studentData.caste,
        religion: studentData.religion,
        nationality: studentData.nationality,
        student_image:Logo,
        
      },

      contact_details:{
        father_name: studentData.father_name,
        father_qualification: studentData.father_qualification,
        father_occupation: studentData.father_occupation,
        mother_name: studentData.mother_name,
        mother_qualification: studentData.mother_qualification,
        mother_occupation: studentData.mother_occupation,
        father_no: studentData.father_no,
        mother_no: studentData.mother_no,
        permanent_address: studentData.permanent_address,
        current_address: studentData.current_address,
      },

      documents:{
        adhaar_no: studentData.adhaar_no,
        caste_no: studentData.caste_no,
        birth_certificate:pdfurl,
        tc_details:tcurl,
      },

      joining_details:{
        standard_last_studied:studentData.standard_last_studied,      
        doj: studentData.doj,
        class: selectedClassID,
        section: studentData.section,
        admission_number: studentData.admission_number,
        register_number: studentData.register_number,
        year: studentData.year,
        height:studentData.height,
        weight:studentData.weight,
        BMI:studentData.bmi,
        sats_id:studentData.sats_id,
        tc_no:studentData.tc_no,

  
      },
    }
    
    console.log("Student data submitted:", StudentData);
    dispatch(createstudent(StudentData))
    nav('/student')
  };

  const buttonStyle = {
    marginLeft: 'auto',
    marginTop:'40px',
    background:'#43468B'
    
    
  };
  const theme = createTheme({
    overrides: {
    MuiInputBase: {
    input: {
    padding: '4px 6px',
    height: '16px', 
    },
    },
    },
  });

 
  return (

  <ThemeProvider theme={theme}>



<Typography marginBottom={1} variant="h6">Create Student</Typography>

  <Breadcrumbs  aria-label="breadcrumb" style={{marginBottom:'8px'}}>
  <Link underline="hover" color="inherit" to='/'>
    Home
  </Link>
  <Link underline="hover" color="inherit" to='/student'>
    Students
  </Link>
  </Breadcrumbs>




<form onSubmit={onFinish}>
     

<div style={{ margin:'0 auto', padding:'5px', width:'100%' }}>


<Box marginBottom={1}>
<Typography gutterBottom fontSize={16}>Personal Details</Typography>
</Box>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
        <TextField
        name="full_name"
        label="Full name"
        value={studentData.full_name}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="dob"
          label="Date of birth"
          value={studentData.dob}
          onChange={(date) => handleChange(date, "dob")} 
          fullWidth       
          className="custom-datepicker"
          renderInput={(props) => <TextField {...props} required />}
        />
        </LocalizationProvider>
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
          select
          name="gender"
          label="Gender"
          value={studentData.gender}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
      </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="blood_group"
        label="Blood Group"
        value={studentData.blood_group}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="birth_place"
        label="Birth Place"
        value={studentData.birth_place}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>

        <Grid item xs={6} sm={3}>
        <TextField
        name="mother_tongue"
        label="Mother tongue"
        value={studentData.mother_tongue}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>

        <Grid item xs={6} sm={3}>
        <TextField
        name="caste"
        label="Caste"
        value={studentData.caste}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>

        <Grid item xs={6} sm={3}>
        <TextField
        name="religion"
        label="Religion"
        value={studentData.religion}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="nationality"
        label="Nationality"
        value={studentData.nationality}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


     
        <Grid item xs={12} sm={3}>

      <div  className= "flex justify-start gap-6 "  >   
      <Typography className=" text-[16px] text-[#757575] pt-[12px] pl-4 "> Student Profile</Typography>
      <span>
      {Logo ? (
      <>
      <img
      src={Logo}
      style={{ Width: '80px', height:'80px', border:'1px solid black' }} 
      />
      <button
      type="button"
      style={{float:'right'}}
      onClick={handleDeleteClickLogo}>
      <p className="text-gray-400 hover:text-gray-700">
      <DeleteIcon />
      </p>
      </button>

      </>
      ) : (
      <input
      className="w-[100px] pt-2"
      type="file"
      accept="image/*"
      onChange={handleFileInputChange}
      />
      )} 
      </span>
      </div>
      </Grid>
      </Grid>

        

        <div style={{ marginBottom: '16px' }}></div> 
        <div style={{ marginBottom: '26px' }}></div>
        <Box marginBottom={1}>
        <Typography gutterBottom fontSize={16}>Parents/Guardian and Contact Details</Typography>
        </Box>


        <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
        <TextField
        name="father_name"
        label="Father Name"
        value={studentData.father_name}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="father_qualification"
        label="Father Qualification. "
        value={studentData.father_qualification}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="father_occupation"
        label="Father Occupation"
        value={studentData.father_occupation}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3} >
        <TextField
        name="father_no"
        label="Father No."
        value={studentData.father_no}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{inputProps: {maxLength: 10,},}}
        error={studentData.father_no.length > 0 && studentData.father_no.length < 10}
        helperText={studentData.father_no.length > 0 && studentData.father_no.length < 10? 'Please enter a correct 10-digit number': ''}
        />
        </Grid>

        <Grid item xs={6} sm={3}>
        <TextField
        name="mother_name"
        label="Mother Name"
        value={studentData.mother_name}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="mother_qualification"
        label="Mother Qualification.  "
        value={studentData.mother_qualification}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="mother_occupation"
        label="Mother Occupation"
        value={studentData.mother_occupation}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>




        <Grid item xs={6} sm={3}>
        <TextField
        name="mother_no"
        label="Mother No."
        value={studentData.mother_no}
        InputProps={{ inputProps: { maxLength: 10 } }}
        onChange={handleChange}
        fullWidth
        size="small"
        error={studentData.mother_no.length > 0 && studentData.mother_no.length < 10}
        helperText={studentData.mother_no.length > 0 && studentData.mother_no.length < 10? 'Please enter a correct 10-digit number': ''}
       />
      </Grid>
       

        <Grid item xs={6} sm={3}>
        <TextField
          name="permanent_address"
          label="Permanent address"
          value={studentData.permanent_address}
          onChange={handleChange}
          fullWidth
          multiline 
          rows={4} 
          size="small"
        />
        </Grid>

        <Grid item xs={6} sm={3}>
        <TextField
        name="current_address"
        label="Current address"
        value={studentData.current_address}
        onChange={handleChange}
        fullWidth
        multiline 
        rows={4} 
        size="small"
        />
        </Grid>

        </Grid>

      

        <div style={{ marginBottom: '16px' }}></div>
      
      <Box marginBottom={1}>
      <Typography gutterBottom fontSize={16}>Joining Details</Typography>
      </Box>


      <Grid container spacing={2}>


      <Grid item xs={6} sm={3}>
        <TextField
        name="standard_last_studied"
        label="Standard last studied"
        value={studentData.standard_last_studied}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="tc_no"
        label="TC No"
        value={studentData.tc_no}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>


        <Grid item xs={6} sm={3}>
        <TextField
        name="sats_id"
        label="Sats ID"
        value={studentData.sats_id}
        onChange={handleChange}
        fullWidth
        size="small"
        />
        </Grid>



      <Grid item xs={6} sm={3}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name="doj"
        label="Date of joining"
        value={studentData.doj}
        onChange={(date) => handleChange(date, "doj")}
        fullWidth      
        size="small"
        className="custom-datepicker"
        renderInput={(props) => (<TextField {...props} required/>)}/>
      </LocalizationProvider>
      </Grid>



  <Grid item xs={6} sm={3}>
  <FormControl variant="outlined" size="small" fullWidth  required>
  <InputLabel id="class-name-label">Grade</InputLabel>
  <Select
      labelId="class-name-label"
      id="class-name-select"
      name="class"
      label="Grade"
      required
      value={selectedClassID}
      onChange={(e) => setSelectedClassID(e.target.value)}
      >
      {all_classes?.map((item) => (
      <MenuItem key={item._id} value={item._id}>
      {item?.class_name}
      </MenuItem>
      ))}
  </Select>
  </FormControl>
  </Grid>


      <Grid item xs={6} sm={3}>
  <FormControl variant="outlined" size="small" fullWidth required>
  <InputLabel id="class-name-label">Section</InputLabel>
  <Select
      labelId="class-name-label"
      id="class-name-select"
      name="section"
      label="Section Name"
      
      value={studentData?.section}
      onChange={handleChange}
      >
      {class_section?.map((item) => (
      <MenuItem key={item._id} value={item?._id}>
      {item.section_name}
      </MenuItem>
      ))}
  </Select>
  </FormControl>
  </Grid>


      <Grid item xs={6} sm={3}>
      <TextField
      name="admission_number"
      label="Admission Number"
      value={studentData.admission_number}
      onChange={handleChange}
      fullWidth
      required
      size="small"
      />
      </Grid>


      <Grid item xs={6} sm={3}>
      <TextField
      name="register_number"
      label="Register Number"
      value={studentData.register_number}
      onChange={handleChange}
      fullWidth
      required
      size="small"
      style={{ height: '10px' }}
      />
      </Grid>


      <Grid item xs={6} sm={3} >
        <TextField
          select
          name="year"
          label="Academic Year"
          value={studentData.year}
          onChange={handleChange}
          fullWidth
          required
          size="small"
          style={{height:'1px'}}
        >
        {academicYears?.map((year) => (
      <MenuItem key={year} value={year}>
      {year}
    </MenuItem>
      ))}
        </TextField>
      </Grid>



      <Grid item xs={6} sm={3}>
      <TextField
      name="height"
      label="Height cm"
      value={studentData.height}
      onChange={handleChange}
      fullWidth
      size="small"
      style={{ height: '10px' }}
      />
      </Grid>

      <Grid item xs={6} sm={3}>
      <TextField
      name="weight"
      label="Weight"
      value={studentData.weight}
      onChange={handleChange}
      fullWidth
      size="small"
      style={{ height: '10px' }}
      />
      </Grid>



      <Grid item xs={6} sm={3}>
        <TextField
          name="BMI"
          label="BMI"
          value={studentData.bmi}
          InputProps={{ readOnly: true }}
          fullWidth
          size="small"
          style={{ height: '10px' }}
        />
      </Grid>






      </Grid>


      <div style={{ marginBottom: '30px' }}></div>
      
      <Box marginBottom={1}>
      <Typography gutterBottom fontSize={16}>Documents</Typography>
      </Box>

      <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
      <TextField
      name="adhaar_no"
      label="Adhaar No."
      value={studentData.adhaar_no}
      onChange={handleChange}
      fullWidth
      size="small"
      InputProps={{ inputProps: { maxLength: 12 } }}
      error={studentData.adhaar_no.length > 0 && studentData.adhaar_no.length < 12}
      helperText={studentData.adhaar_no.length > 0 && studentData.adhaar_no.length < 12? 'Please enter a correct 12-digit number': ''}
      />
      </Grid>


      <Grid item xs={6} sm={3}>
      <TextField
      name="caste_no"
      label="Caste Certificate No."
      value={studentData.caste_no}
      onChange={handleChange}
      fullWidth
      size="small"
      style={{ height: '10px' }}
      />
      </Grid>



      <div className="flex items-center gap-6 ">
      <Typography className="text-[16px] text-[#757575] pt-[12px] pl-4">Birth Certificate</Typography>
      <div className="flex items-center gap-1 w-60">
      {loading && <p>Loading...</p>}
      {pdfurl && !loading &&<p className="border px-5 py-1 mt-4 rounded" >{fileName} <span className="text-green-600"><CheckCircleIcon/></span>      
      <button
       type="button"
       className=""
       onClick={handleDeletePdf}
       >
       <p className="text-gray-400 hover:text-gray-700 pl-4">
       <DeleteIcon />
       </p>
       </button>           
       </p>}
        
        {!pdfurl && !loading &&(
        <>
        <input
        className="w-[42%] pt-2"
        type="file"
        accept=".pdf"
        onChange={(file) => uploadFile(file)}
        />        
        </>
        )}
      </div>
      </div>



      <div className="flex items-center gap-6 ">
      <Typography className="text-[16px] text-[#757575] pt-[12px] pl-4">Upload TC</Typography>
      <div className="flex items-center gap-1 w-60">
      {loader && <p>Loading...</p>}
      {tcurl && !loader &&<p className="border px-5 py-1 mt-4 rounded" >{TcfileName} <span className="text-green-600"><CheckCircleIcon/></span>      
      <button
       type="button"
       className=""
       onClick={handleDeleteTc}
       >
       <p className="text-gray-400 hover:text-gray-700 pl-4">
       <DeleteIcon />
       </p>
       </button>           
       </p>}
        
        {!tcurl && !loader &&(
        <>
        <input
        className="w-[42%] pt-2"
        type="file"
        accept=".pdf"
        onChange={(file) => uploadTcFile(file)}
        />        
        </>
        )}
      </div>
      </div>







      </Grid>
      <Box style={{ display: 'flex' }}>
      <Button 
      type="submit"
      variant="contained"
      color="primary"
      style={buttonStyle}
      >
      Create Student
     </Button>
     </Box>


      </div>


    </form>
    </ThemeProvider>
  );
};

export default CreateStudentForm;