import axios from "axios";
import { API_BASE_URL } from "../constants";
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";
import { IBanUserInput } from "../types/input/banUser.input";
import { IBanUser } from "../types/data/banUser.type";

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

export const getMostRecentBan = async (
    userId: string
) => {
    const res = await axios({
        method: "get",
        url: `${API_BASE_URL}/ban/getMostRecent/${userId}`
    })
    return res.data;
}

export const getBanWithToken = async (
    token: string | null
) => {
    const res = await axios.get(`${API_BASE_URL}/ban/getMostRecentWithToken`, getAxiosJwtRequestOption(token!))
    return res.data;
}

export const getAllBan = async (): Promise<IBanUser[]> => {
    const res = await axios.get<IBanUser[]>(`${API_BASE_URL}/ban/getAll`)
    return res.data;
}

export const updateBan = async (
    banData: IBanUser,
    token: string | null
) => {
    const res = await axios({
        method: "put",
        url: `${API_BASE_URL}/ban/update/${banData.userId}`,
        data: banData,
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
            "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true
    });
    return res.data;
}

// export const deleteBan = async (
//     userId: string,
//     token: string | null
// ) => {
//     const res = await axios({
//         method: "delete",
//         url: `${API_BASE_URL}/ban/delete/${userId}`,
//         headers: {
//             "x-auth-token": token,
//             "Access-Control-Allow-Origin": "*",
//         },
//         withCredentials: true
//     })
//     return res.data;
// }

export const deleteExpiredBans = async (
    token: string | null
) => {
    const res = await axios({
        method: "delete",
        url: `${API_BASE_URL}/ban/deletePassedBanDate`,
        headers: {
            "x-auth-token": token,
            "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true
    });
    return res.data;
}

export const getExpiredBans = async () => {
    const res = await axios({
        method: "get",
        url: `${API_BASE_URL}/ban/getAllPassedDate`
    });
    return res.data;
}

export const unbanUsersWithExpiredBans = async (token: string | null) => {
    //get all ids of users with expired bans
    const userIdsResponse = await axios({
        method: "get",
        url: `${API_BASE_URL}/ban/getAllPassedDate`
    });
    console.log("These are the user ids: ", userIdsResponse.data);
    //unban all users that have ids returned by expireBans
    await axios({
        method: "patch",
        url: `${API_BASE_URL}/user/unbanUsers`,
        data: {
            userIds: userIdsResponse.data
        },
        headers: {
            "x-auth-token": token,
            "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true
    });
    //delete all the expired bans
}


export const attemptUnbanUser = async (token: string | null) => {
    await axios({
        method: "patch",
        url: `${API_BASE_URL}/user/unbanMe`,
        headers: {
            "x-auth-token": token,
            "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true
    });
}
