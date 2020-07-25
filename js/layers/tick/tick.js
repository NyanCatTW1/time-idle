function tickGain() {
  return new Decimal(1)
}

function awardTick(amount) {
  player.tick = player.tick.plus(amount)
  player.tickEver = Decimal.max(player.tickEver, player.tick)
  if (player.challenge != 0) player.problemTickEver[player.challenge] = Decimal.max(player.problemTickEver[player.challenge], player.tick)
}

function canTick() {
  return player.tickTimeSpent.gte(tickReq())
}