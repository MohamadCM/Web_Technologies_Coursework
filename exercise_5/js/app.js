const nameInput = document.getElementById('name');
const myModal = document.getElementById("myModal");
const closeButton = document.getElementById("close-btn");
const infoContainer = document.getElementById("info-container");
const INFO_PARAGRAPH_ID = 'info-paragraph';
const COUNTRY_TAG = "SKd"
let records = [];
openNamesdayXML();

function checkInputValue(value) {
  return value && value.length > 1;
}

// Checking if the name Value is valid after losing focus
nameInput.addEventListener('blur', () => {
  const value = nameInput.value;
  const isValid = checkInputValue(value);
  if (!isValid) {
    alert('Invalid value for name.')
    nameInput.value = '';
  }
});

//Generate data
function submitValues() {
  const date = new Date();
  const todayIndicator = document.getElementById("today-indicator");
  todayIndicator.innerHTML = `<span>` + "Today is " + date.toDateString() + "</span>";

  const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1);
  const day = date.getDate() < 10 ? '0' + date.getDay() : '' + date.getDate();
  const calendarDateString = month + day;

  let record = null;

  // Finding today's names
  for (let i = 0; i < records.length; i++) {
    if (records[i].getElementsByTagName("day")[0].textContent === calendarDateString) {
      record = records[i];
      break;
    }
  }

  const names = record.getElementsByTagName(COUNTRY_TAG)[0].textContent;
  infoContainer.innerHTML = `<p id={INFO_PARAGRAPH_ID}>` + "Today, the the following names are celeberated: " + names + "</p>";
  myModal.style.display = "block";

  // Finding entered name's date
  const selectedName = normalizeString(nameInput.value);
  let correspondingDate = null;
  for (let i = 0; i < records.length; i++) {
    if (records[i].getElementsByTagName(COUNTRY_TAG).length === 0) {
      continue;
    }

    const namesStringArray = normalizeString(records[i].getElementsByTagName(COUNTRY_TAG)[0].textContent);
    if (namesStringArray.includes(selectedName)) {
      correspondingDate = getDateName(records[i].getElementsByTagName("day")[0].textContent);
      break;
    }
  }

  infoContainer.appendChild(document.createElement("hr"));
  const dateShowerElement = document.createElement("span");
  dateShowerElement.innerHTML = correspondingDate !== null ?
    "Corresponding date for " + nameInput.value + " name is: " + correspondingDate
    : "No date found for " + nameInput.value;
  
  infoContainer.appendChild(dateShowerElement);
}

// Close the modal
closeButton.onclick = function () {
  myModal.style.display = "none";
  infoContainer.innerHTML = "";
}

function openNamesdayXML() {
  fetch('namesday.xml')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text(); // or response.xml() if you want it as an XML document
    })
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      records = xmlDoc.getElementsByTagName("record");
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}


function getDateName(dateString) {
  const monthNumber = parseInt(dateString[0] + dateString[1]);
  let monthName = null;
  switch (monthNumber) {
    case 1:
      monthName = "January";
      break;
    case 2:
      monthName = "February";
      break;
    case 3:
      monthName = "March";
      break;
    case 4:
      monthName = "April";
      break;
    case 5:
      monthName = "May";
      break;
    case 6:
      monthName = "June";
      break;
    case 7:
      monthName = "July";
      break;
    case 8:
      monthName = "August";
      break;
    case 9:
      monthName = "September";
      break;
    case 10:
      monthName = "October";
      break;
    case 11:
      monthName = "November";
      break;
    case 12:
      monthName = "December";
      break;
    default:
      monthName = "January";
      break;
  }

  const dayNumber = parseInt(dateString[2] + dateString[3]);
  let dayTag = "th";
  switch (parseInt(dateString[3])) {
    case 1:
      dayTag = "st";
      break;
    case 2:
      dayTag = "nd";
      break;
    case 3:
      dayTag = "rd";
      break
    default:
      dayTag = "th";
      break;
  }

  return monthName + ' ' + dayNumber + '' + dayTag;
}
