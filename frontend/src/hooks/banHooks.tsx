import { useQuery } from "react-query";
import { IFetchError } from "../lib/types/types";

import { IBanDetails } from "src/lib/types/input/banUser.input";
import {getBan, getBanWithToken, getAllBan, unbanUsersWithExpiredBans} from "src/lib/api/banRoutes"
import {RouteComponentProps} from "react-router-dom";
import {IUser} from "../lib/types/data/user.type";
import {ICommentFlag, IFlag} from "../lib/types/data/flag.type";

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

export const RemoveAllExpiredBans = () => {
    return useQuery(
        "expiredBanRemoval",
        unbanUsersWithExpiredBans
    );
}
