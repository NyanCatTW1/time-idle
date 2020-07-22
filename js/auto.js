function getResetCountdown() {
  return new Decimal(5)
}

function runAuto() {
  if (getRULevel(1).gt(0) && player.countdown.times(-1).gte(getResetCountdown())) reset(1)
}