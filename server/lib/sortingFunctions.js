
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