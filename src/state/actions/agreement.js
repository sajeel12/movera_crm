import axios from 'axios';
import { AGREEMENT_DATA_FETCH } from './types';

export const fetchagreemetndata = (hashId) => async (dispatch) => {
  try {
    console.log(hashId);
    const response = await axios.get(`http://localhost:5000/api/agreement/fetchagreementleaddata?hash_id=${hashId}`);

    dispatch({ type: AGREEMENT_DATA_FETCH, payload: response.data.data });
  } catch (error) {
    console.error(error);
    // Dispatch the failure action
    dispatch({ type: AGREEMENT_DATA_FETCH, payload: error.response.status });
    throw error;
  }
};
export const addagreement = (data) => async (dispatch) => {
    try {
        console.log("Action")
      console.log(data);
      const response = await axios.post(`http://localhost:5000/api/agreement/saveagreement`, data);

    //   dispatch({ type: AGREEMENT_DATA_FETCH, payload: response.data.data });
    } catch (error) {
      console.error(error);
      // Dispatch the failure action
      // dispatch({ type: EMAIL_SEND_FAILURE, payload: error.message });
    }
  };
