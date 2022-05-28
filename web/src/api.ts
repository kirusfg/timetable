import { create } from "apisauce";

const api = create({
    baseURL: 'https://localhost:8000/api/v1',
    timeout: 10000,
})

export default api
