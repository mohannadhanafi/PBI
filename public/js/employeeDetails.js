

const links = document.querySelectorAll('.tablink');
const singleBody = document.querySelectorAll('.singleBody');
const btnSave = document.querySelectorAll('.btn-save');
const pusrchaseBox = document.querySelectorAll('.pusrchaseBox');

const sendData = (form) => {
  const payment = [];
  pusrchaseBox.forEach((element) => {
    const pusrchaseBoxPayment = { id: element.id, paymentValue: element.value };
    payment.push(pusrchaseBoxPayment);
  });

  const holdData = {};
  holdData.payment = payment;
  const arr = Array.from(form.elements);
  arr.forEach((element) => {
    holdData[element.name] = element.value;
  });
  fetch('/employee', {
    method: 'PUT',
    body: JSON.stringify(holdData),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(result => result.json())
    .then((result) => {
      if (result.err) {
        return swal('', result.err, 'error');
      }
      return swal('', result.message, 'success').then(() => {
        window.location.href = `/employee/${holdData.id}`;
      });
    })
    .catch(err => swal('', err, 'error'));
};

const show = (event, divName) => {
  links.forEach((link) => {
    link.className = link.className.replace('tabActive', '');
  });
  singleBody.forEach((body) => {
    body.style.display = 'none';
  });
  document.getElementById(divName).style.display = 'block';
  event.currentTarget.className += ' tabActive';
};

const editBtn = document.querySelectorAll('.editbtn');
editBtn.forEach((item) => {
  item.addEventListener('click', (event) => {
    const divParent = event.target.parentElement;
    const elements = divParent.querySelectorAll('.input-field');
    const btnForSave = divParent.querySelector('.btn-save');
    const select = divParent.querySelectorAll('.status');
    elements.forEach((element) => {
      element.readOnly = false;
      element.className = element.className.replace('input-field', '');
      element.classList.add('input-field-editable');
    });
    select.forEach((element) => {
      element.disabled = false;
      element.classList.toggle('none');
      const span = element.parentElement.getElementsByTagName('span');
      span[0].classList.add('none');
    });
    btnForSave.classList.remove('none');
    event.target.classList.add('none');
  });
});

btnSave.forEach((item) => {
  item.addEventListener('click', (event) => {
    const divParent = event.target.parentElement;
    const elements = divParent.querySelectorAll('.input-field-editable');
    const btnEdit = divParent.querySelector('.editbtn');
    const form = divParent.querySelector('.form-update');

    const select = divParent.querySelectorAll('.status');
    elements.forEach((element) => {
      element.readOnly = true;
      element.className = element.className.replace('input-field-editable', '');
      element.classList.add('input-field');
    });
    select.forEach((element) => {
      element.disabled = true;
      element.classList.toggle('none');
      const valueOfOption = element.options[element.selectedIndex].text;
      const span = element.parentElement.getElementsByTagName('span');
      span[0].textContent = valueOfOption;
      span[0].classList.remove('none');
    });
    btnEdit.classList.remove('none');
    event.target.classList.add('none');
    sendData(form);
  });
});
