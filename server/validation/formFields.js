const validateNames = (nameString) => {
     const nameRegex = /^[a-zA-Z]{3,20}$/;
     console.log(nameRegex.test(nameString));
}

const validateEmails = (emailStrings) => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailRegex.test(emailStrings);
}

const validatePasswords = (passwordStrings) => {
     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
     return passwordRegex.test(passwordStrings);
}


const validatePhones = (phoneStrings) => {
     const phoneRegex = /^\d{12}$/;
     return phoneRegex.test(phoneString);
}

module.exports = { validateNames, validateEmails, validatePasswords, validatePhones }