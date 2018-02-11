function Count (input) {
  let binaryString = binaryAndStringMe(input)
  let reverseBinary = getReverseIntoArray(binaryString)
  let count = 0
  let indexes = []
  let result = []

  reverseBinary.filter(function (value, index) {
    if (value === '1') {
      count++
      indexes.push(index)
    }
  })

  result = indexes
  result.unshift(count)

  return result
}

function binaryAndStringMe (input) {
  if (!Number.isInteger(input)) {
    throw new RangeError('Only numbers are permitted')
  }
  if (input < 0) {
    throw new RangeError('Negative numbers are not permitted')
  }

  const base = 2
  return input.toString(base)
}

function getReverseIntoArray (data) {
  return data.split('').reverse()
}

module.exports = { Count }
