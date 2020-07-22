function countdownStart() {
  let ret = new Decimal(30)
  
  // Apply reset upgrade effect
  ret = ret.minus(getRULevel(0).times(5))
  ret = ret.minus(player.timePoints.times(getRULevel(2)))

  // Apply softcap
  ret = ret.plus(Decimal.max(0, player.timePoints.minus(10)).times(10))
  ret = ret.times(Decimal.pow(1.1, Decimal.max(0, player.timePoints.minus(50))))

  return ret
}