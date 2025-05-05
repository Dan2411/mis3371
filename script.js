/* 
    Name: Hoang Dang Pham
    File: script.js
    Date Created: 02/09/2025
    Date Updated: 05/04/2025
    Purpose: Update the js file with functions for local storage set up, detect caps lock for password field and
    also logic for hide/show password field for the extra credit assignment
*/
// Function to update the date
function updateDate() {
    const dateElement = document.getElementById("clock"); // Use the same element
    const now = new Date();

    // Format date as MM/DD/YYYY
    let month = now.getMonth() + 1; // Months are 0-based
    let day = now.getDate();
    let year = now.getFullYear();

    let formattedDate = `${month}/${day}/${year}`;
    dateElement.textContent = "Current Date: " + formattedDate;
}

// Call the function once to display the date immediately
updateDate();

// Store the validation results for each field
let validationStatus = {
    firstName: false,
    middleInitial: true, // optional by default
    lastName: false,
    dob: false,
    ssn: false,
    phone: false,
    address1: false,
    address2: false,
    city: false,
    state: false,
    zip: false,
    email: false,
    symptoms: true, // optional by default
    diseases: true, // optional by default
    gender: false,
    vaccinated: false,
    insurance: false,
    health: true, // have initial value of 5
    username: false,
    password: false,
    confirmPassword: false
};

// Function to validate first name
function validateFirstName() {
    let firstNameInput = document.getElementById("firstName");
    let firstNameStatus = document.getElementById("firstName-status");
    let firstNameValue = firstNameInput.value;
    let firstNamePattern = /^[A-Za-z'-]{1,30}$/;

    if (!firstNamePattern.test(firstNameValue)) {
        firstNameInput.style.borderColor = "red";
        firstNameStatus.textContent = "❌ Invalid. Use only letters, apostrophes, and dashes (1–30 characters).";
        validationStatus.firstName = false;
        return;
    }
    else {
        firstNameInput.style.borderColor = ""; // Reset border
        firstNameStatus.textContent = ""; // Clear error message
        validationStatus.firstName = true;
    }
}

//Function to validate middle initial
function validateMiddleInitial() {
    let middleInitialInput = document.getElementById("middleInitial");
    let middleInitialStatus = document.getElementById("middleInitial-status");
    let middleInitialValue = middleInitialInput.value;
    let middleInitialPattern = /^[A-Za-z]$/;

    if (middleInitialValue === "") {
        // Blank/null is valid
        middleInitialInput.style.borderColor = "";
        middleInitialStatus.textContent = "";
        validationStatus.middleInitial = true
    } else if (!middleInitialPattern.test(middleInitialValue)) {
        // Not valid: show error
        middleInitialInput.style.borderColor = "red";
        middleInitialStatus.textContent = "❌ Invalid. Use only 1 letter or leave it blank.";
        validationStatus.middleInitial = false;
    } else {
        // Valid: clear error
        middleInitialInput.style.borderColor = "";
        middleInitialStatus.textContent = "";
        validationStatus.middleInitial = true;
    }
}

// Function to validate last name
function validateLastName() {
    let lastNameInput = document.getElementById("lastName");
    let lastNameStatus = document.getElementById("lastName-status");
    let lastNameValue = lastNameInput.value;
    let lastNamePattern = /^[A-Za-z'-]{1,30}$/;

    if (!lastNamePattern.test(lastNameValue)) {
        lastNameInput.style.borderColor = "red";
        lastNameStatus.textContent = "❌ Invalid. Use only letters, apostrophes, and dashes (1–30 characters).";
        validationStatus.lastName = false
        return;
    }
    else {
        lastNameInput.style.borderColor = ""; // Reset border
        lastNameStatus.textContent = ""; // Clear error message
        validationStatus.lastName = true
    }
}

// Function to set min/max values for Date of Birth dynamically
function validateDOB() {
    let dobInput = document.getElementById("dob");
    let dobStatus = document.getElementById("dob-status");
    let dobValue = dobInput.value;

    // Validate if input is in MM/DD/YYYY format using regular expression
    let dobPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;

    if (!dobPattern.test(dobValue)) {
        dobInput.style.borderColor = "red";
        dobStatus.textContent = "❌ Invalid date format. Please use MM/DD/YYYY.";
        validationStatus.dob = false;
        return;
    }

    // Parse the date input into a Date object
    let dob = new Date(dobValue);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    let month = today.getMonth() - dob.getMonth();
    
    // If the birthday hasn't occurred yet this year, subtract one from the age
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    // Check if the date is in the future or older than 120 years
    if (dob > today) {
        dobInput.style.borderColor = "red";
        dobStatus.textContent = "❌ Date of birth cannot be in the future.";
        validationStatus.dob = false;
    } else if (age > 120) {
        dobInput.style.borderColor = "red";
        dobStatus.textContent = "❌ You cannot be more than 120 years old.";
        validationStatus.dob = false;
    } else {
        dobInput.style.borderColor = ""; // Reset border
        dobStatus.textContent = ""; // Clear error message
        validationStatus.dob = true;
    }
}

// Function to auto-format date of birth (MM/DD/YYYY)
document.getElementById("dob").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 2 && value.length <= 4) {
        value = value.slice(0, 2) + "/" + value.slice(2);
    } else if (value.length > 4) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
    }
    e.target.value = value;
});

