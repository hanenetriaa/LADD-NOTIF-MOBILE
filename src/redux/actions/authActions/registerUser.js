import http from '../../../services/axios';
import {CREATE_USER_FAILURE, CREATE_USER_SUCCESS} from '../types/authTypes';

export const createUser = (firstName, lastName, email, password) => {
  return async dispatch => {
    try {
      const response = await http.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response);
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILURE,
        payload: error.message,
      });
    }
  };
};
