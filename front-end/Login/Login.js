const form = document.forms[0];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  console.log(data);
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
      res = {
        status: "success",
        data: {
          uid: "233",
          username: "Chen Yufeng 233",
          isNew: "no",
          process: {
            score: "0",
            level: "0",
            target: "50",
          },
          acheivement: [],
        },
        info: "",
      };

      console.log("response:", res);
      if (res.status === "success") {
        sessionStorage.setItem("userInfo", JSON.stringify(res.data));

        window.location.href = "../Game/Game.html";
      } else {
        window.alert(res.info);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      window.location.href = "../Game/Game.html";
    });
});
