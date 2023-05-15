import axios from "../axios";


export const useAuth = (user) => axios.post("/staff/signin", user);
