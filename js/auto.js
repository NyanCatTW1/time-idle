function getAutoTickSlowdown() {
  return new Decimal(5)
}

function runAuto() {
  if (getTULevel(1).gt(0) && player.tickTimeSpent.minus(tickReq()).gte(getAutoTickSlowdown())) reset(1)
}