class Hardware {
  constructor (name, cost, effect) {
    if (!(this instanceof Hardware)) throw new Error("Constructor called as a function");

    this.Name = name
    this.Cost = new Decimal(cost)
    this.Effect = new Decimal(effect)
  }
}

var hardwares = {
  CPU: [
    // Name, Cost, Effect
    new Hardware("Default", 0, 1),
    new Hardware("T1", 100, 2),
    new Hardware("T2", 250, 20),
    new Hardware("T3", 500, 250),
    new Hardware("T4", 1000, 2000)
  ],
  MEM: [
    new Hardware("Default", 0, 0),
    new Hardware("T1", 200, 5),
    new Hardware("T2", 400, 10),
    new Hardware("T3", 800, 15)
  ],
  MOBO: [
    new Hardware("Default", 0, 5),
    new Hardware("T1", 50, 3),
    new Hardware("T2", 100, 1),
    new Hardware("T3", 250, 1/4)
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
    ret = ret.plus(hardwares[hardware][getPlanHardwareTier(hardware)].Cost)
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
      optionElm.text = `${desc.Name}${currentTier == tier ? " (CURRENT)" : ""}, $${nf(desc.Cost)}, ${getHardwareEffectText(hardware, desc.Effect)}`
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
  return hardwares[type][tier].Effect
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