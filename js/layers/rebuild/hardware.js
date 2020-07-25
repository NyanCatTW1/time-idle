var hardwares = {
  CPU: [
    // Name, Cost, Power
    ["Default", new Decimal(0), new Decimal(1)],
    ["T1", new Decimal(100), new Decimal(2)]
  ],
  MEM: [
    ["Default", new Decimal(0), new Decimal(0)],
    ["T1", new Decimal(200), new Decimal(5)]
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
  }
}