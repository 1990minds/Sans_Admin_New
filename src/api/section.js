import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from '../key'
import { toast } from 'react-toastify'


const initialState = {


    
    all_section:[],
    class_section:[],
    loading:false,
    hasError:false,
    current_section:null,
 
}


export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {


    getsection: state => {
      state.loading = true;
    },

    getAll_section_success: (state, {payload})  =>{
        state.loading = false
        state.all_section = payload.section

    },

    getClass_section_success: (state, {payload})  =>{
      state.loading = false
      state.class_section = payload.section

  },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_section = payload
    
    },

    get_section_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getsection ,getAll_section_success, getCurrentSuccess, get_section_Failure, getClass_section_success  } = sectionSlice.actions;



export const sectionSelector = state => state.section;


  export const fetchAllSection = () => async (dispatch) => {
    dispatch(getsection());
    const key = 'fetchAllSection';
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/section`,config); 
      dispatch(getAll_section_success(data));
    } catch (error) {
      dispatch(get_section_Failure());
    }
  };

  export const fetchClassSection = (id) => async dispatch => {

    console.log(id)
    dispatch(getsection())
    try {
  
      const { data } = await axios.get(keyUri.BACKEND_URI + `/classsection/${id}`, config)
  
      dispatch(getClass_section_success(data));
    } catch (error) {
  
      dispatch(get_section_Failure())
    }
  };


  export const  createsection = (values, id) => async (dispatch) => {
    dispatch(getsection());
    const key = 'create'; 
    try {
      const { data } = await axios.post(keyUri.BACKEND_URI + `/section`,values,config);
      toast.success (data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(fetchClassSection(id));
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
      dispatch(get_section_Failure());
    }
  };



  export const fetchOneSection = (id) => async (dispatch) => {
    dispatch(getsection());
    const key = 'fetchOneSection';
  
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/section/${id}`,config);
      dispatch(getCurrentSuccess(data));
    } catch (error) {
      dispatch(get_section_Failure());
    }
  };


  export const updateSection = (values, id) => async (dispatch) => {
    console.log(id);
    const key = 'section';
  
    dispatch(getsection());
  
    try {
      const { data } = await axios.put(keyUri.BACKEND_URI + `/section/${id}`, values, config);
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
      // Show error message using Typography
      toast.error (response.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(get_section_Failure());
    }
  };


  export const deleteSection = (id, classid) => async (dispatch) => {
    console.log(classid)
    dispatch(getsection());
    const key = 'create';
    try {
      const { data } = await axios.delete(keyUri.BACKEND_URI + `/section/${id} `, config);
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
        dispatch(fetchClassSection(classid));
      } else {
        console.error("Unexpected response format:", data);
        dispatch(get_section_Failure());
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
      dispatch(get_section_Failure());
    }
  };



export default sectionSlice.reducer;
