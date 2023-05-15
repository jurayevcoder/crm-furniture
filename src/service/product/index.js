import axios from "../axios";

export const useProduct = {

    typeCreate: (state) => axios.post("/products/create", state, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    }),

    typeList: () => axios.get(`/products/find-all`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    })
}
