import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from '../key'
import { toast } from 'react-toastify'


const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const teacher = localStorage.getItem("teacherinfo")
  ? localStorage.getItem("teacherinfo")
  : null;


const initialState = {
   
    all_teacher:[],
    loading:false,
    hasError:false,
    current_teacher:null,
    teacherAuthenticate: token ? true : false,
    teacher: teacher,
    token: token,
 
}


export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {

    getteacher: state => {
      state.loading = true;
    },

    getAll_teacher_success: (state, {payload})  =>{
      console.log(payload)
        state.loading = false
        state.all_teacher = payload

    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_teacher = payload
    
    },

    get_teacher_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },



    getAuthenticate: (state, { payload }) => {
      state.loading = false;
      state.teacherAuthenticate = true;
      state.teacher = payload.teacher;
      state.token = payload.accessToken;
    },

    isAuthenticateError: (state) => {
      state.hasError = true;
      state.loading = false;
      state.teacherAuthenticate = false;
    },
    
    getTeacherProfile: (state, { payload }) => {
      state.loading = false;
      state.teacher = payload;
      state.teacherAuthenticate = true;
    },

  },
})


export const { getteacher ,getAll_teacher_success, getCurrentSuccess, get_teacher_Failure, getTeacherProfile, getAuthenticate, isAuthenticateError, } = teacherSlice.actions;



export const teacherSelector = state => state.teacher;



  export const fetchAllTeacher = () => async (dispatch) => {
    dispatch(getteacher());
    const key = 'fetchAllTeacher';
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/teacher`,config); 
      dispatch(getAll_teacher_success(data));
    } catch (error) {
      dispatch(get_teacher_Failure());
    }
  };


  export const createteacher = (values) => async (dispatch) => {
  dispatch(getteacher());
  const key = 'create'; 
  try {
  const { data } = await axios.post(keyUri.BACKEND_URI + `/teacher`,values,config);
  toast.success (data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(fetchAllTeacher());
    } catch ({ response }) {
      toast.error (response.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(get_teacher_Failure());
    }
  };



  export const fetchOneTeacher = (id) => async (dispatch) => {
    dispatch(getteacher());
    const key = 'fetchOneTeacher';
  
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/teacher/${id}`,config);
      dispatch(getCurrentSuccess(data));
    } catch (error) {
      dispatch(get_teacher_Failure());
    }
  };


  export const updateTeacher = (values, id) => async (dispatch) => {
    console.log(id);
    const key = 'teacher';
    dispatch(getteacher());
  
    try {
      const { data } = await axios.put(keyUri.BACKEND_URI + `/teacher/${id}`, values, config);
      console.log(data);
      toast.success (data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
    dispatch(fetchAllTeacher());
    } catch ({ response }) {
      // Show error message using Typography
      toast.success (response.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(get_teacher_Failure());
    }
  };


  export const deleteTeacher = (id) => async (dispatch) => {
    console.log(id)
    dispatch(getteacher());
    const key = 'create';
    try {
      const { data } = await axios.delete(keyUri.BACKEND_URI + `/teacher/${id} `, config);
      if (data && data.msg) {
        // Show success toast if 'msg' exists in the response
        toast.success(data.msg, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(fetchAllTeacher());
      } else {
        console.error("Unexpected response format:", data);
        dispatch(get_teacher_Failure());
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(get_teacher_Failure());
    }
  };


  export const logOut = () => async (dispatch) => {
    console.log("logout");
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
      console.log("inn");
    } catch (error) {
      dispatch(isAuthenticateError());
    }
  };
  
  export const fetchTeacherlogin = (logindata) => async (dispatch) => {
    dispatch(getteacher());
    try {
      const { data } = await axios.post(keyUri.BACKEND_URI + "/teacherAuth", logindata, config);
      console.log(data);
      dispatch(getAuthenticate(data));
      localStorage.setItem("token", JSON.stringify(data.accessToken));
    } catch (error) {
      dispatch(isAuthenticateError());
    }
  };
  
  export const fetchTeacherProfile = (token) => async (dispatch) => {
    console.log(token);
    const loginConfig = {
      headers: {
      Authorization: `Bearer ${token}`,
      },
    };
    dispatch(getteacher());
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + "/teacherProfile", loginConfig);
      dispatch(getTeacherProfile(data));
    } catch (error) {
      console.log(error);
      dispatch(logOut());
    }
  };



export default teacherSlice.reducer;
