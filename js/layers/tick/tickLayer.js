function tickGain() {
  return new Decimal(1)
}

function awardTick(amount) {
  player.tick = player.tick.plus(amount)
  player.tickEver = Decimal.max(player.tickEver, player.tick)
}

function canTick() {
  return player.tickTimeSpent.gte(tickReq())
}