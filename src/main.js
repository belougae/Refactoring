$(document).ready(function () {
  var plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
  }

  var invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55
      },
      {
        playID: 'as-like',
        audience: 35
      },
      {
        playID: 'othello',
        audience: 40
      }
    ]
  }

  statement(invoice, plays)
})


function volumeCreditsFor(aPerformance, plays) {
  let result = 0
  // add volume credits
  result += Math.max(aPerformance.audience - 30, 0)

  // add extra credit for every ten comedy attendees
  if ('comedy' === playFor(aPerformance, plays).type) result += Math.floor(aPerformance.audience / 5)
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber);
}

function statement (invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}`

  for (let performance of invoice.performances) {
    volumeCredits += volumeCreditsFor(performance, plays);

    // print line for this order
    result += ` ${playFor(performance, plays).name}: ${usd(amountFor(performance, plays) / 100)}(${
        performance.audience
    } seats)\n`
    totalAmount += amountFor(performance, plays)
  }
  result += `Amount owed is ${usd(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`

  alert(result)
}

function amountFor(aPerformance, plays) {
  let result = 0
  switch (playFor(aPerformance, plays).type) {
    case 'tragedy':
      result = 40000
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30)
      }
      break
    case 'comedy':
      result = 30000
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20)
      }
      result += 300 * aPerformance.audience
      break
    default:
      throw new Error(`unknown type: ${playFor(aPerformance, plays).type}`)
  }
  return result;
}

function playFor(aPerformance, plays) {
  return plays[aPerformance.playID];
}


