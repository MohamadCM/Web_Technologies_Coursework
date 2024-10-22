const xValInput = document.getElementById('xval');
const yValInput = document.getElementById('yval');
const tableModal = document.getElementById("myModal");
const closeButton = document.getElementById("close-btn");
const tableContainer = document.getElementById("table-container");
const TABLE_ID = 'product-table'

// Checking if the input X Value is valid after losing focus
function checkInputValue(value) {
  if (value && !isNaN(value)) {
    const intVal = parseInt(value);
    return !(intVal < 1 || intVal > 9 || value.includes('.'));
  } else {
    return false;
  }
}

// Checking if the input X Value is valid after losing focus
xValInput.addEventListener('blur', () => {
  const value = xValInput.value;
  const isValid = checkInputValue(value);
  if (!isValid) {
    alert('Invalid value for X. it should be a valid Integer between 1 and 9.')
    xValInput.value = '';
  }
});

// Checking if the input Y Value is valid after losing focus
yValInput.addEventListener('blur', () => {
  const value = yValInput.value;
  const isValid = checkInputValue(value);
  if (!isValid) {
    alert('Invalid value for Y. it should be a valid Integer between 1 and 9.')
    yValInput.value = '';
  }
});

//generate table
function submitValues() {
  const xVal = xValInput.value;
  const yVal = yValInput.value;

  if(!xVal || !yVal || xVal==='' || yVal===''){
    alert('X and Y are required.')
    return;
  }

  tableModal.style.display = "block";
  const table = document.createElement('table');
  table.id = TABLE_ID;
  const thead = document.createElement('thead');
  const tBody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tBody);

  const trHead = document.createElement('tr');
  thead.appendChild(trHead);


  for (let i = 0; i <= xVal; i++) {
    const th = document.createElement('th');

    if (i === 0) {
      th.innerHTML = '#';
    } else {
      th.innerHTML = 'X = ' + i;
    }

    trHead.appendChild(th);
  }



  for (let i = 1; i <= yVal; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j <= xVal; j++) {
      const td = document.createElement('td');

      if (j === 0) {
        td.innerHTML = 'Y = ' + i;
      } else {
        td.innerHTML = '' + Math.pow(j, i);
      }

      tr.appendChild(td);
    }

    tBody.appendChild(tr)
  }

  tableContainer.appendChild(table);
}

// Close the modal
closeButton.onclick = function () {
  tableModal.style.display = "none";
  const table = document.getElementById(TABLE_ID);
  table.remove();
}
