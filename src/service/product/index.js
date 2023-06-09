import axios from "../axios";

export const useProduct = {

    create: (state) => axios.post("/products/create", state, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    }),

    list: (num = 1) => axios.get(`/products/find-all?page=${num}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    }),

    delete: (id) => axios.delete(`/products/delete/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    })
}
