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
      rankingList = [
        {
          order: "1",
          username: "Chen Yufeng 888",
          uid: "888",
          grade: "1000",
        },
        {
          order: "2",
          username: "Chen Yufeng 999",
          uid: "999",
          grade: "800",
        },
        { order: "3", uid: "233", username: "Chen Yufeng233", grade: "600" },
      ];
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
