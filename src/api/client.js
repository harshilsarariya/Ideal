import axios from "axios";

const client = axios.create({
  baseURL: "https://ideal-server.onrender.com/api",
  // baseURL: "http://192.168.2.102:5000/api",
});

export default client;
