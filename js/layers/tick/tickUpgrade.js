var tickUpgrades = [
  // Desc, Base cost, Cost scale, Max level, Unlock at
  ["Decrease base tick time by 5 cycles per level", new Decimal(0.5), new Decimal(2), new Decimal(5), new Decimal(1)],
  ["Finish the tick automatically 5 cycles after 100%, and nerf linear softcap by a cycle", new Decimal(15), new Decimal(1), new Decimal(1), new Decimal(10)],
  ["Decrease base tick time by 2 cycles per total tick per level", new Decimal(25), new Decimal(1.2), new Decimal(4), new Decimal(20)],
  ["Decrease base tick time by another 5 cycles per level", new Decimal(90), new Decimal(1.05), new Decimal(2), new Decimal(90)]
]

function getTULevel(id) {
  let ret = player.tickUpgradesBought[id]
  if (typeof ret == "undefined") return new Decimal(0)
  return ret
}

function getTUCost(id) {
  const TU = tickUpgrades[id]
  let ret = TU[1]
  ret = ret.times(Decimal.pow(TU[2], getTULevel(id)))
  return Decimal.ceil(ret)
}

function giveTULevel(id, amount = 1) {
  player.tickUpgradesBought[id] = getTULevel(id).plus(amount)
}

function buyTickUpgrade(id) {
  const cost = getTUCost(id)
  if (getTULevel(id).lt(tickUpgrades[id][3]) && player.tick.gte(cost)) {
    giveTULevel(id)
    reset(2)
  }
}

function TUUnlocked(id) {
  return player.tickEver.gte(tickUpgrades[id][4])
}