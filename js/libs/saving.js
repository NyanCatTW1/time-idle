// THE saving library, by Nyan Cat 2020
// Note: Make sure your saving variable is defined by VAR and not LET, otherwise it won't work
// You need Lodash for this to work https://lodash.com/
// And please, just please make sure you change the stuff below to suit your code, otherwise it will burst on fire
const saveName = "TISave"
const initPlayerFunctionName = "getDefaultPlayer"
const playerVarName = "player" // DO NOT USE THE WORD "SAVE"
const importDangerAlertText = "Your imported save seems to be missing some values, which means importing this save might be destructive, if you have made a backup of your current save and are sure about importing this save please press OK, if not, press cancel and the save will not be imported."
const versionTagName = "version"
const decimalLibraryVarName = "Decimal" // MAKE SURE YOU CHANGE THIS IF YOU ARE USING OTHER DECIMAL LIBRARIES
const arrayTypes = {
  // For EACH array in your player variable, put a key/value to define its type like I did below
  hiddenTabs: "String",
}

// Ex: When you have object that looks like {1: new Decimal(2), 2: new Decimal(1)}, it belongs here
const decimalDicts = [
  "resetUpgradesBought"
]

const hardResetConfirmText = [ // You can add more strings if you want multi time confirmation
  "Are you sure about doing this? YOU WILL LOSE EVERYTHING YOU HAVE WITHOUT ANY REWARDS!",
];

const importPrompt = "Paste your exported save below:"

function onImportError() {
  alert("Error: Imported save is in invalid format, please make sure you've copied the save correctly and isn't just typing gibberish.")
}

function onLoadError() {
  console.log("The save didn't load? Oh fuck.")
}

function onImportSuccess() {
  console.log("Save imported successfully.")
}

function onExportSuccess() {
  alert("Exported to clipboard")
}

function onLoad() { // Put your savefile updating codes here
  if (typeof player.version == "undefined") {
    alert("Due to a balance change, your time points will be decreased down to 11, sorry!")
    player.timePoints = Decimal.min(11, player.timePoints)
    player.timePointsEver = player.timePoints
    player.version = 0
  }
  if (player.version < 1) {
    if (getRULevel(2).gt(4)) {
      player.resetUpgradesBought[2] = new Decimal(4)
    }
  }
}
// Only change things above to fit your game UNLESS you know what you're doing

function exportSave() {
  copyStringToClipboard(btoa(JSON.stringify(window[playerVarName])))
  onExportSuccess()
}

function importSave() {
  let save = prompt(importPrompt, "")
  if (save == "" || save == null) return false
  loadGame(save, true)
}

function hardReset() {
  for (let confirmText of hardResetConfirmText) {
    if (!confirm(confirmText)) return false;
  }
  window[playerVarName] = window[initPlayerFunctionName]();
  saveGame();
  location.reload();
}

Array.prototype.diff = function (a) {
  return this.filter(function (i) {
    return a.indexOf(i) < 0;
  });
};

function saveGame() {
  localStorage.setItem(saveName, btoa(JSON.stringify(window[playerVarName])))
}

function loadGame(save, imported = false) {
  try {
    if (save === undefined) save = localStorage.getItem(saveName)
    var save = JSON.parse(atob(save))
    let reference = window[initPlayerFunctionName]()
    let refLists = listItems(reference)
    let saveLists = listItems(save)
    let missingItem = refLists[0].diff(saveLists[0])
    if (missingItem.includes("save")) {
      console.log("Unrecoverable corrupted save detected, loading default save...")
      return
    }
    if (missingItem.length != 0 && imported) {
      if (!confirm(importDangerAlertText)) {
        return
      }
    }

    missingItem.forEach(function (value) {
      if (value != versionTagName) _.set(save, value, _.get(reference, value))
    })

    let decimalList = [...new Set(saveLists[1].diff(refLists[1]).concat(findOmegaNumVars(saveLists[2])).concat(findDecimalInDict(saveLists[1])))]
    decimalList.forEach(function (value) {
      _.set(save, value, new window[decimalLibraryVarName](_.get(save, value)))
    })

    saveLists[2].forEach(function (value) {
      let arrayType = findArrayType(value)
      if (arrayType != "String") _.set(save, value, _.get(save, value).map(getMapFunc(arrayType)))
    })

    window[playerVarName] = save
    onLoad()
    _.set(save, versionTagName, _.get(reference, versionTagName))
    if (imported) onImportSuccess()
  } catch (err) {
    if (imported) {
      console.log(err)
      onImportError()
      return
    } else {
      console.log(err)
      onLoadError()
      return
    }
  }
}

function findDecimalInDict(stringList) {
  let ret = []
  for (let varName of stringList) {
    for (let decimalDict of decimalDicts) {
      if (varName.startsWith(decimalDict)) {
        ret.push(varName)
        break
      }
    }
  }
  return ret
}

function findOmegaNumVars(arrayList) {
  let ret = []
  for (let varName of arrayList) {
    if (varName.endsWith(".array")) {
      ret.push(varName.slice(0, -6))
    }
  }
  return ret
}

function getMapFunc(type) {
  switch (type) {
  case "Decimal":
    return x => new window[decimalLibraryVarName](x)
  case "Number":
    return x => Number(x)
  default:
    return x => x
  }
}

function findArrayType(index) {
  let definedType = arrayTypes[index]
  if (definedType === undefined) return "String"
  return definedType
}

function listItems(data, nestIndex = "") {
  let itemList = []
  let stringList = []
  let arrayList = []
  Object.keys(data).forEach(function (index) {
    let value = data[index]
    let thisIndex = nestIndex + (nestIndex === "" ? "" : ".") + index
    itemList.push(thisIndex)
    switch (typeof value) {
    case "object":
      if (value instanceof Array) {
        arrayList.push(thisIndex)
      } else if (!(value instanceof window[decimalLibraryVarName])) {
        let temp = listItems(value, thisIndex)
        itemList = itemList.concat(temp[0])
        stringList = stringList.concat(temp[1])
        arrayList = arrayList.concat(temp[2])
      }
      break;
    case "string":
      stringList.push(thisIndex)
      break;
    }
  });
  return [itemList, stringList, arrayList]
};
