let rankingList = [
  {
    order: "1",
    username: "lushu1",
    grade: "10000",
  },
  {
    order: "2",
    username: "lushu2",
    grade: "8000",
  },
  {
    order: "3",
    username: "lushu3",
    grade: "5000",
  },
];
export let renderUser = () => {
  let userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    let parsedUserInfo = JSON.parse(userInfo);
    console.log(userInfo);
    let avatorDiv = document.querySelector("#avator");
    let userNameDiv = document.querySelector("#userName");

    userNameDiv.textContent = parsedUserInfo.username;
  } else {
    console.log("未登录");
    window.location.href = "../Login/Login.html";
  }
};

export let renderAchievements = () => {
  console.log("renderAchievements!!!");
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
  let temp = document.getElementById("ranking_template");
  let rank_num = temp.content.querySelector(".rank_num");
  let rank_name = temp.content.querySelector(".rank_name");
  let rank_score = temp.content.querySelector(".rank_score");
  let rankingListDiv = document.querySelector(".ranking");

  for (let i = 0; i < rankingList.length; i++) {
    rank_num.textContent = rankingList[i].order;
    rank_name.textContent = rankingList[i].username;
    rank_score.textContent = rankingList[i].grade;
    console.log(rankingList[i].order);
    let tempDiv = document.importNode(temp.content, true);
    console.log(tempDiv);
    rankingListDiv.appendChild(tempDiv);
  }
};
