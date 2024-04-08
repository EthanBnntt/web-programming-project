let errorMessages = {};

window.onload = function() {
    errorMessages = {
        "fullName": document.getElementById("fullNameError"),
        "email": document.getElementById("emailError"),
        "ssnNumber": document.getElementById("ssnNumberError"),
        "departure": document.getElementById("departureError"),
        "destination": document.getElementById("destinationError"),
        "departureDate": document.getElementById("departureDateError"),
        "returnDate": document.getElementById("returnDateError"),
        "lactoseIntolerance": document.getElementById("lactoseIntoleranceError"),
        "wendysLocationError": document.getElementById("wendysLocationError"),
        "cardNameError": document.getElementById("cardNameError"),
        "cardNumberError": document.getElementById("cardNumberError"),
        "expiryDateError": document.getElementById("expiryDateError"),
        "cvvError": document.getElementById("cvvError"),
    };
};

// https://en.wikipedia.org/wiki/Luhn_algorithm
function verify_credit_card(card_number) {
    let card_numbers = card_number.split("");
    
    let sum = 0, alternate = false;

    for (var i = card_numbers.length - 1; i >= 0; i--) {
        let digit = parseInt(card_numbers[i]);
        if (isNaN(digit)) continue;
        if (alternate) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        alternate = !alternate;
    }

    var remainder = sum % 10;

    return remainder == 0;
}

function handleFormSubmit(event) {
    event.preventDefault();

    let isValid = true;

    // Validate full name
    let fullName = document.getElementById("fullName").value;
    if (fullName === "") {
        errorMessages["fullName"].innerText = "Please enter your full name.";
        errorMessages["fullName"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["fullName"].classList.add("hidden");
    }

    // Validate email
    let email = document.getElementById("email").value;
    if (
        !email.includes("@") ||
        email.length < 3
    ) {
        errorMessages["email"].innerText = "Please enter a valid email address.";
        errorMessages["email"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["email"].classList.add("hidden");
    }

    // Validate ssn
    let ssnNumber = document.getElementById("ssnNumber").value;
    if (!(ssnNumber.length >= 9)) {
        errorMessages["ssnNumber"].innerText = "Please enter a valid SSN.";
        errorMessages["ssnNumber"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["ssnNumber"].classList.add("hidden");
    }

    // Validate departure
    let departure = document.getElementById("departure").value;
    if (departure === "") {
        errorMessages["departure"].innerText = "Please input a departure location.";
        errorMessages["departure"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["departure"].classList.add("hidden");
    }

    // Validate destination
    let destination = document.getElementById("destination").value;
    if (destination === "") {
        errorMessages["destination"].innerText = "Please input a destination location.";
        errorMessages["destination"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["destination"].classList.add("hidden");
    }

    // Validate departure date
    let departureDate = document.getElementById("departureDate").value;
    if (departureDate === "") {
        errorMessages["departureDate"].innerText = "Please input a departure date.";
        errorMessages["departureDate"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["departureDate"].classList.add("hidden");
    }

    // Validate return date
    let returnDate = document.getElementById("returnDate").value;
    if (returnDate === "") {
        errorMessages["returnDate"].innerText = "Please input a return date.";
        errorMessages["returnDate"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["returnDate"].classList.add("hidden");
    }

    // Make sure the return date is after the departure date
    if (new Date(departureDate).getTime() > new Date(returnDate).getTime()) {
        errorMessages["returnDate"].innerText = "Return date must be after departure date.";
        errorMessages["returnDate"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["returnDate"].classList.add("hidden");
    }
    
    // Validate lactose intolerance
    // We only let lactose intolerant people fly
    let lactoseIntolerance = document.getElementById("lactoseIntolerance").value;
    if (lactoseIntolerance === "no") {
        errorMessages["lactoseIntolerance"].innerText = "You must be lactose intolerant to fly.";
        errorMessages["lactoseIntolerance"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["lactoseIntolerance"].classList.add("hidden");
    }

    // Validate Wendy's location
    let wendysLocation = document.getElementById("wendysLocation").value;
    // TODO: Get all the wendy's locations
    if (wendysLocation === "") {
        errorMessages["wendysLocationError"].innerText = "Please select a Wendy's location.";
        errorMessages["wendysLocationError"].classList.remove("hidden");
        isValid = false;
    } else {
        //!errorMessages["wendysLocationError"].classList.add("hidden");
        errorMessages["wendysLocationError"].innerText = "TODO";
        errorMessages["wendysLocationError"].classList.remove("hidden");
    }
    
    // Validate the credit cards
    
    // Validate card name
    let cardName = document.getElementById("cardName").value;
    if (cardName === "") {
        errorMessages["cardNameError"].innerText = "Please enter the name on the card.";
        errorMessages["cardNameError"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["cardNameError"].classList.add("hidden");
    }

    // Validate card number
    let cardNumber = document.getElementById("cardNumber").value;
    if (cardNumber == '' || !verify_credit_card(cardNumber)) {
        errorMessages["cardNumberError"].innerText = "Please enter a valid card number.";
        errorMessages["cardNumberError"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["cardNumberError"].classList.add("hidden");
    }

    // Validate expiry date
    let expiryDate = document.getElementById("expiryDate").value;
    let currentDate = new Date();
    let expiryDateParts = expiryDate.split("/");
    let expiryMonth = parseInt(expiryDateParts[0]);
    let expiryYear = parseInt(expiryDateParts[1]) + 2000;
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    if (expiryDate == "") {
        errorMessages["expiryDateError"].innerText = "Please enter an expiry date.";
        errorMessages["expiryDateError"].classList.remove("hidden");
        isValid = false;
    } else if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        errorMessages["expiryDateError"].innerText = "Your card is expired.";
        errorMessages["expiryDateError"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["expiryDateError"].classList.add("hidden");
    }

    // Validate CVV
    let cvv = document.getElementById("cvv").value;
    if (cvv.length !== 3) {
        errorMessages["cvvError"].innerText = "Please enter a valid CVV.";
        errorMessages["cvvError"].classList.remove("hidden");
        isValid = false;
    } else {
        errorMessages["cvvError"].classList.add("hidden");
    }

    // If all fields are valid, do some stuff
    if (isValid) doStuff();
}
