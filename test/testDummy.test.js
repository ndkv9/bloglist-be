const listHelper = require('../utils/helper.js')

test('dummy returns one', () => {
  const blogs = []
  expect(listHelper.dummy(blogs)).toBe(1)
})
