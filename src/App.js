
import "./index.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./Signin";
import Layout from "./Sidebar/index";

import { useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import PrivateComp from './Components/privatecomp';

import Teachers from './Components/Teachers'
import CreateTeachers from './Components/Teachers/createteacher';
import EditTeacher from './Components/Teachers/editteacher';
import Assaign from './Components/Teachers/assaign';

import Subject from './Components/subjects/showsubjects'
import CreateSection from './Components/Class/section/index'
import EditSection from './Components/Class/section/editsection';
import AssignSection from './Components/Class/section/assignsection';
import Class from './Components/Class'


import Students from './Components/Students/datatable'
import CreateStudent from './Components/Students/createstudent';
import EditStudent from './Components/Students/editstudent';
import Studentdetails from './Components/Students/studentdetails';

import Exams from './Components/Exams/datatable'
import CreateExams from './Components/Exams/createexams';
import EditExams from './Components/Exams/editexams';


function App() {
  
  return (
    <div >
      <Routes>
      <Route element={<PrivateComp/>}>
        
      <Route path='/dashboard' element={<Layout Compenets={Dashboard}/>} />
      <Route path = '/teachers' element={<Layout Compenets={Teachers}/>} />
      <Route path = '/create-teachers' element={<Layout Compenets={CreateTeachers} />}/>
      <Route path={`/edit-teachers/:id`} element={<Layout Compenets={EditTeacher} />}/>
      <Route path={`/teacherassaign/:id`} element={<Layout Compenets={Assaign} />}/>
      <Route path = '/subject' element={<Layout Compenets={Subject}/>} />
      <Route path={`/section/:id`} element={<Layout Compenets={CreateSection} />}/>
      <Route path={`/edit-sections/:id`} element={<Layout Compenets={EditSection} />}/>
      <Route path={`/assign-section/:id`} element={<Layout Compenets={AssignSection} />}/>
      <Route path = '/class' element={<Layout Compenets={Class}/>} />
      <Route path = '/student' element={<Layout Compenets={Students}/>} />
      <Route path = '/create-student' element={<Layout Compenets={CreateStudent} />}/>
      <Route path = '/edit-student/:id' element={<Layout Compenets={EditStudent} />}/>
      <Route path = '/student/:id' element={<Layout Compenets={Studentdetails} />}/>
      <Route path = '/exams' element={<Layout Compenets={Exams}/>} />
      <Route path = '/create-exams' element={<Layout Compenets={CreateExams} />}/>
      <Route path = '/edit-exams/:id' element={<Layout Compenets={EditExams} />}/>
      </Route>

      <Route index Component={SignIn} /> 
      </Routes>
    </div>
  );
}

export default App;