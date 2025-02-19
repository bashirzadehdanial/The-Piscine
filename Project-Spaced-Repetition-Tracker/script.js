import { getUserIds, getData, addData } from "./storage.js";

const today = new Date().toISOString().split("T")[0];

function sortRevisionDate(data) {
  return [...data].sort((a, b) => {
    let dateA = new Date(a.date.replace(/(st|nd|rd|th)/, ""));
    let dateB = new Date(b.date.replace(/(st|nd|rd|th)/, ""));
    return dateA - dateB;
  });
}

function userSelected() {
  let select = document.getElementById("user-drop-down");
  let userId = select.value;
  const data = getData(userId) || [];
  displayUserData(userId, data);
}

function displayUserData(id, data) {
  let resultBox = document.getElementById("result-box");
  const li = document.createElement("li");
  resultBox.innerHTML = "";

  if (!data || data.length < 1) {
    li.textContent = `The User ${id} is empty!`;
    resultBox.append(li);
    return;
  }

  li.textContent = `The agenda for User ${id} is shown, with the revision dates shown as follows:`;

  const sortedData = sortRevisionDate(data);

  const subUl = document.createElement("ul");
  sortedData.forEach((item) => {
    const subLi = document.createElement("li");
    subLi.textContent = `${item.topic}, ${item.date}`;
    subUl.append(subLi);
  });

  li.append(subUl);
  resultBox.append(li);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  let suffix = "th";
  if ([1, 21, 31].includes(day)) suffix = "st";
  else if ([2, 22].includes(day)) suffix = "nd";
  else if ([3, 23].includes(day)) suffix = "rd";

  return `${day}${suffix} ${month} ${year}`;
}

function submit(event) {
  event.preventDefault();

  let myForm = document.getElementById("agenda-form");
  let select = document.getElementById("user-drop-down");
  let userId = select.value;
  let agenda = myForm.elements["agenda"];
  let date = myForm.elements["datepicker"];

  if (!agenda.value.trim()) {
    alert("Agenda topic cannot be empty!");
    return;
  }

  const selectedDate = new Date(date.value);
  const oneWeek = new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const oneMonth = new Date(selectedDate);
  oneMonth.setMonth(selectedDate.getMonth() + 1);
  const threeMonth = new Date(selectedDate);
  threeMonth.setMonth(selectedDate.getMonth() + 3);
  const sixMonths = new Date(selectedDate);
  sixMonths.setMonth(selectedDate.getMonth() + 6);
  const oneYear = new Date(selectedDate);
  oneYear.setFullYear(selectedDate.getFullYear() + 1);

  let topics = [
    { topic: agenda.value, date: formatDate(oneWeek) },
    { topic: agenda.value, date: formatDate(oneMonth) },
    { topic: agenda.value, date: formatDate(threeMonth) },
    { topic: agenda.value, date: formatDate(sixMonths) },
    { topic: agenda.value, date: formatDate(oneYear) },
  ];

  addData(userId, topics);
  displayUserData(userId, getData(userId));

  agenda.value = "";
  date.value = today;
}

window.addEventListener("load", function () {
  const users = getUserIds();

  let selectElement = document.getElementById("user-drop-down");

  users.forEach((value) => {
    let option = document.createElement("option");
    option.innerHTML = "User " + value;
    option.value = value;
    selectElement.append(option);
  });
 

  let myForm = document.getElementById("agenda-form");
  
  selectElement.addEventListener("change", userSelected);
  myForm.elements["datepicker"].value = today;
  myForm.addEventListener("submit", submit);
});

export { userSelected, displayUserData, sortRevisionDate, formatDate, submit };