// Function to validate and auto-format SSN (XXX-XX-XXXX)
function validateSSN() {
    const ssnInput = document.getElementById("ssn");
    const ssnErrorNonNumeric = document.getElementById("ssn-error-nonnumeric");
    const ssnErrorLength = document.getElementById("ssn-error-length");
    const rawValue = ssnInput.value.replace(/-/g, "");

    // Check for non-digit (excluding dash)
    if (/[^0-9-]/.test(rawValue)) {
        ssnInput.style.borderColor = "red";
        ssnErrorNonNumeric.textContent = "❌ SSN can only contain numbers and dashes.";
        validationStatus.ssn = false;
    } else {
        ssnErrorNonNumeric.textContent = "";
    }

    // Remove all non-digits for formatting and counting
    const digitsOnly = rawValue.slice(0, 9);

    // Show error if not exactly 9 digits
    if (digitsOnly.length !== 9) {
        ssnInput.style.borderColor = "red";
        ssnErrorLength.textContent = "❌ SSN must be exactly 9 digits.";
        validationStatus.ssn = false;
    } else {
        ssnErrorLength.textContent = "";
    }

    // Auto-format SSN: XXX-XX-XXXX
    let formatted = digitsOnly;
    if (digitsOnly.length > 3 && digitsOnly.length <= 5) {
        formatted = digitsOnly.slice(0, 3) + "-" + digitsOnly.slice(3);
    } else if (digitsOnly.length > 5) {
        formatted = digitsOnly.slice(0, 3) + "-" + digitsOnly.slice(3, 5) + "-" + digitsOnly.slice(5, 9);
    }
    ssnInput.value = formatted;

    // Reset border color only if both validations are cleared
    if (ssnErrorNonNumeric.textContent === "" && ssnErrorLength.textContent === "") {
        ssnInput.style.borderColor = "";
        validationStatus.ssn = true;
    }
};

