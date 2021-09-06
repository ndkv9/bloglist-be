const dummy = arr => {
  console.log(arr)
  return 1
}

const totalLikes = arr => {
  if (arr.length === 0) return 0
  if (arr.length === 1) return arr[0].likes

  return arr.map(blog => blog.likes).reduce((a, i) => a + i, 0)
}

module.exports = { dummy, totalLikes }
