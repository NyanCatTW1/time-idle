function resetGain() {
  return new Decimal(1)
}

function awardTimePoints(amount) {
  player.timePoints = player.timePoints.plus(amount)
  player.timePointsEver = Decimal.max(player.timePointsEver, player.timePoints)
}