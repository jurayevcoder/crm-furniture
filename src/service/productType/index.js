import axios from "../axios";

export const useProductType = {

    typeCreate: (state) => axios.post("/categorys/create", state, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    }),

    typeList: (num = 1) => axios.get(`/categorys/find-all?page=${num}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    }),

    delete: (id) => axios.delete(`/categorys/delete/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')
                }`
        }
    })
}
