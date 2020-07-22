function resetCheck(layer) {
  let checkPass = false
  switch (layer) {
    case 1:
      checkPass = player.countdown.eq(0)
      break;
  }
  if (checkPass) reset(layer)
}

function reset(layer) {
  // Reset stuff
  if (layer) {
    player.countdown = new Decimal(1/0)
  }

  // Layer awards
  switch (layer) {
    case 1:
      awardTimePoints(resetGain())
      break;
  }
}