import axios from "../axios";

export const useContacts = {
    create: (state) => axios.post("/contacts/create", state, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    list: (num = 1) => axios.get(`/contacts/find-all?page=${num}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),

    update: (id) => axios.put(`/contacts/update/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }),

    delete: (id) => axios.delete(`/contacts/delete/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    })
}
