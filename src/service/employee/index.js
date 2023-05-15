import axios from "../axios";

export const useEmployee = {
    create: (state) => axios.post("/staff/create", state, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    list: (num = 1) => axios.get(`/staff/find-all?page=${num}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),

    isactive: (state) => axios.post(`/staff/activate`, state, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    }),

    delete: (id) => axios.delete(`/staff/delete/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    })
}
