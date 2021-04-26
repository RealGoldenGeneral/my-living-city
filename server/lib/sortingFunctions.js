
/**
 * Array.prototype.sort predicate that will only sort commentObjects from prisma 
 * 
 * REMEMBER: If prisma comment structure does not contain _count value in object this
 * function will not work and will most likely cause route to crash and throw error. 
 * Change the sort predicate if schema is changed.
 * 
 * @param { commentObject } a A comment object from prisma to compare
 * @param { commentObject } b A comment object from prisma to compare
 * @returns A -1, 0, or 1 value that determines sort order
 */
const compareCommentsBasedOnLikesAndDislikes = (a, b) => {
  // TODO: Will have to change if naming convention changes as well
  const { _count: aCount } = a;
  const { _count: bCount} = b;
  const aTotal = aCount.likes + aCount.dislikes;
  const bTotal = bCount.likes + bCount.dislikes;
  if (aTotal < bTotal) {
    return 1;
  }
  if (aTotal > bTotal) {
    return -1;
  }

  return 0;
}

module.exports = {
  compareCommentsBasedOnLikesAndDislikes
}