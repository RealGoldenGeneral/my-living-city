import { useQuery } from "react-query";
import { IFetchError } from "../lib/types/types";

import { getMostRecentUserBan, getUserBanWithToken, getAllBan, unbanUsersWithExpiredBans, getUndismissedPostBans, getUndismissedCommentBans } from "src/lib/api/banRoutes"
import { IBanUser } from "src/lib/types/data/banUser.type";
import { IBanPost } from "src/lib/types/data/banPost.type";
import { IBanComment } from "src/lib/types/data/banComment.type";

export const FindBanDetails = (userId: string) => {
    return useQuery<IBanUser, IFetchError>(
        ["ban", userId], () => getMostRecentUserBan(userId));
};

export const FindBanDetailsWithStaleTime = (userId: string) => {
    return useQuery<IBanUser, IFetchError>(
        ["ban", userId], () => getMostRecentUserBan(userId), { staleTime: 5000 });
};

export const FindUndismissedPostBans = (userId: string) => {
    return useQuery<IBanPost[], IFetchError>(["postBan", userId], () => getUndismissedPostBans(userId));
}

export const FindUndismissedCommentBans = (userId: string) => {
    return useQuery<IBanComment[], IFetchError>(["commentBan", userId], () => getUndismissedCommentBans(userId));
}

export const FindBanDetailsWithToken = (token: string | null) => {
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
