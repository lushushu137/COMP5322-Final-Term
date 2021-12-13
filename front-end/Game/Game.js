import { renderUser, renderAchievements, renderRanking } from "./RenderData.js";

let globalSpeed = 3;

let sizeMin = 20;
let sizeMax = 50;
let speedMin = globalSpeed * 0.1;
let speedMax = globalSpeed * 2;

let target = 50;
let level = 0;
let score = 0;

let generateGoldPosition = (number) => {
  let goldIsOverlap = (gold1, gold2) => {
    let center1 = {
      x: gold1.x + (1 / 2) * gold1.size,
      y: gold1.y + (1 / 2) * gold1.size,
    };
    let center2 = {
      x: gold2.x + (1 / 2) * gold2.size,
      y: gold2.y + (1 / 2) * gold2.size,
    };
    let margin = 20;
    return (
      Math.abs(center1.x - center2.x) <
        (1 / 2) * (gold1.size + gold2.size + margin) &&
      Math.abs(center1.y - center2.y) <
        (1 / 2) * (gold1.size + gold2.size + margin)
    );
  };
  let width = removePx(document.getElementById("mine").style.width);
  let height = removePx(document.getElementById("mine").style.height);

  let positionList = [];
  let i = 0;
  while (i < number) {
    let newGold = {
      x: Math.random() * 715 + 15,
      y: Math.random() * 600 + 50,
      rotateDeg: Math.floor(Math.random() * 0),
      size: Math.random() * (sizeMax - sizeMin) + sizeMin,
    };
    let hasHit = false;
    for (let j = 0; j < positionList.length; j++) {
      if (goldIsOverlap(newGold, positionList[j])) {
        hasHit = true;
        break;
      }
    }
    if (!hasHit) {
      positionList.push(newGold);
      i++;
    }
  }
  return positionList;
};

let goldList = [];

let addGold = (number) => {
  document.getElementById("mine").innerHTML = "";
  let mineDiv = document.getElementById("mine");
  goldList = generateGoldPosition(number);

  for (let i = 0; i < goldList.length; i++) {
    let currentGold = goldList[i];
    let goldDiv = document.createElement("div");
    goldDiv.id = i;
    goldDiv.className = "gold";
    goldDiv.style.position = "absolute";
    goldDiv.style.left = currentGold.x + "px";
    goldDiv.style.top = currentGold.y + "px";
    goldDiv.style.width = currentGold.size + "px";
    goldDiv.style.height = currentGold.size + "px";
    goldDiv.style.transform = "rotate(" + currentGold.rotateDeg + "deg)";
    goldDiv.setAttribute("size", currentGold.size);
    mineDiv.appendChild(goldDiv);
  }
};

let removePx = (str) => {
  return str ? parseFloat(str.match(/(\S*)px/)[1]) : 0;
};

let isDivHit = (gold, hook, biasx = 400, biasy = -50) => {
  let centerX1 =
    removePx(gold.style.left) + (1 / 2) * removePx(gold.style.width);
  let centerY1 =
    removePx(gold.style.top) + (1 / 2) * removePx(gold.style.height);
  let centerX2 =
    removePx(hook.style.left) + (1 / 2) * removePx(hook.style.width) + biasx;
  let centerY2 =
    removePx(hook.style.top) + (1 / 2) * removePx(hook.style.height) + biasy;

  if (
    Math.abs(centerX1 - centerX2) <
      (1 / 2) * (removePx(gold.style.width) + removePx(hook.style.width)) &&
    Math.abs(centerY1 - centerY2) <
      (1 / 2) * (removePx(gold.style.height) + removePx(hook.style.height))
  ) {
    return true;
  } else {
    return false;
  }
};

let setSpeed = (size) => {
  return (
    ((speedMax - speedMin) * (sizeMax - size)) / (sizeMax - sizeMin) + speedMin
  );
};

let addMoveToHook = () => {
  let hookDiv = document.getElementById("hook");
  let container = document.getElementById("middle");
  let state = "ROTATE";
  let theta = 0;
  let RADIUS = 50;
  let speed = globalSpeed;
  let getGold;
  setInterval(() => {
    if (state == "ROTATE") {
      theta = (theta + 0.01 * globalSpeed) % (2 * Math.PI);
      hookDiv.style.left = -Math.cos(theta) * RADIUS + "px";
      hookDiv.style.top = Math.abs(Math.sin(theta) * RADIUS) + "px";

      container.onclick = (e) => {
        if (state == "ROTATE") {
          state = "EMIT";
        }
      };
      state = "ROTATE";
    } else if (state == "EMIT") {
      RADIUS += speed;
      let x = -Math.cos(theta) * RADIUS;
      let y = Math.abs(Math.sin(theta) * RADIUS);
      hookDiv.style.left = x + "px";
      hookDiv.style.top = y + "px";

      // 判断是否与gold相交
      let goldDivs = document.getElementsByClassName("gold");
      for (const goldDiv of goldDivs) {
        if (isDivHit(goldDiv, hookDiv)) {
          getGold = goldDiv;
          state = "HIT";
        }
      }
      // 判断是否与边界相交
      if (x < -400 || x > 400 || y > 800) {
        getGold = null;
        state = "RETRIEVE";
      }
    } else if (state == "HIT") {
      speed = setSpeed(parseFloat(getGold.getAttribute("size")));
      state = "RETRIEVE";
    } else if (state == "RETRIEVE") {
      RADIUS -= speed;

      let x = -Math.cos(theta) * RADIUS;
      let y = Math.abs(Math.sin(theta) * RADIUS);

      hookDiv.style.left = x + "px";
      hookDiv.style.top = y + "px";
      if (getGold) {
        getGold.style.backgroundColor = "#f12711";
        getGold.style.left =
          removePx(getGold.style.left) + Math.cos(theta) * speed + "px";
        getGold.style.top =
          removePx(getGold.style.top) -
          Math.abs(Math.sin(theta)) * speed +
          "px";
      }

      if (RADIUS <= 50) {
        speed = globalSpeed;
        if (getGold) {
          score += Math.floor(parseInt(getGold.getAttribute("size")) / 10) * 10;
          document.getElementById("score").innerHTML = score;
          let parent = document.getElementById("mine");
          parent.removeChild(getGold);
          getGold = null;
          if (score >= target) {
            state = "SUCCESS";
          } else {
            state = "ROTATE";
          }
        } else {
          state = "ROTATE";
        }
      }
    } else if (state == "SUCCESS") {
      alert("SUCCESS");
      state = "ROTATE";
      theta = 0;
      RADIUS = 50;
      speed = globalSpeed;
      score = 0;
      target *= 2;
      level += 1;
      document.getElementById("score").innerHTML = score;
      document.getElementById("level").innerHTML = level;
      document.getElementById("target").innerHTML = target;
      addGold(50);
    }
  }, 10);
};

window.onload = () => {
  renderUser();
  renderAchievements();
  renderRanking();

  addGold(50);
  addMoveToHook();
  document.getElementById("score").innerHTML = score;
  document.getElementById("level").innerHTML = level;
  document.getElementById("target").innerHTML = target;
};
