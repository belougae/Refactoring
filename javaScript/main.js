$(document).ready(function () {
  statement()
})
var plays = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' }
}

function usd (aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(aNumber)
}


function totalVolumeCredits(data){
  let result = 0
  for (let performance of data.performances) {
    result += performance.volumeCredits;
  }
  return result;
}


function  totalAmount(data) {
  let result = 0
  for (let performance of data.performances) {
    result += performance.play.amount
  }
  return result;
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let performance of data.performances) {
    result += ` ${performance.play.name}: ${usd(performance.play.amount)} (${performance.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount(data))}\n`;
  result += `You earned ${totalVolumeCredits(data)} credits\n`;
  return result;
}

function statement () {
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

  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData, plays);
}

function enrichPerformance(aPerformance) {
  const result = Object.assign({}, aPerformance);
  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);
  return result;
}

// 付款人
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function amountFor(aPerformance) {
  let result = 0
  switch (aPerformance.play.type) {
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
      throw new Error(`unknown type: ${aPerformance.play.type}`)
  }
  return result
}

// 观众量积分
function volumeCreditsFor(aPerformance) {
  let result = 0
  // add volume credits
  result += Math.max(aPerformance.audience - 30, 0)

  // add extra credit for every ten comedy attendees
  if ('comedy' === aPerformance.play.type)
    result += Math.floor(aPerformance.audience / 5)
  return result
}
