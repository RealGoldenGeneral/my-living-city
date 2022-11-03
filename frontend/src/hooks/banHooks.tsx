import { useQuery } from "react-query";
import { IFetchError } from "../lib/types/types";

import { IBanDetails } from "src/lib/types/input/banUser.input";
import { getBan, getBanWithToken, getAllBan } from "src/lib/api/banRoutes"

export const FindBanDetails = (userId: string) => {
    return useQuery<IBanDetails, IFetchError>(
        ["banDetails", userId],
        () => getBan(userId)
    );
};

export const FindBanDetailsWithToken = (token: string | null ) => {
    return useQuery<IBanDetails, IFetchError>(
        ["banDetails", token],
        () => getBanWithToken(token)
    );
}

export const useAllBanDetails = () => {
    return useQuery<IBanDetails[], IFetchError>(
        "bans",
        getAllBan
    )
}