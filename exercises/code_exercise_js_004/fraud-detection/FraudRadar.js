const fs = require('fs')
const path = require('path')

function Check (fileName) {
  let lines = readFile(fileName)
  let orders = getOrders(lines)

  return getFraudResults(orders)
}

function readFile (fileName) {
  let filePath = path.join(__dirname, 'Files', fileName)
  let fileContent = fs.readFileSync(filePath, 'utf8')

  return fileContent.split('\n')
}

function getOrders (lines) {
  let orders = []

  for (let line of lines) {
    let items = line.split(',')
    let order = {
      orderId: Number(items[0]),
      dealId: Number(items[1]),
      email: items[2].toLowerCase(),
      street: items[3].toLowerCase(),
      city: items[4].toLowerCase(),
      state: items[5].toLowerCase(),
      zipCode: items[6],
      creditCard: items[7]
    }
    orders.push(order)
  }
  for (let order of orders) {
    order.email = normalizeEmail(order.email)
    order.street = normalizeStreet(order.street)
    order.state = normalizeState(order.state)
  }
  return orders
}

function normalizeEmail (email) {
  // HERE: I assume the email has been checked by a validation function or form validations before saving data
  // In case it hasn't I'll create a function for checking it out
  let aux = email.split('@')
  let atIndex = aux[0].indexOf('+')
  aux[0] = atIndex < 0 ? aux[0].replace('.', '') : aux[0].replace('.', '').substring(0, atIndex - 1)
  return aux.join('@')
}

function normalizeStreet (street) {
  // HERE: We should create a RegExp for replacing according to a map (like states). Unfortunately I'm not good enough yet with RegExp
  // It could be something like Fahrenheit example in
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/replace
  return street.replace('st.', 'street').replace('rd.', 'road')
}

function normalizeState (state) {
  const states = {
    'ca': 'california',
    'ny': 'new york'
  }
  // HERE: we could add all the states
  return states[state] || state
}

function getFraudResults (orders) {
  let fraudResults = []
  for (let i = 0; i < orders.length; i++) {
    let current = orders[i]
    let isFraudulent = false

    for (let j = i + 1; j < orders.length; j++) {
      let isSameDealIdAndDifferentCCard = (current.dealId === orders[j].dealId) && (current.creditCard !== orders[j].creditCard)
      let isSameEmail = current.email === orders[j].email
      let isSameAddress = current.state === orders[j].state && current.zipCode === orders[j].zipCode && current.street === orders[j].street && current.city === orders[j].city

      isFraudulent = (isSameDealIdAndDifferentCCard && isSameEmail) || (isSameDealIdAndDifferentCCard && isSameAddress)

      if (isFraudulent) {
        fraudResults.push({
          isFraudulent: isFraudulent,
          orderId: orders[j].orderId
        })
      }
    }
  }
  return fraudResults
}

module.exports = { Check }
