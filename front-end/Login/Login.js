const form = document.forms[0];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  console.log(data);
  fetch("../back-end/Login.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("response:", response);
      let res = response.json();
      window.location.href = "../Game/Game.html";

      // if (res.status === "success") {
      //   window.location.href = "../Game/Game.html";
      // } else {
      //   window.alert("res.info");
      // }
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.log("Error:", error);
      window.location.href = "../Game/Game.html";
    });
});
