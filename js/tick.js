function tickReq() {
  let ret = getLinearPart()
  ret = ret.times(getExpoPart())

  return ret
}

function getEffectiveTick() {
  let ret = player.tick

  if (player.problem != 2) ret = ret.minus(getHardwareEffect("MEM"))
  if (player.problemAnswered[2]) ret = ret.minus(10)

  ret = Decimal.max(0, ret)

  return ret
}

function getLinearPart(hardcap = true) {

  if (player.problem == 1) return getHardwareEffect("MOBO").div(5)

  const tick = getEffectiveTick()
  let ret = new Decimal(30)
  
  // Apply tick upgrade effect
  ret = ret.minus(getTULevel(0).times(5))
  ret = ret.minus(player.tick.times(getTULevel(2).times(2)))
  ret = ret.minus(getTULevel(3).times(5))

  // Apply linear softcap
  ret = ret.plus(Decimal.max(0, tick.minus(getLinearSoftcapStart())).times(getLinearSoftcapPower()))

  // Linear hardcap
  if (hardcap) ret = Decimal.max(getHardwareEffect("MOBO").div(5), ret)

  // Problem 3
  if (player.problem == 3) ret = ret.times(8000)

  return ret
}

function getLinearSoftcapStart() {
  if (player.problem == 2) return new Decimal(0)
  
  return new Decimal(10)
}

function getExpoPart() {
  let ret = new Decimal(1)

  ret = Decimal.pow(getExpoBase(), getExpoPower())

  return ret
}

function getExpoBase() {
  let ret = new Decimal(1.1)

  if (player.problemAnswered[1]) ret = new Decimal(1.05)
  if (player.problem == 1) ret = new Decimal(2)

  return ret
}

function getExpoPower() {
  const tick = getEffectiveTick()
  let ret = Decimal.max(0, tick.minus(getExpoSoftcapStart()))


  // Tick 150 softcap
  ret = ret.times(Decimal.max(0, player.tick.minus(150).divide(50)).plus(1))

  return ret
}

function getExpoSoftcapStart() {
  if (player.problem == 1 || player.problem == 2) return new Decimal(0)

  return new Decimal(50)
}

function getLinearSoftcapPower() {
  const tick = getEffectiveTick()
  let ret = new Decimal(10)

  // Apply TU
  ret = ret.minus(getTULevel(1))
  ret = ret.minus(getTULevel(4).divide(2.5))

  // Tick 100 softcap
  ret = ret.times(Decimal.max(0, tick.minus(getLinearSoftcapPowerIncreaseStart())).divide(20).plus(1))

  return ret
}

function getLinearSoftcapPowerIncreaseStart() {
  if (player.problem == 2) return new Decimal(0)

  return new Decimal(99)
}

function getProcessPower() {
  let ret = getHardwareEffect("CPU")
  
  return ret
}