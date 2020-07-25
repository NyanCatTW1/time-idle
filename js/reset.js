function resetCheck(layer) {
  let checkPass = false
  switch (layer) {
    case 1:
      checkPass = canTick()
      break;
  }
  if (checkPass) reset(layer)
}

function reset(layer) {
  // Layer awards
  switch (layer) {
    case 1:
      awardTick(tickGain())
      break;
  }

  // Reset stuff
  if (layer) {
    player.tickTimeSpent = new Decimal(0)
  }
  if (layer >= 2) {
    player.tick = new Decimal(0)
  }
}