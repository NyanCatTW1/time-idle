function getCashAvailable() {
  if (player.tickEver.lt(100)) return new Decimal(0)
  
  let ret = new Decimal(100)
  return ret
}