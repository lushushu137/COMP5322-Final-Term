import { mockUserData, mockRankingList } from "./mockData.js";

export let login = function (data) {
  fetch("../../back-end/Login/CheckLoginorRegister.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      // Mock the data
      res = mockUserData;
      res.data.username = data.username;
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
      // window.location.href = "../Game/Game.html";
    });
};

export let getRanking = function () {
  // Mock
  let rankingList = mockRankingList;
  sessionStorage.setItem("rankingList", JSON.stringify(rankingList));
  // fetch("../../back-end/Login/getRanking.php", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   // .then((res) => res.json())
  //   .then((rankingList) => {
  //     // Mock
  //     rankingList = mockRankingList;
  //     sessionStorage.setItem("rankingList", JSON.stringify(rankingList));
  //   })
  //   .catch((error) => {
  //     console.log("Error:", error);
  //   });
};
export let addAchievement = function (uid, aid) {
  let data = {
    uid: uid,
    aid: aid,
  };
  fetch("../../back-end/Login/addAchievement.php", {
    method: "GET",
    // body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    // .then((res) => res.json())
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
  fetch("../../back-end/Login/saveProcess.php", {
    method: "GET",
    // body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      // console.log("response:", response);
    })
    .catch((error) => {
      // console.log("data:", data);
      // console.log("Error:", error);
    });
};
