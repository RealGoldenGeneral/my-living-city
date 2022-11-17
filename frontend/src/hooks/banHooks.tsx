import { useQuery } from "react-query";
import { IFetchError } from "../lib/types/types";

import {getMostRecentUserBan, getUserBanWithToken, getAllBan, unbanUsersWithExpiredBans} from "src/lib/api/banRoutes"
import {RouteComponentProps} from "react-router-dom";
import {IUser} from "../lib/types/data/user.type";
import {ICommentFlag, IFlag} from "../lib/types/data/flag.type";
import { IBanUser } from "src/lib/types/data/banUser.type";

export const FindBanDetails = (userId: string) => {
    return useQuery<IBanUser, IFetchError>(["ban", userId], () => getMostRecentUserBan(userId), {staleTime: 5000});
};

export const FindBanDetailsWithToken = (token: string | null ) => {
    return useQuery<IBanUser, IFetchError>(
        ["banDetails", token],
        () => getUserBanWithToken(token)
    );
}

export const useAllBanDetails = () => {
    return useQuery<IBanUser[], IFetchError>(
        "bans",
        getAllBan
    )
}

export const useRemoveAllExpiredBans = (token: string | null) => {
    return useQuery(
        "expiredBanRemoval",
        () => unbanUsersWithExpiredBans(token)
    );
}
