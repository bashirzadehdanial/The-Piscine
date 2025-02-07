// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, addData } from "./storage.js";

function userSelected() {
  let select = document.getElementById("user-drop-down");
  let userId = select.value;
  const data = getData(userId);
  displayUserData(userId, data);
}

function displayUserData(id, data) {
  let resultBox = document.getElementById("result-box");
  resultBox.innerHTML = "";

  const li = document.createElement("li");
  li.textContent = `The agenda for User ${id} is shown, with the revision dates shown as follows:`;

  if (data === null || data.length < 1) {
    li.textContent = `The User ${id} is empty!`;
    resultBox.append(li);
    return;
  }

  sortRevisionDate(data);

  const subUl = document.createElement("ul");
  data.forEach(function (item) {
    const subLi = document.createElement("li");
    subLi.textContent = item.topic + ", " + item.date;
    subUl.append(subLi);
  });

  li.append(subUl);
  resultBox.append(li);
}

function sortRevisionDate(data) {
  return data.sort((a, b) => {
    let dateA = a.date.replace(/(st|nd|rd|th)/, "");
    dateA = new Date(dateA);
    let dateB = b.date.replace(/(st|nd|rd|th)/, "");
    dateB = new Date(dateB);

    return dateA - dateB;
  });
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) suffix = "st";
  else if (day === 2 || day === 22) suffix = "nd";
  else if (day === 3 || day === 23) suffix = "rd";

  return `${day}${suffix} ${month} ${year}`;
}

window.onload = function () {
  const users = getUserIds();
  const data = getData(users[0]);
  let selectElement = document.getElementById("user-drop-down");

  users.forEach(function (value) {
    let option = document.createElement("option");
    option.innerHTML = "User " + value;
    option.value = value;
    selectElement.append(option);
  });

  selectElement.addEventListener("change", userSelected);
};
