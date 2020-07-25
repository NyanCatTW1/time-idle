function tickReq() {
  let ret = getLinearPart()
  ret = ret.times(getExpoPart())

  return ret
}

function getEffectiveTick() {
  let ret = player.tick

  ret = ret.minus(getHardwareEffect("MEM"))
  
  return ret
}

function getLinearPart(hardcap = true) {

  if (player.challenge == 1) return new Decimal(1)

  const tick = getEffectiveTick()
  let ret = new Decimal(30)
  
  // Apply tick upgrade effect
  ret = ret.minus(getTULevel(0).times(5))
  ret = ret.minus(tick.times(getTULevel(2).times(2)))
  ret = ret.minus(getTULevel(3).times(5))

  // Apply linear softcap
  ret = ret.plus(Decimal.max(0, tick.minus(10)).times(getLinearSoftcapPower()))

  // Linear hardcap
  if (hardcap) ret = Decimal.max(1, ret)

  return ret
}

function getExpoPart() {
  let ret = new Decimal(1)

  // Apply expo softcap
  ret = Decimal.pow(getExpoBase(), getExpoPower())

  return ret
}

function getExpoBase() {
  let ret = new Decimal(1.1)

  if (player.challenge == 1) ret = new Decimal(2)

  return ret
}

function getExpoPower() {
  const tick = getEffectiveTick()
  let ret = Decimal.max(0, tick.minus(50))

  if (player.challenge == 1) ret = player.tick

  return ret
}

function getLinearSoftcapPower() {
  const tick = getEffectiveTick()
  let ret = new Decimal(10)
  ret = ret.minus(getTULevel(1))
  ret = ret.times(Decimal.max(0, tick.minus(99)).divide(20).plus(1))
  return ret
}

function getProcessPower() {
  let ret = getHardwareEffect("CPU")
  
  return ret
}