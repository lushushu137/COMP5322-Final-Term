import { getRanking } from "../queries.js";
export let renderUser = () => {
  let userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    let parsedUserInfo = JSON.parse(userInfo);
    let avatorDiv = document.querySelector("#avator");
    let userNameDiv = document.querySelector("#userName");
    userNameDiv.textContent = parsedUserInfo.username;
  } else {
    console.log("未登录");
    window.location.href = "../Login/Login.html";
  }
};

export let renderProcess = () => {
  let userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    let parsedUserInfo = JSON.parse(userInfo);
    let scoreDiv = document.querySelector("#score");
    let targetDiv = document.querySelector("#target");
    let levelDiv = document.querySelector("#level");

    scoreDiv.textContent = parsedUserInfo.process.score;
    targetDiv.textContent = parsedUserInfo.process.target;
    levelDiv.textContent = parsedUserInfo.process.level;
  } else {
    console.log("未登录");
    window.location.href = "../Login/Login.html";
  }
};
export let renderAchievements = () => {
  let userInfo = sessionStorage.getItem("userInfo");
  let achievementListDiv = document.querySelector(".achievementList_itemList");
  achievementListDiv.innerHTML = "";
  if (userInfo) {
    let achievementList = JSON.parse(userInfo).acheivement;
    let temp = document.getElementById("achievement_template");
    let title = temp.content.querySelector(".achievement_right_title");
    let content = temp.content.querySelector(".achievement_right_content");

    for (let i = 0; i < achievementList.length; i++) {
      title.textContent = achievementList[i].title;
      content.textContent = achievementList[i].detail;
      let tempDiv = document.importNode(temp.content, true);
      achievementListDiv.appendChild(tempDiv);
    }
  } else {
    console.log("未登录");
    window.location.href = "../Login/Login.html";
  }
};

export let renderRanking = () => {
  getRanking();
  let rankingList = JSON.parse(sessionStorage.getItem("rankingList"));
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  let temp = document.getElementById("ranking_template");
  let rank_num = temp.content.querySelector(".rank_num");
  let rank_name = temp.content.querySelector(".rank_name");
  let rank_score = temp.content.querySelector(".rank_score");
  let rank_item = temp.content.querySelector(".rank_item");

  let rankingListDiv = document.querySelector(".rankingList_itemList");
  rankingListDiv.innerHTML = "";
  for (let i = 0; i < rankingList.length; i++) {
    rank_num.textContent = rankingList[i].order;
    rank_name.textContent = rankingList[i].username;
    rank_score.textContent = rankingList[i].grade;
    if (userInfo.uid == rankingList[i].uid) {
      console.log("userInfo.uid == rankingList[i].uid:", userInfo.uid);
      rank_item.style.borderLeft = "solid 5px";
    } else {
      rank_item.style.borderLeft = "none";
    }
    let tempDiv = document.importNode(temp.content, true);
    rankingListDiv.appendChild(tempDiv);
  }
};
