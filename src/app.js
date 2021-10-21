const CARD_NUMBER = document.querySelector("#cardNumber");
const CVC = document.querySelector("#cvc");
const AMOUNT = document.querySelector("#amount");
const FIRST_NAME = document.querySelector("#fname");
const LAST_NAME = document.querySelector("#lname");
const CITY = document.querySelector("#city");
const STATE = document.querySelector("#state");
const OPTION = document.querySelectorAll("option");
const POSTAL_CODE = document.querySelector("#code");

const WRONG = document.querySelector("#wrongalert");
const SUCCESS = document.querySelector("#successalert");

const SUBMIT = document.querySelector("#send");

let counter = 0;

window.onload = function() {};

SUBMIT.addEventListener("click", event => {
  event.preventDefault();
  if (
    FIRST_NAME.classList.contains("is-valid") &&
    LAST_NAME.classList.contains("is-valid") &&
    CARD_NUMBER.classList.contains("is-valid") &&
    CVC.classList.contains("is-valid") &&
    AMOUNT.classList.contains("is-valid") &&
    CITY.classList.contains("is-valid") &&
    STATE.classList.contains("is-valid") &&
    POSTAL_CODE.classList.contains("is-valid")
  ) {
    SUCCESS.classList.remove("d-none");
    SUCCESS.classList.add("d-block");
    WRONG.classList.remove("d-block");
    WRONG.classList.add("d-none");
  } else {
    WRONG.classList.remove("d-none");
    WRONG.classList.add("d-block");
    SUCCESS.classList.remove("d-block");
    SUCCESS.classList.add("d-none");
  }
});

FIRST_NAME.addEventListener("focusout", () => {
  isText(FIRST_NAME.value) ? isValid(FIRST_NAME) : isInValid(FIRST_NAME);
});

LAST_NAME.addEventListener("focusout", () => {
  isText(LAST_NAME.value) ? isValid(LAST_NAME) : isInValid(LAST_NAME);
});

CITY.addEventListener("focusout", () => {
  if (isText(CITY.value) && CITY.value.length >= 1) {
    isValid(CITY);
  } else {
    isInValid(CITY);
  }
});

let cityValues = [];
for (const cities in OPTION) {
  cityValues.push(OPTION[cities].value);
  console.log(cityValues);
}

STATE.addEventListener("focusout", () => {
  cityValues.some(city => city == STATE.value)
    ? isValid(STATE)
    : isInValid(STATE);
});

CVC.addEventListener("focusout", () => {
  if (CVC.value.length == 3 || CVC.value.length == 4) {
    isValid(CVC);
  } else {
    isInValid(CVC);
  }
});

AMOUNT.addEventListener("focusout", () => {
  if (AMOUNT.value <= 2000) {
    isValid(AMOUNT);
  } else {
    isInValid(AMOUNT);
  }
});

POSTAL_CODE.addEventListener("focusout", () => {
  if (POSTAL_CODE.value.length == 5) {
    isValid(POSTAL_CODE);
  } else {
    isInValid(POSTAL_CODE);
  }
});

CARD_NUMBER.addEventListener("focusout", () => {
  if (
    CARD_NUMBER.value.length >= 16 &&
    CARD_NUMBER.value.length <= 19 &&
    valid_credit_card(CARD_NUMBER.value)
  ) {
    isValid(CARD_NUMBER);
  } else {
    isInValid(CARD_NUMBER);
  }
});

const isValid = input => {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
};

const isInValid = input => {
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
};

const isText = text => {
  return /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/.test(text);
};

const isNumber = number => {
  return /^[0-9]/.test(number);
};

function valid_credit_card(CARD_NUMBER) {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(CARD_NUMBER)) return false;

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0,
    bEven = false;
  CARD_NUMBER = CARD_NUMBER.replace(/\D/g, "");

  for (var n = CARD_NUMBER.length - 1; n >= 0; n--) {
    var cDigit = CARD_NUMBER.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 == 0;
}
