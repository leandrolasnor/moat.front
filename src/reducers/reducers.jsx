import { combineReducers } from "redux";
import {reducer as toastr} from 'react-redux-toastr';
import auth from "../auth/reducer";
import home from "../home/reducer"
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  home,
  auth,
  form:formReducer,
  toastr
});

export default rootReducer;
