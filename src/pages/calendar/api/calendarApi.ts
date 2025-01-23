import axios from "axios";
import { GetCompanyDTO } from "./calendarDTOList";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const client = axios.create({
    baseURL: `${SERVER_URL}/calendar`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    }}
);

export const updateCompany = async (interviewDetailId: string, data: GetCompanyDTO ) => {
    const response = await client.put(`/interview/${interviewDetailId}`, data);
    return response.data;
}

export const getInterview = async (interviewDetailId: string) => {
    const response = await client.get(`/interview/${interviewDetailId}`);
    return response.data;
}

export const createInterview = async ( ) => {
    
}