// Function to validate and auto-format phone number (000-000-0000)
function validatePhone(){
    const phoneInput = document.getElementById("phone");
    const phoneErrorNonNumeric = document.getElementById("phone-error-nonnumeric");
    const phoneErrorLength = document.getElementById("phone-error-length");
    const rawValue = phoneInput.value.replace(/-/g, "");

    // Check for non-digit (excluding dash)
    if (/[^0-9-]/.test(phoneInput.value)) {
        phoneInput.style.borderColor = "red";
        phoneErrorNonNumeric.textContent = "❌ Phone number can only contain numbers and dashes.";
        validationStatus.phone = false;
    } else {
        phoneErrorNonNumeric.textContent = "";
    }

    // Keep only the first 10 digits
    const digitsOnly = rawValue.slice(0, 10);

    // Show error if not exactly 10 digits
    if (digitsOnly.length !== 10) {
        phoneInput.style.borderColor = "red";
        phoneErrorLength.textContent = "❌ Phone number must be exactly 10 digits.";
        validationStatus.phone = false;
    } else {
        phoneErrorLength.textContent = "";
    }

    // Auto-format Phone: 000-000-0000
    let formatted = digitsOnly;
    if (digitsOnly.length > 3 && digitsOnly.length <= 6) {
        formatted = digitsOnly.slice(0, 3) + "-" + digitsOnly.slice(3);
    } else if (digitsOnly.length > 6) {
        formatted = digitsOnly.slice(0, 3) + "-" + digitsOnly.slice(3, 6) + "-" + digitsOnly.slice(6, 10);
    }
    phoneInput.value = formatted;

    // Reset border color only if both validations are cleared
    if (phoneErrorNonNumeric.textContent === "" && phoneErrorLength.textContent === "") {
        phoneInput.style.borderColor = "";
        validationStatus.phone = true;
    }
}

//Function to validate address line 1
function validateAddress1() {
    const addressInput = document.getElementById("address1");
    const addressStatus = document.getElementById("address1-status");
    const value = addressInput.value.trim();

    if (value.length < 2) {
        addressInput.style.borderColor = "red"; 
        addressStatus.textContent = "❌ Address 1 must be from 2 to 30 characters.";
        validationStatus.address1 = false;
    } else {
        addressInput.style.borderColor = "";
        addressStatus.textContent = "";
        validationStatus.address1 = true;
    }
}

//Function to validate address line 2
function validateAddress2() {
    const addressInput = document.getElementById("address2");
    const addressStatus = document.getElementById("address2-status");
    const value = addressInput.value.trim();

    // Only validate if input is not empty
    if (value === "") {
        addressInput.style.borderColor = "";
        addressStatus.textContent = "";
        validationStatus.address2 = true;
    } else if (value.length < 2) {
        addressInput.style.borderColor = "red";
        addressStatus.textContent = "❌ Optional, but if entered, address 2 must be from 2 to 30 characters.";
        validationStatus.address2= false;
    } else {
        addressInput.style.borderColor = "";
        addressStatus.textContent = "";
        validationStatus.address2 = true;
    }
}

//Function to validate city
function validateCity() {
    const cityInput = document.getElementById("city");
    const cityStatus = document.getElementById("city-status");
    const value = cityInput.value.trim();

    if (value.length < 2) {
        cityInput.style.borderColor = "red";
        cityStatus.textContent = "❌ City must be from 2 to 30 characters.";
        validationStatus.city = false;
    } else {
        cityInput.style.borderColor = "";
        cityStatus.textContent = "";
        validationStatus.city = true;
    }
}

//Function to validate state
function validateState() {
    const stateSelect = document.getElementById("state");
    const stateStatus = document.getElementById("state-status");

    if (stateSelect.value === "") {
        stateStatus.textContent = "❌ Please select a state.";
        stateSelect.style.borderColor = "red";
        validationStatus.state = false;
    } else {
        stateStatus.textContent = ""; // Clear the message if valid
        stateSelect.style.borderColor = "";
        validationStatus.state = true;
    }
}

// Function to check zip code and truncate it if need
function formatZip() {
    let zipInput = document.getElementById("zip");
    let zipStatus = document.getElementById("zip-status");

    // Remove any non-numeric characters except the hyphen (-)
    zipInput.value = zipInput.value.replace(/[^0-9-]/g, '');

    // Ensure ZIP follows correct format: XXXXX or XXXXX-XXXX
    let zipPattern = /^\d{5}(-\d{0,4})?$/;
    if (!zipPattern.test(zipInput.value)) {
        zipInput.style.borderColor = "red";
        zipStatus.textContent = "❌ ZIP must be 5 digits or more";
        validationStatus.zip = false;
    } else {
        zipInput.style.borderColor = ""; // Reset border color
        zipStatus.textContent = ""; // Remove error message when valid
        validationStatus.zip = true;
    }
}

