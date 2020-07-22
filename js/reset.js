function reset(layer) {
  debugger;
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