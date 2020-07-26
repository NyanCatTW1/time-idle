var problemGoals = [
  null,
  new Decimal(25),
  new Decimal(100),
  new Decimal(0)
]

var problemAnswerReward = [
  null,
  "Making use of the answer, expo softcap base is reduced down to 1.05!",
  "If you optimize RAM space and that and that, all softcaps get delayed by 10 ticks!"
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
    case 2:
      return new Decimal(100).times(Decimal.min(10, Decimal.floor(tickEver.div(10))))
    case 3:
      return new Decimal(100).times(Decimal.floor(tickEver.div(25)))
    default:
      return new Decimal(0)
  }
}

function canAnswerProblem() {
  if (player.problem === 0 || problemGoals[player.problem].eq(0)) return false

  return player.tick.gte(problemGoals[player.problem])
}

function startProblem(id) {
  if (player.problem == id) return false
  reset(3, true, id != 0)
  player.problem = id
}