function truncateZip() {
    let zipInput = document.getElementById("zip");
    let zipStatus = document.getElementById("zip-status");

    // If it contains a hyphen (ZIP+4), truncate to just the first 5 digits
    if (zipInput.value.includes('-')) {
        zipInput.value = zipInput.value.split('-')[0];
    }

    // Ensure it still meets the required length
    if (zipInput.value.length !== 5) {
        zipInput.style.borderColor = "red";
        zipStatus.textContent = "❌ ZIP must be 5 digits or more";
        validationStatus.zip = false;
    } else {
        zipInput.style.borderColor = ""; // Reset border
        zipStatus.textContent = ""; // Clear error message
        validationStatus.zip = true;
    }
}

// Function to check email format
function validateEmail() {
    let emailInput = document.getElementById("email");
    let emailStatus = document.getElementById("email-status");

    // Regular expression for valid email format
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailInput.value)) {
        emailInput.style.borderColor = "red";
        emailStatus.textContent = "❌ Invalid email format";
        validationStatus.email = false;
    } else {
        emailInput.style.borderColor = ""; // Reset border
        emailStatus.textContent = ""; // Clear message
        validationStatus.email = true;
    }
}

// Convert username to lowercase when the user leaves the input field
function formatEmail() {
    let emailInput = document.getElementById("email");
    emailInput.value = emailInput.value.toLowerCase();
}

//Function to validate gender
function validateGender() {
    const genderOptions = document.getElementsByName("gender");
    const genderStatus = document.getElementById("gender-status");

    let selected = false;
    for (let option of genderOptions) {
        if (option.checked) {
            selected = true;
            break;
        }
    }

    if (!selected) {
        genderStatus.textContent = "❌ Please select one.";  // Show error if nothing selected
        genderStatus.style.color = "red";
        validationStatus.gender = false;
    } else {
        genderStatus.textContent = "";  // Clear the error if a selection is made
        validationStatus.gender = true;
    }
}

//Function to validate vaccination
function validateVaccinated() {
    const vaccinatedOptions = document.getElementsByName("vaccinated");
    const vaccinatedStatus = document.getElementById("vaccinated-status");

    let selected = false;
    for (let option of vaccinatedOptions) {
        if (option.checked) {
            selected = true;
            break;
        }
    }

    if (!selected) {
        vaccinatedStatus.textContent = "❌ Please select one.";  // Show error if nothing selected
        vaccinatedStatus.style.color = "red";
        validationStatus.vaccinated = false;
    } else {
        vaccinatedStatus.textContent = "";  // Clear the error if a selection is made
        validationStatus.vaccinated = true;
    }
}

//Function to validate insurance
function validateInsurance() {
    const insuranceOptions = document.getElementsByName("insurance");
    const insuranceStatus = document.getElementById("insurance-status");

    let selected = false;
    for (let option of insuranceOptions) {
        if (option.checked) {
            selected = true;
            break;
        }
    }

    if (!selected) {
        insuranceStatus.textContent = "❌ Please select one.";  // Show error if nothing selected
        insuranceStatus.style.color = "red";
        validationStatus.insurance = false;
    } else {
        insuranceStatus.textContent = "";  // Clear the error if a selection is made
        validationStatus.insurance = true;
    }
}

