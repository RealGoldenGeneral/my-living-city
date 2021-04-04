import { useQuery } from "react-query"
import { Category } from "../lib/types/data/category.type"
import { FetchError } from "../lib/types/types"
import { getAllCategories, getSingleCategory } from "../lib/api/categoryRoutes"

export const useCategories = () => {
  return useQuery<Category[], FetchError>(
    'categories',
    getAllCategories
  )
}

export const useSingleCategory = (categoryId: string) => {
  return useQuery<Category, FetchError>(
    ['category', categoryId],
    () => getSingleCategory(categoryId),
  )
}