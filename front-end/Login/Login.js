import { login } from "../queries.js";

const form = document.forms[0];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  login(data);
});