function updateHealthValue() {
    const healthSlider = document.getElementById("health");
    const healthValue = document.getElementById("health-value");

    const sliderRect = healthSlider.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    const min = parseInt(healthSlider.min);
    const max = parseInt(healthSlider.max);
    const value = parseInt(healthSlider.value);

    const thumbWidth = 20;
    const valuePosition = ((value - min) / (max - min)) * (sliderWidth - thumbWidth);

    healthValue.style.left = `${valuePosition + thumbWidth / 2}px`;
    healthValue.textContent = value;
}

//Function to check username status
function validateUsername() {
    let usernameInput = document.getElementById("username");
    let usernameStatus = document.getElementById("username-status");
    let usernamePattern = /^[A-Za-z][A-Za-z0-9_-]{4,29}$/;

    if (!usernamePattern.test(usernameInput.value)) {
        usernameInput.style.borderColor = "red";
        usernameStatus.textContent = "❌ Username must be 5-30 characters, start with a letter, and only contain letters, numbers, underscores, or dashes (no spaces).";
        validationStatus.username = false;
    } else {
        usernameInput.style.borderColor = ""; // Reset border
        usernameStatus.textContent = ""; // Clear message
        validationStatus.username = true;
    }
}

// Convert username to lowercase when the user leaves the input field
function formatUsername() {
    let usernameInput = document.getElementById("username");
    usernameInput.value = usernameInput.value.toLowerCase();
}

// Function to validate password and update checklist
function validatePassword() {
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value.toLowerCase();
    let passwordStatus = document.getElementById("password-status");

    // Regular expression for password validation
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_+=\/><.,`~])[A-Za-z\d!@#%^&*()\-_+=\/><.,`~]{8,30}$/;

    let isValid = true;
    let errorMessage = '';

    // Validation conditions
    let lengthValid = password.length >= 8 && password.length <= 30;
    let uppercaseValid = /[A-Z]/.test(password);
    let lowercaseValid = /[a-z]/.test(password);
    let numberValid = /\d/.test(password);
    let specialValid = /[!@#%^&*()\-_+=\/><.,`~]/.test(password);
    let usernameValid = username.length >= 5 && username.length <= 30 && password.toLowerCase() !== username.toLowerCase();

    // Update checklist
    updateChecklistItem("length-check", lengthValid);
    updateChecklistItem("uppercase-check", uppercaseValid);
    updateChecklistItem("lowercase-check", lowercaseValid);
    updateChecklistItem("number-check", numberValid);
    updateChecklistItem("special-check", specialValid);
    updateChecklistItem("username-check", usernameValid);

    // Final validation check
    if (!lengthValid || !uppercaseValid || !lowercaseValid || !numberValid || !specialValid || !usernameValid) {
        isValid = false;
        errorMessage = "Password must meet all criteria.";
    }

    // Provide feedback
    if (isValid) {
        passwordStatus.innerHTML = "✔ Strong Password";
        passwordStatus.className = "valid";
        validationStatus.password = true;
    } else {
        passwordStatus.innerHTML = "✘ " + errorMessage;
        passwordStatus.className = "invalid";
        validationStatus.password = false;
    }

    checkPasswordMatch(); // Ensure passwords match as well
}

// Function to update checklist items dynamically
function updateChecklistItem(itemId, isValid) {
    let item = document.getElementById(itemId);
    if (isValid) {
        item.innerHTML = "✅ " + item.textContent.slice(2);
        item.classList.add("valid");
    } else {
        item.innerHTML = "❌ " + item.textContent.slice(2);
        item.classList.remove("valid");
    }
}

// Function to check if passwords match
function checkPasswordMatch() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let confirmPasswordStatus = document.getElementById("confirmPassword-status");

    if (confirmPassword === password && password.length > 0) {
        confirmPasswordStatus.innerHTML = "✔ Passwords match";
        confirmPasswordStatus.className = "valid";
        validationStatus.confirmPassword = true;
    } else {
        confirmPasswordStatus.innerHTML = "✘ Passwords do not match";
        confirmPasswordStatus.className = "invalid";
        validationStatus.confirmPassword = false;
    }
}


