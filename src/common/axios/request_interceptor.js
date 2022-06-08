import axios from "axios";
const _ = require("lodash");

const RequestInterceptor = props => {
  const {user} = props
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    config = {
      "headers":{
        'Content-Type': process.env.REACT_APP_CONTENTTYPE,
        "uid": _.get(user,"uid"),
        "client":_.get(user,"client"),
        "access-token": _.get(user,"access-token")
      }
    }
    return config;
  });
  return null;
}


export default RequestInterceptor;