const dummy = arr => {
  console.log(arr)
  return 1
}

const totalLikes = arr => {
  if (arr.length === 0) return 0
  if (arr.length === 1) return arr[0].likes

  return arr.map(blog => blog.likes).reduce((a, i) => a + i, 0)
}

const favoriteBlog = arr => {
  if (arr.length === 0) return undefined
  if (arr.length === 1) return arr[0]

  return arr.find(
    result => result.likes === Math.max(...arr.map(blog => blog.likes)),
  )
}

module.exports = { dummy, totalLikes, favoriteBlog }
