import axios from "../axios";


export const useAuth = (user) => axios.post("/staff/auth/signin", user);