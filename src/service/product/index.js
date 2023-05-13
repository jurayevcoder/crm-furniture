import axios from "../axios";

export const useProduct = {

    typeCreate: (state) => axios.post("/categories", state, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    }),

    typeList: () => axios.get(`/categories`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    })
}