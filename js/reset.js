function resetCheck(layer) {
  if (canReset(layer)) reset(layer)
}

function canReset(layer) {
  switch (layer) {
    default:
      return true
    case 1:
      return canTick()
    case 3:
      return getCashAvailable().gte(getPlanCost())
  }
}

function reset(layer, auto = false, ask = true) {
  // Confirmations
  if (ask) {
    switch (layer) {
      case 3:
        if (!confirm("This will reset all your tick upgrades and put you back to tick 0, are you sure about that?")) return false
    }
  }

  // Layer specfic codes
  switch (layer) {
    case 1:
      awardTick(tickGain())
      break;
    case 3:
      if (canReset(3) && !auto) {
        applyPlannedHardware()
        updateHardwareSelect()
        player.rebuilds++
      }
      if (canAnswerProblem()) {
        player.problemAnswered[player.problem] = true
      }
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