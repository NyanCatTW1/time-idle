var problemGoals = [
  null,
  new Decimal(25),
  new Decimal(100)
]

var problemAnswerReward = [
  null,
  "Making use of the answer, expo softcap base is reduced down to 1.05!"
]

function getProblemTickEver(id) {
  if (!player.problemTickEver[id]) return new Decimal(0)
  return player.problemTickEver[id]
}

function getProblemReward(id) {
  const tickEver = getProblemTickEver(id)
  switch (id) {
    case 1:
      return new Decimal(50).times(Decimal.min(5, Decimal.floor(tickEver.div(5))))
    default:
      return new Decimal(100).times(Decimal.min(10, Decimal.floor(tickEver.div(10))))
  }
}

function canAnswerProblem() {
  if (player.problem === 0) return false

  return player.tick.gte(problemGoals[player.problem])
}

function startProblem(id) {
  if (player.problem == id) return false
  reset(3, true, id != 0)
  player.problem = id
}