// Function to handle show/hide password field
function toggleVisibility(fieldId, icon) {
    const input = document.getElementById(fieldId);
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icon.textContent = isPassword ? "🙈" : "👁️"; // open/closed eye
  }

// Function to warn if caps lock is on for password/confirm password field
function setupCapsLockWarning(inputId, warningId) {
    const input = document.getElementById(inputId);
    const warning = document.getElementById(warningId);

    input.addEventListener("keyup", function (e) {
        const isCaps = e.getModifierState && e.getModifierState("CapsLock");
        warning.textContent = isCaps ? "⚠️ Caps Lock is ON" : "";
    });

    // Optional: hide warning on blur
    input.addEventListener("blur", () => {
        warning.textContent = "";
    });
}

// Run setup for both fields
setupCapsLockWarning("password", "caps-warning");
setupCapsLockWarning("confirmPassword", "confirm-caps-warning");

// Function to handle the review pop up data table
function reviewData() {
    const submitError = document.getElementById("submit-error");
    submitError.textContent = ""; // Clear error message (we're allowing the modal)

    const modalBody = document.getElementById("modal-review-body");
    modalBody.innerHTML = ""; // Clear previous

    const get = id => document.getElementById(id)?.value || "<i>No input</i>";
    const getRadio = name => document.querySelector(`input[name="${name}"]:checked`)?.value || "<i>No input</i>";

    const diseases = [
        { id: "chickenPox", label: "Chicken Pox" },
        { id: "measles", label: "Measles" },
        { id: "covid", label: "Covid-19" },
        { id: "smallPox", label: "Small Pox" },
        { id: "tetanus", label: "Tetanus" },
    ];

    let selectedDiseases = diseases
        .filter(d => document.getElementById(d.id).checked)
        .map(d => d.label)
        .join(', ') || "<i>No input</i>";

    const reviewItems = [
        { label: "First name", value: get("firstName"), valid: validationStatus.firstName },
        { label: "Middle initial", value: get("middleInitial"), valid: validationStatus.middleInitial },
        { label: "Last name", value: get("lastName"), valid: validationStatus.lastName },
        { label: "Date of Birth", value: get("dob"), valid: validationStatus.dob },
        { label: "Phone Number", value: get("phone"), valid: validationStatus.phone },
        { label: "Address Line 1", value: get("address1"), valid: validationStatus.address1 },
        { label: "Address Line 2", value: get("address2"), valid: validationStatus.address2 },
        { label: "City", value: get("city"), valid: validationStatus.city },
        { label: "State", value: get("state"), valid: validationStatus.state },
        { label: "Zip Code", value: get("zip"), valid: validationStatus.zip },
        { label: "Email", value: get("email"), valid: validationStatus.email },
        { label: "Past Diseases", value: selectedDiseases, valid: true },
        { label: "Gender", value: getRadio("gender"), valid: validationStatus.gender },
        { label: "Vaccinated", value: getRadio("vaccinated"), valid: validationStatus.vaccinated },
        { label: "Insurance", value: getRadio("insurance"), valid: validationStatus.insurance },
        { label: "Health Status", value: get("health"), valid: true },
        { label: "Username", value: get("username"), valid: validationStatus.username },
        { label: "Password", value: "**********", valid: validationStatus.password },
        { label: "Confirm Password", value: "**********", valid: validationStatus.confirmPassword }

    ];

    reviewItems.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${item.label}</strong></td>
            <td>${item.value}</td>
            <td style="color: ${item.valid ? "green" : "red"}">${item.valid ? "✅ Valid" : "❌ Invalid"}</td>
        `;
        modalBody.appendChild(row);
    });

    document.getElementById("reviewModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

//
function closeReviewModal() {
    document.getElementById("reviewModal").style.display = "none";
    document.body.style.overflow = "";
    const warningSpan = document.getElementById("review-warning");
    warningSpan.textContent = "";
}

function submitFormFinal() {
    const warningSpan = document.getElementById("review-warning");

    if (!Object.values(validationStatus).includes(false)) {
        // If user checked "Remember Me", store cookie
        if (document.getElementById("rememberMe").checked) {
            setFirstNameCookie(document.getElementById("firstName").value);
        }
        warningSpan.textContent = ""; // Clear message if everything is valid
        window.location.href = "thankyou.html";
    } else {
        warningSpan.textContent = "❌ Some of your input is invalid. Click 'Go Back' and double-check.";
    }
}
//

function addReviewItem(label, value, isValid = true) {
  const tableBody = document.getElementById('review-list');

  const row = document.createElement('tr');

  const labelCell = document.createElement('td');
  labelCell.textContent = label;

  const valueCell = document.createElement('td');
  valueCell.textContent = value;

  const validationCell = document.createElement('td');
  validationCell.textContent = isValid ? '✅' : '❌';
  validationCell.style.color = isValid ? 'green' : 'red';

  row.appendChild(labelCell);
  row.appendChild(valueCell);
  row.appendChild(validationCell);

  tableBody.appendChild(row);
}

//Function to handle reset button with the review data table
const form = document.getElementById("registrationForm");

form.addEventListener("reset", function () {
    // Reset validation messages
    document.querySelectorAll("span[id$='-status']").forEach(span => {
        span.textContent = "";
    });

    // Reset border colors
    form.querySelectorAll("input, select").forEach(input => {
        input.style.borderColor = "";
    });

    // Reset validationStatus flags
    validationStatus = {
        firstName: false,
        middleInitial: true, // optional by default
        lastName: false,
        dob: false,
        ssn: false,
        phone: false,
        address1: false,
        address2: false,
        city: false,
        state: false,
        zip: false,
        email: false,
        symptoms: true, // optional by default
        diseases: true, // optional by default
        gender: false,
        vaccinated: false,
        insurance: false,
        health: true, // have initial value of 5
        username: false,
        password: false,
        confirmPassword: false
    };
});

//Function to validate all the data input in the form one more time when click submit
function validateForm(redirect = true) {
    // Run all individual validation functions
    validateFirstName();
    validateMiddleInitial();
    validateLastName();
    validateDOB();
    validateSSN();
    validatePhone();
    validateAddress1();
    validateAddress2();
    validateCity();
    validateState();
    truncateZip();
    validateEmail();
    validateGender();
    validateVaccinated();
    validateInsurance();
    validatePassword();
    validateUsername();
    checkPasswordMatch();

    const submitError = document.getElementById("submit-error");
    const rememberMe = document.getElementById("rememberMe").checked;

    // Check overall validation status
    const hasError = Object.values(validationStatus).includes(false);

    if (hasError) {
        submitError.textContent = "❌ Please correct the errors above before submitting.";
    }else{
        submitError.textContent = ""; // Clear any previous error message
        if (rememberMe){
            setFirstNameCookie(document.getElementById("firstName").value);
        }
        if (redirect) {
            window.location.href = "thankyou.html";
        }
    }
}

//Cookie setup
function setFirstNameCookie(firstName) {
    const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toUTCString(); // 48 hours expiration
    document.cookie = `firstName=${encodeURIComponent(firstName)}; expires=${expires}; path=/`;
}

function getFirstNameCookie() {
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
        const [key, val] = c.split("=");
        if (key === "firstName") return decodeURIComponent(val);
    }
    return "";
}

function deleteFirstNameCookie() {
    document.cookie = "firstName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

//Hanlde welcome back user and switch user logic
document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const switchUser = document.getElementById("switchUser");
    const firstNameInput = document.getElementById("firstName");
    const resumePrompt = document.getElementById("resumePrompt");
    const resumeCheckbox = document.getElementById("resumeCheckbox");
    const savedName = getFirstNameCookie();

    if (savedName) {
        welcomeMessage.textContent = `👋 Welcome back, ${savedName}!`;
        switchUser.textContent = `Not ${savedName}? Click HERE to start as a NEW USER.`;
        switchUser.style.display = "block";
        firstNameInput.value = savedName;

        // Show resume prompt if localStorage data exists
        if (localStorage.getItem("formData")) {
            resumePrompt.style.display = "block";
        }

        // Load form if checkbox is checked
        resumeCheckbox.addEventListener("change", () => {
            if (resumeCheckbox.checked) {
                loadFormFromLocalStorage();
            } else {
                form.reset();
                validatePassword();
                updateHealthValue();
                validateGender();
                validateVaccinated();
                validateInsurance();
                document.querySelectorAll("span[id$='-status'], #submit-error").forEach(span => {
                    const id = span.id;
                    if (id === "gender-status" || id === "vaccinated-status" || id === "insurance-status") {
                        return; // Skip clearing this span
                    }
                    span.textContent = "";
                });
        
                form.querySelectorAll("input, select, textarea").forEach(el => {
                    el.style.borderColor = "";
                });
            }
        });
    } else {
        welcomeMessage.textContent = "👋 Welcome, new user!";
        switchUser.textContent = "";
        switchUser.style.display = "none";
        resumePrompt.style.display = "none";
    }

    // Handle user switch
    switchUser.addEventListener("click", function () {
        deleteFirstNameCookie();
        form.reset();
        localStorage.removeItem("formData"); // Clear localStorage
        welcomeMessage.textContent = "👋 Welcome, new user!";
        switchUser.textContent = "";
        switchUser.style.display = "none";
        resumePrompt.style.display = "none";
        firstNameInput.value = "";

        // Clear validation messages (except the required radio spans)
        document.querySelectorAll("span[id$='-status'], #submit-error").forEach(span => {
            const id = span.id;
            if (id === "gender-status" || id === "vaccinated-status" || id === "insurance-status") return;
            span.textContent = "";
        });

        // Reset input borders
        form.querySelectorAll("input, select, textarea").forEach(el => {
            el.style.borderColor = "";
        });

        // Restore ❌ messages for radio and password fields
        validatePassword();
        validateGender();
        validateVaccinated();
        validateInsurance();
        updateHealthValue(); // ensure slider value is refreshed
    });
    
});


// Store all current form values in localStorage
function saveFormToLocalStorage() {
    const formData = {};
    const form = document.getElementById("registrationForm");
    Array.from(form.elements).forEach(el => {
        if (el.type === "submit" || el.type === "reset" || el.type === "button") return;

        if (el.type === "radio") {
            if (el.checked) {
                formData[el.name] = el.value; // radios grouped by name
            }
        } else if (el.type === "checkbox") {
            if (el.id) formData[el.id] = el.checked;
        } else if (el.id) {
            formData[el.id] = el.value;
        }
    });
    localStorage.setItem("formData", JSON.stringify(formData));
}

// Restore form from localStorage
function loadFormFromLocalStorage() {
    const saved = JSON.parse(localStorage.getItem("formData") || "{}");

    for (let key in saved) {
        const value = saved[key];

        // Handle radio groups by name
        const radioGroup = document.querySelectorAll(`input[type="radio"][name="${key}"]`);
        if (radioGroup.length > 0) {
            radioGroup.forEach(radio => {
                radio.checked = (radio.value === value);
            });
            continue; // Skip to next key, don't run general logic
        }

        // Handle checkbox by ID
        const checkbox = document.getElementById(key);
        if (checkbox && checkbox.type === "checkbox") {
            checkbox.checked = value;
            continue;
        }

        // Handle all other inputs/selects/sliders by ID
        const el = document.getElementById(key);
        if (el) {
            el.value = value;
        }
    }

    validateForm(false);
    updateHealthValue();
}

// Track changes in form and save them
document.getElementById("registrationForm").addEventListener("input", saveFormToLocalStorage);