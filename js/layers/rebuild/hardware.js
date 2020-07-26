var hardwares = {
  CPU: [
    // Name, Cost, Power
    ["Default", new Decimal(0), new Decimal(1)],
    ["T1", new Decimal(100), new Decimal(2)],
    ["T2", new Decimal(250), new Decimal(20)],
    ["T3", new Decimal(500), new Decimal(250)],
    ["T4", new Decimal(1000), new Decimal(2000)]
  ],
  MEM: [
    ["Default", new Decimal(0), new Decimal(0)],
    ["T1", new Decimal(200), new Decimal(5)],
    ["T2", new Decimal(400), new Decimal(10)],
    ["T3", new Decimal(800), new Decimal(15)]
  ],
  MOBO: [
    ["Default", new Decimal(0), new Decimal(5)],
    ["T1", new Decimal(50), new Decimal(3)],
    ["T2", new Decimal(100), new Decimal(1)],
    ["T3", new Decimal(250), new Decimal(0.5)]
  ]
}

function getHardwareTier(name) {
  if (!player.hardware[name]) return 0
  return player.hardware[name]
}

function getPlanHardwareTier(name) {
  const e = ge(name)
  return parseInt(e.options[e.selectedIndex].value)
}

function getPlanCost() {
  let ret = new Decimal(0)
  for (let hardware of Object.keys(hardwares)) {
    ret = ret.plus(hardwares[hardware][getPlanHardwareTier(hardware)][1])
  }
  return ret
}

function updateHardwareSelect() {
  for (let hardware of Object.keys(hardwares)) {
    const tiers = hardwares[hardware]
    const currentTier = getHardwareTier(hardware)

    const selectElm = ge(hardware)
    while(selectElm.firstChild) selectElm.firstChild.remove()

    for (let tier = 0; tier < tiers.length; tier++) {
      const desc = tiers[tier]
      const optionElm = document.createElement('option')
      if (currentTier == tier) optionElm.selected = "selected"
      optionElm.text = `${desc[0]}${currentTier == tier ? " (CURRENT)" : ""}, $${nf(desc[1])}, ${getHardwareEffectText(hardware, desc[2])}`
      optionElm.value = tier
      selectElm.add(optionElm)
    }
  }
}

function applyPlannedHardware() {
  for (let hardware of Object.keys(hardwares)) {
    player.hardware[hardware] = getPlanHardwareTier(hardware)
  }
}

function getHardwareEffect(type) {
  const tier = getHardwareTier(type)
  return hardwares[type][tier][2]
}

function getHardwareEffectText(type, value) {
  switch (type) {
    case "CPU":
      return `${nf(value)} cycle/s`
    case "MEM":
      return `Delay all softcaps by ${nf(value)} ticks`
    case "MOBO":
      if (value.gte(5)) return "It just works"
      return `Auto tick after ${nf(value)} cycle${value.gt(1) ? "s" : ""} without upgrade 2, and reduce linear hardcap to ${nf(value.div(5))}${value.lt(1) ? ", also supports Auto-Upgrade!" : ""}`
  }
}