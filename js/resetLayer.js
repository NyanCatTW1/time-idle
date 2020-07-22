function resetGain() {
  return new Decimal(1)
}

function awardTimePoints(amount) {
  player.timePointsEver = player.timePointsEver.plus(amount)
  player.timePoints = player.timePoints.plus(amount)
}