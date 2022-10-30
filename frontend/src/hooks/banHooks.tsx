import { useQuery } from "react-query";
import { IFetchError } from "../lib/types/types";

import { postCreateBan } from "../lib/api/banRoutes";
import { IBanUserInput } from "src/lib/types/input/banUser.input";
import { getBan } from "src/lib/api/banRoutes"

export const FindBanDetails = (userId: string) => {
    return useQuery<IBanUserInput, IFetchError>(
        ["banDetails", userId],
        () => getBan(userId)
    );
};