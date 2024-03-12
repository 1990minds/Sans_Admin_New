import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from '../key'
import { toast } from 'react-toastify'


const initialState = {


    
    all_classes:[],
    loading:false,
    hasError:false,
    current_classes:null,
 
}


export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {


    getclasses: state => {
      state.loading = true;
    },

    getAll_classes_success: (state, {payload})  =>{
        state.loading = false
        state.all_classes = payload.clases

    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_classes = payload
    
    },

    get_classes_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getclasses ,getAll_classes_success, getCurrentSuccess, get_classes_Failure,  } = classesSlice.actions;



export const classesSelector = state => state.class;


export const setSnackbarMessage = (message) => (dispatch) => {

  console.log(message)

    dispatch({
      type: 'SET_SNACKBAR_MESSAGE',
      payload: message,
    });
  }



  export const fetchAllClasses = () => async (dispatch) => {
    dispatch(getclasses());
    const key = 'fetchAllClasses';
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/clases`,config); 
      dispatch(getAll_classes_success(data));
    } catch (error) {
      dispatch(get_classes_Failure());
    }
  };


  export const createclasses = (values) => async (dispatch) => {
    console.log(values)
    dispatch(getclasses());
    const key = 'create'; 
    try {
      const { data } = await axios.post(keyUri.BACKEND_URI + `/clases`, values, config);
console.log(data)

      toast.success (data.msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(fetchAllClasses());
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
      dispatch(get_classes_Failure());
    }
  };



  export const fetchOneClasses = (id) => async (dispatch) => {
    dispatch(getclasses());
    const key = 'fetchOneClasses';
  
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/clases/${id}`,config);
      dispatch(getCurrentSuccess(data));
    } catch (error) {
      dispatch(get_classes_Failure());
    }
  };


  export const updateClasses = (values, id) => async (dispatch) => {
    console.log(id);
    const key = 'classes';
  
    dispatch(getclasses());
  
    try {
      const { data } = await axios.put(keyUri.BACKEND_URI + `/clases/${id}`, values, config);
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
      dispatch(get_classes_Failure());
    }
  };


  export const deleteClasses = (id) => async (dispatch) => {
    console.log(id)
    dispatch(getclasses());
    const key = 'create';
    try {
      const { data } = await axios.delete(keyUri.BACKEND_URI + `/clases/${id} `, config);
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
        dispatch(fetchAllClasses());
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", data);
        dispatch(get_classes_Failure());
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
      dispatch(get_classes_Failure());
    }
  };



export default classesSlice.reducer;
