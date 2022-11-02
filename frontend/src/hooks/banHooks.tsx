import { useQuery } from "react-query";
import { IFetchError } from "../lib/types/types";

import { IBanUserInput } from "src/lib/types/input/banUser.input";
import { getBan, getBanWithToken} from "src/lib/api/banRoutes"

export const FindBanDetails = (userId: string) => {
    return useQuery<IBanUserInput, IFetchError>(
        ["banDetails", userId],
        () => getBan(userId)
    );
};

export const FindBanDetailsWithToken = (token: string | null ) => {
    return useQuery<IBanUserInput, IFetchError>(
        ["banDetails", token],
        () => getBanWithToken(token)
    );
}