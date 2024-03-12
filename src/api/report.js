import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from '../key'
import { toast } from 'react-toastify'
import {saveAs} from 'file-saver' 


const initialState = {
    
    report:null,
    loading:false,
    hasError:false,
    current_report:null,
 
}


export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {


    getreport: state => {
      state.loading = true;
    },

    get_report_success: (state, {payload})  =>{
      console.log(payload)
        state.loading = false
        state.report = payload.report
    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_report = payload
    
    },

    get_report_Failure: (state) => {
      state.loading = false
      state.hasError = true
    },

  },
})


export const { getreport ,get_report_success, getCurrentSuccess, get_report_Failure, } = reportSlice.actions;

export const reportSelector = state => state.report;


export const  createreportPdf = (values, id) => async (dispatch) => {
  dispatch(getreport());
  const key = 'create'; 
  try {
    const { data } = await axios.post(keyUri.BACKEND_URI + `/report`, values, config);
   
    console.log(data)
    toast.success (data.msg, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,      
  });
  dispatch(get_report_success(data));
 
  } catch ({ error }) {
    toast.error (error.response.data.message, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      
  })
  }
};





// export const createreportPdf = (pdfValues) => async (dispatch) => {
//   dispatch(getreport());

//   console.log(pdfValues);

//   // Show a loading message while generating the report
//   toast.info('Generating the report...', {
//     position: 'top-center',
//     autoClose: false, 
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });

//   axios
//     .post(keyUri.BACKEND_URI + `/read-html`, pdfValues, config)
//     .then(() => axios.get(keyUri.BACKEND_URI + '/fetch-templetpdf', { responseType: 'blob' }))
//     .then((res) => {
//     if (res.data) {
//     toast.dismiss(); 
//     toast.success(res.data.message, {
//           position: 'top-center',
//           autoClose: 2500,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });

//         const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
//         saveAs(pdfBlob, `report.pdf`);
//       } else {
//         toast.dismiss();
//         toast.error('No data in the response or an error occurred.');
//       }
//     })
//     .catch((error) => {
//     toast.dismiss();
//     toast.error(error.response.data.message, {
//         position: 'top-center',
//         autoClose: 2500,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       console.error('Error generating or downloading the report:', error);
//     });
// };



export default reportSlice.reducer;
