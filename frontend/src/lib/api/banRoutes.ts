import axios from "axios";
import { API_BASE_URL } from "../constants";
import { IBanUserInput } from "../types/input/banUser.input";

export const postCreateBan = async (
    banData: IBanUserInput,
    token: string | null
) => {
    const jsonBody = JSON.stringify(banData);
    const res = await axios({
        method: "post",
        url: `${API_BASE_URL}/ban/create`,
        data: jsonBody,
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
            "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true
    });
    //if not success, throw error which will stop form reset
    if (!(res.status == 201 || res.status == 200)) {
        throw new Error(res.data);
    }
    //return response data
    return res.data;
};
