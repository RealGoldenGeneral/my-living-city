import { useQuery } from "react-query"
import { IAdvertisement } from "../lib/types/data/advertisement.type"
import { IFetchError } from "../lib/types/types"
import { getAllAdvertisement } from "../lib/api/advertisementRoutes"

export const useAdvertisements = (token: string) => {
  return useQuery<IAdvertisement[], IFetchError>(
    ['AllAdvertisement', token], () =>
    getAllAdvertisement(token!),
  )
}