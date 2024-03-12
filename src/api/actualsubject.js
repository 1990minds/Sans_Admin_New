import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from '../key'
import { toast } from 'react-toastify'


const initialState = {


    
    all_actualsubject:[],
    loading:false,
    hasError:false,
    current_actualsubject:null,
    class_actualsubject:[]
 
}


export const actualsubjectSlice = createSlice({
  name: 'actualsubject',
  initialState,
  reducers: {


    getactualsubject: state => {
      state.loading = true;
    },

    getAll_actualsubject_success: (state, {payload})  =>{
        state.loading = false
        state.all_actualsubject = payload?.actualsubject


    },

    getClass_actualsubject_success: (state, {payload})  =>{
      state.loading = false
      state.class_actualsubject = payload.actualsubject

  },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_actualsubject = payload.actualsubject
    
    },

    get_actualsubject_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getactualsubject ,getAll_actualsubject_success, getCurrentSuccess, get_actualsubject_Failure,  } = actualsubjectSlice.actions;



export const actualsubjectSelector = state => state.actualsubject;






  export const fetchAllActualSubject = () => async (dispatch) => {
    dispatch(getactualsubject());
    const key = 'fetchAllActualSubject';
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/actualsubject`,config); 
      dispatch(getAll_actualsubject_success(data));
    } catch (error) {
      dispatch(get_actualsubject_Failure());
    }
  };

  export const fetchClassActualSubject = (id) => async dispatch => {
    console.log(id)

    dispatch(getactualsubject())
    try {
  
      const { data } = await axios.get(keyUri.BACKEND_URI + `/classactualsubject/${id}`, config)
      console.log(data)
  
      dispatch(getAll_actualsubject_success(data));
    } catch (error) {
  
      dispatch(get_actualsubject_Failure())
    }
  };


  export const  createactualsubject = (values, id) => async (dispatch) => {
    dispatch(getactualsubject());
    const key = 'create'; 
    try {
      const { data } = await axios.post(keyUri.BACKEND_URI + `/actualsubject`,values,config);
      toast.success (data.msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(fetchClassActualSubject(id));
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
      dispatch(get_actualsubject_Failure());
    }
  };



  export const fetchOneActualSubject = (id) => async (dispatch) => {
    dispatch(getactualsubject());
    const key = 'fetchOneActualSubject';
  
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/actualsubject/${id}`,config);
      dispatch(getCurrentSuccess(data));
    } catch (error) {
      dispatch(get_actualsubject_Failure());
    }
  };


  export const updateActualSubject = (values, id) => async (dispatch) => {
    console.log(id);
    const key = 'actualsubject';
  
    dispatch(getactualsubject());
  
    try {
      const { data } = await axios.put(keyUri.BACKEND_URI + `/actualsubject/${id}`, values, config);
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
      dispatch(get_actualsubject_Failure());
    }
  };


  export const deleteActualSubject = (id, classid) => async (dispatch) => {
    console.log(classid)
    dispatch(getactualsubject());
    const key = 'create';
    try {
      const { data } = await axios.delete(keyUri.BACKEND_URI + `/actualsubject/${id} `, config);
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
        dispatch(fetchClassActualSubject(classid));
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", data);
        dispatch(get_actualsubject_Failure());
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
      dispatch(get_actualsubject_Failure());
    }
  };



export default actualsubjectSlice.reducer;
