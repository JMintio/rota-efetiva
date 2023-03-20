var timerStarted = 0;
// ------- localStorage Set -------
var stopperCounter = 0;
var arrayOfNumbers = [],
  arrayMinute = [],
  arraySeconds = [],
  arrayMilli = [],
  arrayOfTimes = [],
  arrayOfConfig = [];
var inumbers = localStorage.getItem("numbers");
var icounter = parseInt(localStorage.getItem("counter"));
var iminutes = localStorage.getItem("minutes");
var iseconds = localStorage.getItem("seconds");
var itimes = localStorage.getItem("times");
var ispace = localStorage.getItem("space");
if (inumbers) {
  let inumbers2 = JSON.parse(inumbers);
  arrayOfNumbers = inumbers2;
  icounter++;
  stopperCounter = icounter;

  let iminutes2 = JSON.parse(iminutes);
  arrayMinute = iminutes2;
  let iseconds2 = JSON.parse(iseconds);
  arraySeconds = iseconds2;
  let itimes2 = JSON.parse(itimes);
  arrayOfTimes = itimes2;
  let ispace2 = JSON.parse(ispace);
  arrayOfConfig = ispace2;

  let arrayOfNumbers2 = arrayOfNumbers.join("");
  document.querySelector(".columnNumber").innerHTML = arrayOfNumbers2;
  let arrayOfTimes2 = arrayOfTimes.join("");
  document.querySelector(".columnTime").innerHTML = arrayOfTimes2;
  let arrayOfConfig2 = arrayOfConfig.join("");
  document.querySelector(".space").innerHTML = arrayOfConfig2;
}
// ------- Start Time -------
function timerStart() {
  //timer style
  if (timerStarted == 0) {
    //Start cronometer
    isStarted = true;
    if (isStarted == true) {
      timerCount = setInterval(() => {
        cronometer();
      }, 100);
      startTime = new Date().getTime();
    }
  }
  timerStarted = 1;
}
// ------- Stop Time -------
function timerStop() {
  if (timerStarted == 1) {
    clearInterval(timerCount);
    arrayMinute.push(totalTimeMin);
    arraySeconds.push(totalTimeSeg);
    arrayMilli.push(totalTimeMilli);
    document.querySelector(".outputCounter").innerHTML = `${totalTimeMin}:${totalTimeSeg}`;

    arrayOfTimes.push(arrayMinute[stopperCounter] + ":" + arraySeconds[stopperCounter] + "<br/>");
    let arrayOfTimes2 = arrayOfTimes.join("");
    document.querySelector(".columnTime").innerHTML = arrayOfTimes2;

    arrayOfNumbers.push(stopperCounter + 1 + "<br/>");
    let arrayOfNumbers2 = arrayOfNumbers.join("");
    document.querySelector(".columnNumber").innerHTML = arrayOfNumbers2;

    if (stopperCounter > 0) {
      arrayOfConfig.push("<br/>");
      let arrayOfConfig2 = arrayOfConfig.join("");
      document.querySelector(".space").innerHTML = arrayOfConfig2;
    }
    localStorage.setItem("numbers", JSON.stringify(arrayOfNumbers));
    localStorage.setItem("counter", JSON.stringify(stopperCounter));
    localStorage.setItem("minutes", JSON.stringify(arrayMinute));
    localStorage.setItem("seconds", JSON.stringify(arraySeconds));
    localStorage.setItem("times", JSON.stringify(arrayOfTimes));
    localStorage.setItem("space", JSON.stringify(arrayOfConfig));
    timerStarted = 0;

    stopperCounter++;
    sumOutputs();
  }
}
// ------- Delete All-------
function deleteAll() {
  document.querySelector(".popupDeleteAll").style.display = "flex";
  document.querySelector(".popupDeleteAll").classList.remove("animate__bounceOutLeft");
}
function popupYes() {
  clearInterval(timerCount);
  arraySeconds.length = 0;
  arrayMinute.length = 0;
  arrayOfTimes.length = 0;
  arrayOfNumbers.length = 0;
  arrayOfConfig.length = 0;
  stopperCounter = 0;
  let arrayOfNumbers2 = arrayOfNumbers.join("");
  document.querySelector(".columnNumber").innerHTML = arrayOfNumbers2;
  let arrayOfTimes2 = arrayOfTimes.join("");
  document.querySelector(".columnTime").innerHTML = arrayOfTimes2;
  let arrayOfConfig2 = arrayOfConfig.join("");
  document.querySelector(".space").innerHTML = arrayOfConfig2;
  document.querySelector(".popupDeleteAll").classList.add("animate__bounceOutLeft");
}
function popupNo() {
  document.querySelector(".popupDeleteAll").classList.add("animate__bounceOutLeft");
}
// ******************************* Options *******************************

