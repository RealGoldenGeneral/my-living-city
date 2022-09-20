-- RenameIndex
ALTER INDEX "UserSegments_user_id_key" RENAME TO "UserSegments.user_id_unique";

-- RenameIndex
ALTER INDEX "category_title_key" RENAME TO "category.title_unique";

-- RenameIndex
ALTER INDEX "collaborator_proposal_id_author_id_key" RENAME TO "collaborator_unique";

-- RenameIndex
ALTER INDEX "donors_proposal_id_author_id_key" RENAME TO "donor_unique";

-- RenameIndex
ALTER INDEX "idea_address_idea_id_key" RENAME TO "idea_address.idea_id_unique";

-- RenameIndex
ALTER INDEX "idea_geo_idea_id_key" RENAME TO "idea_geo.idea_id_unique";

-- RenameIndex
ALTER INDEX "project_idea_id_key" RENAME TO "project.idea_id_unique";

-- RenameIndex
ALTER INDEX "proposal_idea_id_key" RENAME TO "proposal.idea_id_unique";

-- RenameIndex
ALTER INDEX "user_email_key" RENAME TO "user.email_unique";

-- RenameIndex
ALTER INDEX "user_address_user_id_key" RENAME TO "user_address.user_id_unique";

-- RenameIndex
ALTER INDEX "user_geo_user_id_key" RENAME TO "user_geo.user_id_unique";

-- RenameIndex
ALTER INDEX "user_idea_follow_user_id_idea_id_key" RENAME TO "user_idea_follow_unique";

-- RenameIndex
ALTER INDEX "user_reach_user_id_segId_key" RENAME TO "user_reach_unique";

-- RenameIndex
ALTER INDEX "user_stripe_userId_key" RENAME TO "user_stripe.userId_unique";

-- RenameIndex
ALTER INDEX "volunteer_proposal_id_author_id_key" RENAME TO "volunteer_unique";
