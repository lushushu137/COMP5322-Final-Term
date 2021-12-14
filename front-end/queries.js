let loginAndRegister = function () {};
let getUserInfo = function () {};
export let getRanking = function () {
  let data = {};
  fetch("../back-end/getRanking.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((rankingList) => {
      // Mock
      rankingList = [
        {
          order: "1",
          username: "Chen Yufeng 1",
          grade: "1000",
        },
        {
          order: "2",
          username: "Chen Yufeng 2",
          grade: "800",
        },
      ];
      sessionStorage.setItem("rankingList", JSON.stringify(rankingList));
    })
    .catch((error) => {
      console.log("data:", data);
      console.log("Error:", error);
    });
};
export let addAchievement = function (aid) {
  let data = {
    aid: aid,
  };
  fetch("../back-end/addAchievement.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
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
    .then((response) => {
      console.log("response:", response);
    })
    .catch((error) => {
      console.log("data:", data);
      console.log("Error:", error);
    });
};
