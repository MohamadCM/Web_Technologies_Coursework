const dateInput = document.getElementById('custom-date');
const emailInput = document.getElementById('email');

const today = new Date();
const defaultDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;
dateInput.value = defaultDate;

dateInput.addEventListener('input', (e) => {
  let value = e.target.value;

  value = value.replace(/[^0-9.]/g, '');

  const parts = value.split('.');

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length > 1 && parts[i].startsWith('0')) {
      parts[i] = parts[i].replace(/^0/, '');
    }
  }

  const validParts = parts.slice(0, 3);
  value = validParts.join('.');

  e.target.value = value;
});

// Checking if the input date is valid after losing focus
dateInput.addEventListener('blur', () => {
  const value = dateInput.value;
  const parts = value.split('.');

  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const currentYear = new Date().getFullYear();

    // Check if year is between 1900 and the current year
    if (year < 1900 || year > currentYear) {
      alert('Year must be between 1900 and ' + currentYear + '.');
      dateInput.value = '';
      return;
    }

    const date = new Date(year, month, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      alert('Invalid date. Please enter a valid date in the format DD.MM.YYYY.');
      dateInput.value = '';
    }
  } else {
    alert('Invalid date format. Please use DD.MM.YYYY.');
    dateInput.value = '';
  }
});


// Checking email
emailInput.addEventListener('blur', () => {
  const value = emailInput.value;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value && value !== "") {
    if (!value.match(emailRegex)) {
      alert('Invalid email. Please enter an email in a valid format.');
      emailInput.value = '';
    }
  } else {
    dateInput.value = '';
  }
});

//Enable/disable address input
function toggleAddress(cb) {
  const checkbox = document.getElementById('enableAddress');
  const textarea = document.getElementById('address');
  console.log(textarea.value);
  if (textarea.value.includes('Number 32, 209312, Bratislava, SK')) {
    textarea.value = '';
  }

  textarea.disabled = !checkbox.checked;
}

function togglePrivacyLink() {
  const selectElement = document.getElementById('gender');
  const additionalLink = document.getElementById('additionalLink');

  if (selectElement.value === 'prefer_not_to_say' || selectElement) {
    additionalLink.style.display = 'block'; // Show the link
  } else {
    additionalLink.style.display = 'none'; // Hide the link
  }
}
