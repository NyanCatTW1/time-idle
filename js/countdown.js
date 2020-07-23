function countdownStart() {
  let ret = new Decimal(30)
  
  // Apply reset upgrade effect
  ret = ret.minus(getRULevel(0).times(5))
  ret = ret.minus(player.timePoints.times(getRULevel(2).times(2)))

  // Apply linear softcap
  ret = ret.plus(Decimal.max(0, player.timePoints.minus(10)).times(getLinearSoftcapPower()))

  // Linear hardcap
  ret = Decimal.max(1, ret)

  // Apply expo softcap
  ret = ret.times(Decimal.pow(1.1, Decimal.max(0, player.timePoints.minus(50))))

  return ret
}

function getLinearSoftcapPower() {
  let ret = new Decimal(10)
  ret = ret.minus(getRULevel(1))
  return ret
}