function updateDisplay() {
  updateTickLayer()
  updateToggleDisplay()
  updateTUDisplay()
  updateRebuildLayer()
  updateProblemDisplay()
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

  ue("nextUnlock", getNextTickUnlock())
}

function getNextTickUnlock() {
  if (player.tickEver.gt(50)) {
    if (player.tickEver.lt(100)) return "You will unlock a new prestige layer at tick 100"
    else return `Your highest tick ever is ${nf(player.tickEver)}`
  } 
  return ""
}

function updateTickProgress() {
  const req = tickReq()
  ue("tickProgress", getFinalProgressBar(Decimal.min(req, player.tickTimeSpent), req, getProcessPower()))
}

function updateTickReq() {
  const linearPart = getLinearPart(false)
  let str = ""

  if (getExpoPart().neq(1)) {
    if (linearPart.lt(getHardwareEffect("MOBO").div(5))) {
      str += `Max(${nf(getHardwareEffect("MOBO").div(5))}, ${nf(linearPart)}) * `
    } else {
      str += `${nf(linearPart)} * `
    }
    str += `(${nf(getExpoBase())} ^ ${nf(getExpoPower())}) = `
  }
  
  str += `${nf(tickReq())} processor cycles`

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

function updateRebuildLayer(force = true) {
  if (!showTab("rebuild") && !force) return false

  de("firstRebuild", player.rebuilds < 1)
  ue("cashSpent", nf(getPlanCost()))
  ue("cashAvailable", nf(getCashAvailable()))
}

function updateProblemDisplay(force = true) {
  if (!showTab("problems") && !force) return false

  de("problemStatus", player.problem != 0, "", function() {
    ue("currentProblem", player.problem)
    ue("quitProblem", canAnswerProblem() ? "Answer the problem." : "Give up on the problem.")
  })

  for (let i = 1; i < problemGoals.length; i++) {
    ue(`problem${i}Stat`, `Your best tick ever in this problem is Tick ${nf(getProblemTickEver(i))}, awarding you ${nf(getProblemReward(i))} cash.${player.problemAnswered[i] ? "<br>" + problemAnswerReward[i] : ""}`, true)
  }
}