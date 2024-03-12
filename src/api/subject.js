import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from '../key'
import { toast } from 'react-toastify'


const initialState = {


    
    all_subject:[],
    loading:false,
    hasError:false,
    current_subject:null,
 
}


export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {


    getsubject: state => {
      state.loading = true;
    },

    getAll_subject_success: (state, {payload})  =>{
        state.loading = false
        state.all_subject = payload

    },

    getClass_subject_success: (state, {payload})  =>{
      state.loading = false
      state.class_subject = payload.subject

  },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_subject = payload.subject
    
    },

    get_subject_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getsubject ,getAll_subject_success, getCurrentSuccess, get_subject_Failure,  } = subjectSlice.actions;



export const subjectSelector = state => state.subject;






  export const fetchAllSubject = () => async (dispatch) => {
    dispatch(getsubject());
    const key = 'fetchAllSubject';
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/subject`,config); 
      dispatch(getAll_subject_success(data));
    } catch (error) {
      dispatch(get_subject_Failure());
    }
  };

  export const fetchClassSubject = (id) => async dispatch => {
    console.log(id)

    dispatch(getsubject())
    try {
  
      const { data } = await axios.get(keyUri.BACKEND_URI + `/classsubject/${id}`, config)
      console.log(data)
  
      dispatch(getAll_subject_success(data));
    } catch (error) {
  
      dispatch(get_subject_Failure())
    }
  };


  export const  createsubject = (values, id) => async (dispatch) => {
    dispatch(getsubject());
    const key = 'create'; 
    try {
      const { data } = await axios.post(keyUri.BACKEND_URI + `/subject`,values,config);
      toast.success (data.msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(fetchClassSubject(id));
    } catch ({ response }) {
      // Show error message using Snackbar
      toast.success (response.data.msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(get_subject_Failure());
    }
  };



  export const fetchOneSubject = (id) => async (dispatch) => {
    dispatch(getsubject());
    const key = 'fetchOneSubject';
  
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/subject/${id}`,config);
      dispatch(getCurrentSuccess(data));
    } catch (error) {
      dispatch(get_subject_Failure());
    }
  };


  export const updateSubject = (values, id) => async (dispatch) => {
    console.log(id);
    const key = 'subject';
  
    dispatch(getsubject());
  
    try {
      const { data } = await axios.put(keyUri.BACKEND_URI + `/subject/${id}`, values, config);
      console.log(data);
      toast.success (data.msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
    } catch ({ response }) {
      // Show error message using Typography
      toast.success (response.data.msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(get_subject_Failure());
    }
  };


  export const deleteSubject = (id, classid) => async (dispatch) => {
    console.log(classid)
    dispatch(getsubject());
    const key = 'create';
    try {
      const { data } = await axios.delete(keyUri.BACKEND_URI + `/subject/${id} `, config);
      if (data && data.msg) {
        // Show success toast if 'msg' exists in the response
        toast.success(data.msg, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(fetchClassSubject(classid));
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", data);
        dispatch(get_subject_Failure());
      }
    } catch (error) {
      // Show error toast and handle any errors
      console.error("An error occurred:", error);
      toast.error("An error occurred", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(get_subject_Failure());
    }
  };



export default subjectSlice.reducer;
