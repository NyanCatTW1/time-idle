function tickGain() {
  return new Decimal(1)
}

function awardTick(amount) {
  player.tick = player.tick.plus(amount)
  player.tickEver = Decimal.max(player.tickEver, player.tick)
  if (player.problem != 0) player.problemTickEver[player.problem] = Decimal.max(player.problemTickEver[player.problem], player.tick)
}

function canTick() {
  return player.tickTimeSpent.gte(tickReq())
}