import axios from "../axios";

export const useEmployee = {
    create: (state) => axios.post("/staff/auth/signup", state),
    list: (num = 1) => axios.get(`/staff?page=${num}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
}