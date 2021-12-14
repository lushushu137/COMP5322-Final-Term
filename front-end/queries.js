let loginAndRegister = function () {};
let getUserInfo = function () {};
let getRanking = function () {};
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
