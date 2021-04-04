
// WARNING: If schema changes and names are changed this will have to be changed as well
export interface IdeaOrderByAggregate {
  id?: SortOrder
  authorId?: SortOrder
  categoryId?: SortOrder
  title?: SortOrder
  description?: SortOrder
  communityImpact?: SortOrder
  natureImpact?: SortOrder
  artsImpact?: SortOrder
  energyImpact?: SortOrder
  manufacturingImpact?: SortOrder
  state?: SortOrder
  active?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

type SortOrder = 'asc' | 'desc'

export const defaultOrderByAggregate: IdeaOrderByAggregate = {
  updatedAt: 'desc'
}


export interface GetAllIdeasWithAggregate {
  orderBy?: IdeaOrderByAggregate,
  take?: number,
}

export const getAllIdeasWithAggregateDefault: GetAllIdeasWithAggregate = {
  orderBy: {
    updatedAt: 'desc'
  }
}