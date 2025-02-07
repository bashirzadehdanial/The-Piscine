// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules,
// you must serve the directory over HTTP (e.g. with https://www.npmjs.com/package/http-server).
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, addData } from "./storage.js";

const today = new Date().toISOString().split('T')[0];

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

  
  sortRevisionDate(data);

  const subUl = document.createElement("ul");

  data.forEach(function(item, index) {
    const subLi = document.createElement("li");
    subLi.textContent = item.topic + ", " + item.date;
    subUl.append(subLi);
  });

  li.append(subUl);
  resultBox.append(li);
}


function sortRevisionDate(data) {
  const sortedItems = data.sort((a, b) => {
    let dateA = a.date.replace(/(st|nd|rd|th)/, '');
    dateA = new Date(dateA);
    let dateB = b.date.replace(/(st|nd|rd|th)/, '');
    dateB = new Date(dateB);
    
    return dateA - dateB;
  });
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) suffix = 'st';
  else if (day === 2 || day === 22) suffix = 'nd';
  else if (day === 3 || day === 23) suffix = 'rd';

  return `${day}${suffix} ${month} ${year}`;
}

function submit(event) {
  event.preventDefault();

  let myForm = document.getElementById("agenda-form");
  let select = document.getElementById("user-drop-down");
  let userId = select.value;
  let agenda = myForm.elements['agenda'];
  let date = myForm.elements['datepicker'];

  const selectedDate = new Date(date.value);

  const oneWeek = new Date(selectedDate);
  oneWeek.setDate(selectedDate.getDate() + 7);

  const oneMonth = new Date(selectedDate);
  oneMonth.setMonth(selectedDate.getMonth() + 1);

  const threeMonth = new Date(selectedDate);
  threeMonth.setMonth(selectedDate.getMonth() + 3);

  const sixMonths = new Date(selectedDate);
  sixMonths.setMonth(selectedDate.getMonth() + 6);

  const oneYear = new Date(selectedDate);
  oneYear.setFullYear(selectedDate.getFullYear() + 1);

  let topics = [
    {"topic" : agenda.value, "date" : formatDate(oneWeek)}, 
    {"topic" : agenda.value, "date" : formatDate(oneMonth)}, 
    {"topic" : agenda.value, "date" : formatDate(threeMonth)}, 
    {"topic" : agenda.value, "date" : formatDate(sixMonths)}, 
    {"topic" : agenda.value, "date" : formatDate(oneYear)}, 
  ];

  addData(userId, topics);

  let retrieveData = getData(userId);


  displayUserData(userId, retrieveData);

  agenda.value = "";
  date.value = today;
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

  myForm.elements['datepicker'].value = today;

  myForm.addEventListener("submit", submit);
};
