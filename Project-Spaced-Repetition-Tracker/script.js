// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, addData } from "./storage.js";

function userSelected() {
  let select = document.getElementById("user-drop-down");
  let resultBox = document.getElementById("result-box");
  let userId = select.value;
  const data = getData(userId);
  displayUserData(userId, data);
}

function displayUserData(id, data) {
  let resultBox = document.getElementById("result-box");  
  const li = document.createElement("li");
    resultBox.innerHTML = "";
    li.textContent = `The agenda for User ${id} is shown, with the revision dates shown as follows:`;
  if(data === null || data.length < 1) {
    li.textContent = `The User ${id} is empty!`;
    resultBox.append(li);
    return;
  }
}


window.onload = function () {
  const users = getUserIds();
  const data = getData(users[0]);
  let myForm = document.getElementById("agenda-form");
  let selectElement = document.getElementById("user-drop-down");
  users.forEach(function(value) {
    let option = document.createElement("option");
    option.innerHTML = "User " + value;
    option.value = value;
    selectElement.append(option);
  });
  selectElement.addEventListener("change", userSelected);
};
