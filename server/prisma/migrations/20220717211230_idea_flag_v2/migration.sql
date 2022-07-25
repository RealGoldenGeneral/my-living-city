-- AddForeignKey
ALTER TABLE "IdeaFlag" ADD CONSTRAINT "IdeaFlag_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "idea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
