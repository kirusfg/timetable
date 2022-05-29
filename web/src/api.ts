import { ApiResponse, create } from "apisauce";
import User from "./models/User";

const api = create({
    baseURL: process.env.API_URI,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetcher = (uri: string) => api.get(uri)
    .then((res: ApiResponse<any>): User[] => {
        const { ok, data } = res;

        if (!ok) {
            console.error(ok);
        }

        return data.results;
    });

export default api;
