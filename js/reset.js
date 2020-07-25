function resetCheck(layer) {
  let checkPass = false
  switch (layer) {
    case 1:
      checkPass = canTick()
      break;
    case 3:
      checkPass = getCashAvailable().gte(getPlanCost())
  }
  if (checkPass) reset(layer)
}

function reset(layer) {
  // Layer specfic codes
  switch (layer) {
    case 1:
      awardTick(tickGain())
      break;
    case 3:
      applyPlannedHardware()
      updateHardwareSelect()
      player.rebuilds++
      break;
  }

  // Reset stuff
  if (layer) {
    player.tickTimeSpent = new Decimal(0)
  }
  if (layer >= 2) {
    player.tick = new Decimal(0)
  }
  if (layer >= 3) {
    player.tickUpgradesBought = {}
  }
}