function resetCheck(layer) {
  let checkPass = false
  switch (layer) {
    case 1:
      checkPass = player.countdown.lte(0)
      break;
  }
  if (checkPass) reset(layer)
}

function reset(layer) {
  // Layer awards
  switch (layer) {
    case 1:
      awardTimePoints(resetGain())
      break;
  }

  // Reset stuff
  if (layer) {
    player.countdown = countdownStart()
  }
}