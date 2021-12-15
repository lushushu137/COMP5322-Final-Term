import {
  renderUser,
  renderAchievements,
  renderRanking,
  renderProcess,
} from "./RenderData.js";
import { saveProcess, addAchievement } from "../queries.js";
import { allAchievements } from "../../achievements.js";
let globalSpeed = 3;

let sizeMin = 20;
let sizeMax = 50;
let speedMin = globalSpeed * 0.1;
let speedMax = globalSpeed * 2;

let target;
let level;
let score;

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
      x: Math.random() * 515 + 25,
      y: Math.random() * 350 + 30,
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

let isDivHit = (gold, hook, biasx = 300, biasy = -50) => {
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
      if (score === 0 && !hasAchievement("1")) {
        // Play the game for the first time.
        handleAchievement("1");
      }
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
      if (x < -300 || x > 300 || y > 500) {
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
        getGold.style.backgroundColor = "#fff";
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
          let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
          saveProcess(userInfo.uid, { score, target, level });
          handleProcess({ score, target, level });
          renderRanking();

          let scoreDiv = document.getElementById("score");
          scoreDiv.style.color = "#fff";
          setTimeout(() => {
            scoreDiv.style.color = "var(--theme-green)";
          }, 300);
          document.getElementById("score").innerHTML = score;
          let parent = document.getElementById("mine");
          parent.removeChild(getGold);
          getGold = null;
          if (
            parent.querySelectorAll(".gold").length == 0 &&
            !hasAchievement("8")
          ) {
            // Clear all golds
            handleAchievement("8");
          }
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
      if (level === 0) {
        // Finish 1 level.
        handleAchievement("2");
      }
      if (level === 1) {
        // Finish 2 levels.
        handleAchievement("4");
      }
      if (level === 2) {
        // Finish 3 levels.
        handleAchievement("5");
      }
      if (level === 3) {
        // Finish 4 levels.
        handleAchievement("6");
      }
      if (level === 4) {
        // Finish 5 levels.
        handleAchievement("7");
      }
      state = "ROTATE";
      theta = 0;
      RADIUS = 50;
      speed = globalSpeed;
      target *= 2;
      level += 1;
      // document.getElementById("score").innerHTML = score;
      document.getElementById("level").innerHTML = level;
      document.getElementById("target").innerHTML = target;
      addGold(30);
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      saveProcess(userInfo.uid, { score, target, level });
    }
  }, 10);
};

let initScore = () => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  target = parseInt(userInfo.process.target);
  level = parseInt(userInfo.process.level);
  score = parseInt(userInfo.process.score);
};

let handleProcess = () => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  userInfo.process = { score, target, level };
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  renderProcess();
};
let handleAchievement = (aid) => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo.acheivement.length == 0) {
    let currAch = allAchievements.find((ach) => ach.aid == aid);
    userInfo.acheivement.unshift(currAch);
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    acheivementAlert(currAch);
    renderAchievements();
    addAchievement(userInfo.uid, aid);
  } else {
    if (!userInfo.acheivement.find((ach) => ach.aid == aid)) {
      let currAch = allAchievements.find((ach) => ach.aid == aid);
      userInfo.acheivement.unshift(currAch);
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      acheivementAlert(currAch);
      renderAchievements();
      addAchievement(userInfo.uid, aid);
    }
  }
};

let hasAchievement = (aid) => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (!userInfo.acheivement) return false;
  return userInfo.acheivement.find((ach) => ach.aid === aid);
};
let acheivementAlert = (ach) => {
  let alertDiv = document.querySelector(".custom_alert");
  let content = alertDiv.querySelector(".alert_content");
  content.textContent = `${ach.title}: ${ach.detail}`;
  alertDiv.style.opacity = 1;
  alertDiv.style.zIndex = 100;
  setTimeout(() => {
    alertDiv.style.opacity = 0;
    alertDiv.style.zIndex = -1;
  }, 3000);
};
window.onload = () => {
  renderUser();
  renderAchievements();
  renderRanking();
  renderProcess();

  initScore();
  addGold(30);
  addMoveToHook();
};
