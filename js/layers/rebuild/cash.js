function getCashAvailable() {
  if (player.tickEver.lt(100)) return new Decimal(0)
  
  let ret = new Decimal(100)
  ret = ret.plus(player.tickEver.minus(100).times(10))

  for (let i = 1; i < problemGoals.length; i++) {
    ret = ret.plus(getProblemReward(i))
  }

  return ret
}