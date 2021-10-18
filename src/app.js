let cardNumber = document.querySelector("#cardNumber");
let cvc = document.querySelector("#cvc");
let amount = document.querySelector("#amount");
let firstName = document.querySelector("#fname");
let lastName = document.querySelector("#lname");
let city = document.querySelector("#city");
let state = document.querySelector("#state");
let cards = document.querySelector("#cards");
let alert1 = document.querySelector("#alert1");
let alert2 = document.querySelector("#alert2");
let submit = document.querySelector("#send");
let myPostalCode = document.querySelector("#code");

let counter = 0;

window.onload = function() {
  submit.addEventListener("click", () => {
    if (counter == 9) {
      isSuccess();
    } else {
      isFail();
    }
  });
};

function isSuccess() {
  alert2.style.display = "inline";
}

function isFail() {
  alert1.style.display = "inline";
}

firstName.addEventListener("focusout", () => {
  isText(firstName.value) ? isValid(firstName) : isInValid(firstName);
});

lastName.addEventListener("focusout", () => {
  isText(lastName.value) ? isValid(lastName) : isInValid(lastName);
});

city.addEventListener("focusout", () => {
  isText(city.value) ? isValid(city) : isInValid(city);
});

state.addEventListener("focusout", () => {
  isText(state.value) ? isValid(state) : isInValid(state);
});

cvc.addEventListener("focusout", () => {
  if (cvc.value.length == 3 || cvc.value.length == 4) {
    isValid(cvc);
  } else {
    isInValid(cvc);
  }
});

amount.addEventListener("focusout", () => {
  if (amount.value <= 20000) {
    isValid(amount);
  } else {
    isInValid(amount);
  }
});

myPostalCode.addEventListener("focusout", () => {
  if (myPostalCode.value.length == 5) {
    isValid(myPostalCode);
  } else {
    isInValid(myPostalCode);
  }
});

cardNumber.addEventListener("focusout", () => {
  if (
    cardNumber.value.length >= 16 &&
    cardNumber.value.length <= 19 &&
    valid_credit_card(cardNumber.value)
  ) {
    isValid(cardNumber);
  } else {
    isInValid(cardNumber);
  }
});

const isValid = input => {
  counter += 1;
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
};

const isInValid = input => {
  counter -= 1;
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
};

const isText = text => {
  return /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/.test(text);
};

const isNumber = number => {
  return /^[0-9]/.test(number);
};

function valid_credit_card(cardNumber) {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(cardNumber)) return false;

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0,
    bEven = false;
  cardNumber = cardNumber.replace(/\D/g, "");

  for (var n = cardNumber.length - 1; n >= 0; n--) {
    var cDigit = cardNumber.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 == 0;
}
