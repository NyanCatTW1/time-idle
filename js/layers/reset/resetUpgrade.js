var resetUpgrades = [
  // Desc, Base cost, Cost scale, Max level, Unlock at
  ["Decrease base countdown time by 5 seconds per level", new Decimal(0.5), new Decimal(2), new Decimal(5), new Decimal(1)],
  ["Auto reset 5 seconds after the timer reaches 0", new Decimal(15), new Decimal(1), new Decimal(1), new Decimal(10)],
  ["Decrease base countdown time by 1 second per time point per level", new Decimal(25), new Decimal(1.2), new Decimal(5), new Decimal(20)]
]

function getRULevel(id) {
  let ret = player.resetUpgradesBought[id]
  if (typeof ret == "undefined") return new Decimal(0)
  return ret
}

function getRUCost(id) {
  const RU = resetUpgrades[id]
  let ret = RU[1]
  ret = ret.times(Decimal.pow(RU[2], getRULevel(id)))
  return Decimal.ceil(ret)
}

function giveRULevel(id, amount = 1) {
  player.resetUpgradesBought[id] = getRULevel(id).plus(amount)
}

function buyResetUpgrade(id) {
  const cost = getRUCost(id)
  if (getRULevel(id).lt(resetUpgrades[id][3]) && player.timePoints.gte(cost)) {
    player.timePoints = player.timePoints.minus(cost)
    giveRULevel(id)
  }
}

function RUUnlocked(id) {
  return player.timePointsEver.gte(resetUpgrades[id][4])
}