import { mockUserData, rankingList } from "./mockData.js";

export let login = function (data) {
  fetch("../../back-end/Login/CheckLoginorRegister.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      // Mock the data
      res = mockUserData;
      if (res.status === "success") {
        sessionStorage.setItem("userInfo", JSON.stringify(res.data));
        window.location.href = "../Game/Game.html";
      } else {
        window.alert(res.info);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      // Test process
      window.location.href = "../Game/Game.html";
    });
};

export let getRanking = function () {
  fetch("../back-end/getRanking.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((rankingList) => {
      // Mock
      rankingList = rankingList;
      sessionStorage.setItem("rankingList", JSON.stringify(rankingList));
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
export let addAchievement = function (uid, aid) {
  let data = {
    uid: uid,
    aid: aid,
  };
  fetch("../back-end/addAchievement.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("response:", response);
    })
    .catch((error) => {
      console.log("data:", data);
      console.log("Error:", error);
    });
};
export let saveProcess = function (uid, process) {
  let data = {
    uid: uid,
    process: process,
  };
  fetch("../back-end/saveProcess.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("response:", response);
    })
    .catch((error) => {
      console.log("data:", data);
      console.log("Error:", error);
    });
};
