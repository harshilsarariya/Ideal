import axios from "axios";

const client = axios.create({
  // baseURL: "https://quickfix-service-app-server.herokuapp.com/api",
  baseURL: "http://192.168.165.159:5000/api",
});

export default client;
