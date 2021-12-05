import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOThkZDVhZTAxMzZhZTg5ZmRhZWIwZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODYwMzg1NiwiZXhwIjoxNjM4ODYzMDU2fQ.WqH-xNnkdp2wGYUNoB3VVUSG-QAeT8gDM01owhIHTNc";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token:`Bearer ${TOKEN}`}
});