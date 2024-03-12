import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from '../key'
import { toast } from 'react-toastify'


const initialState = {


    
    all_exams:[],
    class_exams:[],
    loading:false,
    hasError:false,
    current_exams:null,
 
}


export const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {


    getexams: state => {
      state.loading = true;
    },

    getAll_exams_success: (state, {payload})  =>{
        state.loading = false
        state.all_exams = payload.exams

    },

    getClass_exams_success: (state, {payload})  =>{
      state.loading = false
      state.class_exams = payload.exams

  },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_exams = payload
    
    },

    get_exams_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getexams ,getAll_exams_success, getCurrentSuccess, get_exams_Failure, getClass_exams_success  } = examsSlice.actions;



export const examsSelector = state => state.exams;


  export const fetchAllExams = () => async (dispatch) => {
    dispatch(getexams());
    const key = 'fetchAllExams';
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/exams`,config); 
      dispatch(getAll_exams_success(data));
    } catch (error) {
      dispatch(get_exams_Failure());
    }
  };

  export const fetchClassExams = (id) => async dispatch => {

    dispatch(getexams())
    try {
  
      const { data } = await axios.get(keyUri.BACKEND_URI + `/classexams/${id}`, config)
  
      dispatch(getClass_exams_success(data));
    } catch (error) {
  
      dispatch(get_exams_Failure())
    }
  };


  export const  createexams = (values, id) => async (dispatch) => {
    dispatch(getexams());
    const key = 'create'; 
    try {
      const { data } = await axios.post(keyUri.BACKEND_URI + `/exams`,values,config);
      toast.success (data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(fetchAllExams());
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
      dispatch(get_exams_Failure());
    }
  };



  export const fetchOneExams = (id) => async (dispatch) => {
    dispatch(getexams());
    const key = 'fetchOneExams';
  
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/exams/${id}`,config);
      dispatch(getCurrentSuccess(data));
    } catch (error) {
      dispatch(get_exams_Failure());
    }
  };


  export const updateExams = (values, id) => async (dispatch) => {
    console.log(id);
    const key = 'exams';
  
    dispatch(getexams());
  
    try {
      const { data } = await axios.put(keyUri.BACKEND_URI + `/exams/${id}`, values, config);
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
      dispatch(get_exams_Failure());
    }
  };


  export const deleteExams = (id,) => async (dispatch) => {
 
    dispatch(getexams());
    const key = 'create';
    try {
      const { data } = await axios.delete(keyUri.BACKEND_URI + `/exams/${id} `, config);
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
        dispatch(fetchAllExams());
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", data);
        dispatch(get_exams_Failure());
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
      dispatch(get_exams_Failure());
    }
  };



export default examsSlice.reducer;
