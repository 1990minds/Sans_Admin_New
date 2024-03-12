import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from '../key'
import { toast } from 'react-toastify'


const initialState = {


    
    all_assignteacherdata:[],
    loading:false,
    hasError:false,
    current_assignteacherdata:null,
 
}


export const assignteacherdataSlice = createSlice({
  name: 'assignteacherdata',
  initialState,
  reducers: {


    getassignteacherdata: state => {
      state.loading = true;
    },

    getAll_assignteacherdata_success: (state, {payload})  =>{
      console.log(payload)
        state.loading = false
        state.all_assignteacherdata = payload?.teacherassigndata


    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_assignteacherdata = payload
    
    },

    get_assignteacherdata_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getassignteacherdata ,getAll_assignteacherdata_success, getCurrentSuccess, get_assignteacherdata_Failure,  } = assignteacherdataSlice.actions;



export const assignteacherdataSelector = state => state.assignteacherdata;



  export const fetchAllassignTeacherdata = () => async (dispatch) => {
    dispatch(getassignteacherdata());
    const key = 'fetchAllassignTeacherdata';
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/teacherassigndata`,config); 
      dispatch(getAll_assignteacherdata_success(data));
    } catch (error) {
      dispatch(get_assignteacherdata_Failure());
    }
  };


  export const fetchIndividualTeacherData = (id) => async dispatch => {

    dispatch(getassignteacherdata())
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/teacherdata/${id}`, config)
      dispatch(getAll_assignteacherdata_success(data));
    } catch (error) {
  
      dispatch(get_assignteacherdata_Failure())
    }
  };



  export const createassignteacherdata = (values, id) => async (dispatch) => {
console.log(id)

  dispatch(getassignteacherdata());
  const key = 'create'; 
  try {
  const { data } = await axios.post(keyUri.BACKEND_URI + `/teacherassigndata`,values,config);
  toast.success (data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(fetchIndividualTeacherData(id));
    } catch ({ response }) {
      // Show error message using Snackbar
      toast.error (response.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(get_assignteacherdata_Failure());
    }
  };



  export const fetchOneassignTeacherdata = (id) => async (dispatch) => {
    dispatch(getassignteacherdata());
    const key = 'fetchOneassignTeacherdata';
  
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/teacherassigndata/${id}`,config);
      dispatch(getCurrentSuccess(data));
    } catch (error) {
      dispatch(get_assignteacherdata_Failure());
    }
  };


  export const updateassignTeacherdata = (values, id, teacherId) => async (dispatch) => {
    console.log(id);
    const key = 'assignteacherdata';
  
    dispatch(getassignteacherdata());
  
    try {
      const { data } = await axios.put(keyUri.BACKEND_URI + `/teacherassigndata/${id}`, values, config);
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
    dispatch(fetchIndividualTeacherData(teacherId));
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
      dispatch(get_assignteacherdata_Failure());
    }
  };


  export const deleteassignTeacherdata = (id, teacherid) => async (dispatch) => {
    console.log(id)
    dispatch(getassignteacherdata());
    const key = 'create';
    try {
      const { data } = await axios.delete(keyUri.BACKEND_URI + `/teacherassigndata/${id} `, config);
      if (data && data.msg) {
        toast.success(data.msg, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(fetchIndividualTeacherData(teacherid));
      } else {
        console.error("Unexpected response format:", data);
        dispatch(get_assignteacherdata_Failure());
      }
    } catch (error) {
      // Show error toast and handle any errors
      console.log("An error occurred:", error);
      toast.error("An error occurred", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(get_assignteacherdata_Failure());
    }
  };



export default assignteacherdataSlice.reducer;
