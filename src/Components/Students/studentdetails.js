import React, { useEffect } from "react";
import { fetchOneStudent, studentSelector } from "../../api/student";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Typography } from "@mui/material";
import dayjs from "dayjs";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';


const StudentDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { current_student } = useSelector(studentSelector);
  console.log(current_student);

  useEffect(() => {
    dispatch(fetchOneStudent(id));
  }, [dispatch]);


  const handleDownloadClick = () => {
    if (tc_details) {
      window.open(tc_details, '_blank');
    }
  };

  const handleDownloadClick1 = () => {
    if (birth_details) {
      window.open(birth_details, '_blank');
    }
  };




  const studentimage = current_student?.personal_details?.student_image || "N/A"
  const tc_details = current_student?.documents?.tc_details || "N/A"
  const birth_details = current_student?.documents?.birth_certificate || "N/A"

  const student = {
    full_name: current_student?.personal_details?.full_name || "N/A",
    dob: dayjs(current_student?.personal_details?.dob).format('DD/MM/YYYY') || "N/A",
    gender: current_student?.personal_details?.gender || "N/A",
    blood_group: current_student?.personal_details?.blood_group || "N/A",
    birth_place: current_student?.personal_details?.birth_place || "N/A",
    mother_tongue: current_student?.personal_details?.mother_tongue || "N/A",
    caste: current_student?.personal_details?.caste || "N/A",
    religion: current_student?.personal_details?.religion || "N/A",
    nationality: current_student?.personal_details?.nationality || "N/A",
    standard_last_studied:current_student?.joining_details?.standard_last_studied || "N/A",
    father_name: current_student?.contact_details?.father_name || "N/A",
    father_qualification:current_student?.contact_details?.father_qualification || "N/A",
    father_occupation:current_student?.contact_details?.father_occupation || "N/A",
    mother_name: current_student?.contact_details?.mother_name || "N/A",
    mother_qualification:current_student?.contact_details?.mother_qualification || "N/A",
    mother_occupation:current_student?.contact_details?.mother_occupation || "N/A",
    father_no: current_student?.contact_details?.father_no || "N/A",
    mother_no: current_student?.contact_details?.mother_no || "N/A",
    permanent_address:current_student?.contact_details?.permanent_address || "N/A",
    current_address: current_student?.contact_details?.current_address || "N/A",
    adhaar_no: current_student?.documents?.adhaar_no || "N/A",
    caste_no: current_student?.documents?.caste_no || "N/A",
    doj: dayjs(current_student?.joining_details?.doj).format('DD/MM/YYYY') || "N/A",
    class: current_student?.joining_details?.class?.class_name,
    section: current_student?.joining_details?.section?.section_name,
    admission_number:current_student?.joining_details?.admission_number || "N/A",
    register_number: current_student?.joining_details?.register_number || "N/A",
    year: current_student?.joining_details?.year || "N/A",
    height: (current_student?.joining_details?.height)?.concat('cm') || "N/A", 
    weight: (current_student?.joining_details?.weight)?.concat('kg') || "N/A",
    tc_no: current_student?.joining_details?.tc_no || "N/A",
    sats_id: current_student?.joining_details?.sats_id || "N/A",
    BMI: current_student?.joining_details?.BMI || "N/A",
   
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">


      <div className="  w-full">

      <Typography gutterBottom variant="h5">Student Information</Typography>


        <Breadcrumbs  aria-label="breadcrumb" style={{marginBottom:'10px'}}>
        <Link underline="hover" color="inherit" to='/'>
        Home
        </Link>
        <Link underline="hover" color="inherit" to='/student'>
        Students
        </Link>
        <Link underline="hover" color="inherit" >
        {current_student?.personal_details?.full_name}
        </Link>
        </Breadcrumbs>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
            
        <h6 className=" text-gray-600 text-sm font-semibold mb-1">Student profile</h6>

        <img
        src={studentimage}
        alt="Student Image"
        className=" h-20 w-20 border-2 mr-4 mb-4"
        />
        </div>

        <div>
        <h6 className=" text-gray-600 text-sm font-semibold mb-1">Birth certificate</h6>
        <div className="flex items-center gap-1 ">
        {
        birth_details !== "N/A" ? (<p className="border px-5 py-1 rounded"><DownloadForOfflineOutlinedIcon onClick={handleDownloadClick1} className="cursor-pointer" />
        <span className="text-green-600 ml-6"><CheckCircleIcon/></span> </p>
        ) : (
        <p className="border px-5 py-1 rounded">Not Uploaded</p>
        )
         }
       </div>               
        </div>

        <div>
        <h6 className=" text-gray-600 text-sm font-semibold mb-1">Tc Details</h6>
        <div className="flex items-center gap-1 ">
        {
        tc_details !== "N/A" ? (<p className="border px-5 py-1 rounded"><DownloadForOfflineOutlinedIcon onClick={handleDownloadClick} className="cursor-pointer" />
        <span className="text-green-600 ml-6"><CheckCircleIcon/></span> </p>
        ) : (
        <p className="border px-5 py-1 rounded">Not Uploaded</p>
        )
         }
       </div>               
        </div>



        </div>

        {/* Display student details in three columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(student).map(([key, value]) => (
        <div key={key} className="mb-4">
        <label className="capitalize block text-gray-600 text-sm font-semibold mb-1">
        {key.replace(/_/g, " ")}
        </label>
        <p className="text-gray-800">{value || "N/A"}</p>
        </div>
        ))}
        </div>
        </div>
       </div>
  );
};

export default StudentDetailPage;