// ------- Delete -------
function deleteTime() {
  if (stopperCounter > 0) {
    arraySeconds.pop();
    arrayMinute.pop();
    arrayOfTimes.pop();
    arrayOfNumbers.pop();
    arrayOfConfig.pop();

    let arrayOfNumbers2 = arrayOfNumbers.join("");
    document.querySelector(".columnNumber").innerHTML = arrayOfNumbers2;
    let arrayOfTimes2 = arrayOfTimes.join("");
    document.querySelector(".columnTime").innerHTML = arrayOfTimes2;
    let arrayOfConfig2 = arrayOfConfig.join("");
    document.querySelector(".space").innerHTML = arrayOfConfig2;
    stopperCounter--;
    localStorage.setItem("numbers", JSON.stringify(arrayOfNumbers));
    localStorage.setItem("counter", JSON.stringify(stopperCounter - 1));
    localStorage.setItem("minutes", JSON.stringify(arrayMinute));
    localStorage.setItem("seconds", JSON.stringify(arraySeconds));
    localStorage.setItem("times", JSON.stringify(arrayOfTimes));
    localStorage.setItem("space", JSON.stringify(arrayOfConfig));
    sumOutputs();
  }
}

// ------- Increase -------
function increaseMin() {
  if (stopperCounter > 0) {
    arrayMinute[stopperCounter - 1]++;

    //
    if (arrayMinute[stopperCounter - 1] < 10) {
      arrayMinute[stopperCounter - 1] = "0" + arrayMinute[stopperCounter - 1];
    }
    //
    arrayOfTimes.pop(0);
    arrayOfTimes.push(arrayMinute[stopperCounter - 1] + ":" + arraySeconds[stopperCounter - 1] + "<br/>");
    let arrayOfTimes2 = arrayOfTimes.join("");
    document.querySelector(".columnTime").innerHTML = arrayOfTimes2;
    localStorage.setItem("minutes", JSON.stringify(arrayMinute));
    localStorage.setItem("seconds", JSON.stringify(arraySeconds));
    localStorage.setItem("times", JSON.stringify(arrayOfTimes));
    sumOutputs();
  }
}

// ------- Decrease -------
function decreaseMin() {
  if (stopperCounter > 0) {
    arrayMinute[stopperCounter - 1]--;
    if (arrayMinute[stopperCounter - 1] == -1) {
      arrayMinute[stopperCounter - 1] = 0;
    }
    //
    if (arrayMinute[stopperCounter - 1] < 10) {
      arrayMinute[stopperCounter - 1] = "0" + arrayMinute[stopperCounter - 1];
    }
    //
    arrayOfTimes.pop(0);
    arrayOfTimes.push(arrayMinute[stopperCounter - 1] + ":" + arraySeconds[stopperCounter - 1] + "<br/>");
    let arrayOfTimes2 = arrayOfTimes.join("");
    document.querySelector(".columnTime").innerHTML = arrayOfTimes2;
    localStorage.setItem("minutes", JSON.stringify(arrayMinute));
    localStorage.setItem("seconds", JSON.stringify(arraySeconds));
    localStorage.setItem("times", JSON.stringify(arrayOfTimes));
    sumOutputs();
  }
}

// ******************************* Timer *******************************
// ------- Cronometer -------
var totalTimeMin = {},
  totalTimeSeg = {},
  totalTimeMilli = {},
  totalTime = {},
  startTime = {},
  timerCount = {};
function cronometer() {
  endTime = new Date().getTime();
  totalTime = endTime - startTime;
  totalTimeMin = parseInt((endTime - startTime) / 60000);
  totalTimeSeg = ((totalTime % 60000) / 1000).toFixed(0);
  totalTimeMilli = (endTime - startTime) % 1000;
  if (totalTimeSeg < 10) {
    totalTimeSeg = "0" + totalTimeSeg;
  }
  if (totalTimeMin < 10) {
    totalTimeMin = "0" + totalTimeMin;
  }
  if (totalTimeMilli < 100) {
    totalTimeMilli = "0" + totalTimeMilli;
  }
  if (totalTimeMilli < 10) {
    totalTimeMilli = "00" + totalTimeMilli;
  }
  document.querySelector(".outputCounter").innerHTML = `${totalTimeMin}:${totalTimeSeg}`;
}

// ******************************* Outputs *******************************
function sumOutputs() {
  let inputTime = document.getElementById("inputTime").value;
  let inputClient = document.getElementById("inputClientes").value;
  // \/ \/ \/ SUM MINUTES \/ \/ \/
  var sumMinute = 0;
  arrayMinute.forEach((i) => {
    sumMinute += parseInt(i);
    document.querySelector(".infoTime").innerHTML = sumMinute + " min";
  });
  // \/ \/ \/ REMAINING TIME \/ \/ \/
  let getRemainClt = inputClient - stopperCounter;
  document.querySelector(".cltRest").innerHTML = getRemainClt;
  // \/ \/ \/ Medium Time \/ \/ \/

  let totalMedTime = (inputTime - sumMinute) / getRemainClt;
  let totalMedTimeRound = Math.round(totalMedTime);
  document.querySelector(".medTimeOutput").innerHTML = totalMedTimeRound + " min";
  // \/ \/ \/ RE \/ \/ \/
  let getRE = Math.round((sumMinute * 100) / inputTime);
  document.querySelector(".RE").innerHTML = getRE + "%";

  if ((getRE >= 0) & (getRE < 50)) {
    let REStyle = document.querySelector(".RE");
    REStyle.style.color = "red";
  } else if ((getRE >= 50) & (getRE < 80)) {
    let REStyle = document.querySelector(".RE");
    REStyle.style.color = "orange";
  } else if (getRE >= 75) {
    let REStyle = document.querySelector(".RE");
    REStyle.style.color = "green";
  }
}
