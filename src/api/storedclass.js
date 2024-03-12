import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from '../key'
import { toast } from 'react-toastify'


const initialState = {


    
    all_storedclass:[],
    loading:false,
    hasError:false,
    current_storedclass:null,
 
}


export const storedclassSlice = createSlice({
  name: 'storedclass',
  initialState,
  reducers: {


    getstoredclass: state => {
      state.loading = true;
    },

    getAll_storedclass_success: (state, {payload})  =>{
        state.loading = false
        state.all_storedclass = payload.storedclass

    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_storedclass = payload
    
    },

    get_storedclass_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getstoredclass ,getAll_storedclass_success, getCurrentSuccess, get_storedclass_Failure,  } = storedclassSlice.actions;



export const storedclassSelector = state => state.storedclass;


export const setSnackbarMessage = (message) => (dispatch) => {

  console.log(message)

    dispatch({
      type: 'SET_SNACKBAR_MESSAGE',
      payload: message,
    });
  }



  export const fetchAllStoredclass = () => async (dispatch) => {
    dispatch(getstoredclass());
    const key = 'fetchAllStoredclass';
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/storedclass`,config); 
      dispatch(getAll_storedclass_success(data));
    } catch (error) {
      dispatch(get_storedclass_Failure());
    }
  };


  export const createstoredclass = (values) => async (dispatch) => {
    dispatch(getstoredclass());
    const key = 'create'; 
    try {
      const { data } = await axios.post(keyUri.BACKEND_URI + `/storedclass`,values,config);
      toast.success (data.msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    })
      dispatch(fetchAllStoredclass());
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
      dispatch(get_storedclass_Failure());
    }
  };



  export const fetchOneStoredclass = (id) => async (dispatch) => {
    dispatch(getstoredclass());
    const key = 'fetchOneStoredclass';
  
    try {
      const { data } = await axios.get(keyUri.BACKEND_URI + `/storedclass/${id}`,config);
      dispatch(getCurrentSuccess(data));
    } catch (error) {
      dispatch(get_storedclass_Failure());
    }
  };


  export const updateStoredclass = (values, id) => async (dispatch) => {
    console.log(id);
    const key = 'storedclass';
  
    dispatch(getstoredclass());
  
    try {
      const { data } = await axios.put(keyUri.BACKEND_URI + `/storedclass/${id}`, values, config);
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
      dispatch(get_storedclass_Failure());
    }
  };


  export const deleteStoredclass = (id) => async (dispatch) => {
    console.log(id)
    dispatch(getstoredclass());
    const key = 'create';
    try {
      const { data } = await axios.delete(keyUri.BACKEND_URI + `/storedclass/${id} `, config);
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
        dispatch(fetchAllStoredclass());
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", data);
        dispatch(get_storedclass_Failure());
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
      dispatch(get_storedclass_Failure());
    }
  };



export default storedclassSlice.reducer;
