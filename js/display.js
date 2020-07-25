function updateDisplay() {
  updateTickLayer()
  updateToggleDisplay()
  updateTUDisplay()
  updateRebuildLayer()
  updateTabs()
}

function updateTickLayer(force = false) {
  if (!showTab("tickLayer") && !force) return false

  updateTickProgress()
  updateTickReq()

  const gain = tickGain()
  const single = gain.eq(1)
  de("tickBtn", canTick(), "", function() {
    ue("tickGain", single ? "a" : nf(gain))
    ue("tickGainS", single ? "" : "s")
  })

  de("tickDisplay", player.tickEver.gt(0), "", function() {
    ue("currentTick", nf(player.tick))
  })
}

function updateTickProgress() {
  const req = tickReq()
  ue("tickProgress", getFinalProgressBar(Decimal.min(req, player.tickTimeSpent), req, getProcessPower()))
}

function updateTickReq() {
  const linearPart = getLinearPart(false)
  let str = ""

  if (getExpoPart().neq(1)) {
    if (linearPart.lt(1)) {
      str += `Max(1, ${nf(linearPart)}) * `
    } else {
      str += `${nf(linearPart)} * `
    }
    str += `(${nf(getExpoBase())} ^ ${nf(getExpoPower())}) = `
  }
  
  str += timeDisplay(tickReq())

  ue("nextTickReq", str)
}

function updateToggleDisplay(force = false) {
  if (!showTab("tabbing") && !force) {
    ue("tabbingShown", "Off")
    return false
  }

  for (let tab of tabList) {
    de(`${tab}Toggle`, tabUnlocked(tab), "", function() {
      ue(`${tab}Shown`, showTab(tab) ? "On" : "Off")
    })
  }
}

function TUMaxed(id) {
  return getTULevel(id).gte(tickUpgrades[id][3])
}

function showTU(id) {
  let ret = TUUnlocked(id)
  ret = ret && !(player.hideMaxedTickUpg && TUMaxed(id))
  return ret
}

function updateTUDisplay(force = false) {
  if (!showTab("tickUpgrade") && !force) return false

  ue("maxedShown", player.hideMaxedTickUpg ? "Yes" : "No")

  for (let id = 0; id < tickUpgrades.length; id++) {
    de(`TU${id}`, showTU(id), "", function() {
      ue(`TU${id}`, getTUBtnText(id))
    })
  }
}

function getTUBtnText(id) {
  const TU = tickUpgrades[id]
  const TUCost = getTUCost(id)
  return `${TU[0]}
Req: ${ TUMaxed(id) ? "MAXED" : `Tick ${nf(TUCost)}`}
Current Level: ${nf(getTULevel(id))}/${nf(tickUpgrades[id][3])}`
}

function updateTabs() {
  for (let tab of tabList) {
    de(`${tab}Tab`, showTab(tab))
  }
}

function toggleMaxedTickUpg() {
  player.hideMaxedTickUpg = !player.hideMaxedTickUpg
}

function updateRebuildLayer() {
  de("firstRebuild", player.rebuilds < 1)
  ue("cashSpent", nf(getPlanCost()))
  ue("cashAvailable", nf(getCashAvailable()))
}