
import axios from "axios";
const BASE_URL :string = "http://localhost:8080/";


export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials:true
    // withCredentials: true
});


export async function get<T>(
    path: string
): Promise<T> {
    const { data } = await api.get(path);
    return data;
}