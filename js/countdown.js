function countdownStart() {
  let ret = getLinearPart()
  ret = ret.times(getExpoPart())

  return ret
}

function getLinearPart() {
  let ret = new Decimal(30)
  
  // Apply reset upgrade effect
  ret = ret.minus(getRULevel(0).times(5))
  ret = ret.minus(player.timePoints.times(getRULevel(2).times(2)))
  ret = ret.minus(getRULevel(3).times(5))

  // Apply linear softcap
  ret = ret.plus(Decimal.max(0, player.timePoints.minus(10)).times(getLinearSoftcapPower()))

  // Linear hardcap
  ret = Decimal.max(1, ret)

  return ret
}

function getExpoPart() {
  let ret = new Decimal(1)

  // Apply expo softcap
  ret = ret.times(Decimal.pow(1.1, Decimal.max(0, player.timePoints.minus(50))))

  return ret
}

function getLinearSoftcapPower() {
  let ret = new Decimal(10)
  ret = ret.minus(getRULevel(1))
  return ret
}