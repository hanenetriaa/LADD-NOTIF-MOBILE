import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import accountsReducer from './reducers/accountReducer/accountsReducer';
import authReducer from './reducers/authReducer/auth';
import messageReducer from './reducers/messageReducer/messageReducer';
import passwordReducer from './reducers/authReducer/passwordReducer';
import registerUserReducer from './reducers/authReducer/registerUserReducer';
import userReducer from './reducers/userReducer/userReducer';
import detailsAccountReducer from './reducers/accountReducer/detailsAccountReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerUserReducer,
  password: passwordReducer,
  users: userReducer,
  messages: messageReducer,
  accounts: accountsReducer,
  detailsAccount: detailsAccountReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
