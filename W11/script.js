// Initialize users array from localStorage or create empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Form validation functions
function validateName(name) {
    return name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobile(mobile) {
    return /^\d{10}$/.test(mobile);
}

function validatePassword(password) {
    return password.length >= 8 && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

function validateDOB(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
}

// Registration form handling
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const dob = document.getElementById('dob').value;
        const city = document.getElementById('city').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Reset error messages
        document.querySelectorAll('.error').forEach(error => error.textContent = '');

        // Validate all fields
        let isValid = true;

        if (!validateName(name)) {
            document.getElementById('nameError').textContent = 'Name must be at least 3 characters and contain only letters';
            isValid = false;
        }

        if (!validateEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }

        if (!validateMobile(mobile)) {
            document.getElementById('mobileError').textContent = 'Please enter a valid 10-digit mobile number';
            isValid = false;
        }

        if (!validateDOB(dob)) {
            document.getElementById('dobError').textContent = 'You must be at least 18 years old';
            isValid = false;
        }

        if (city.trim().length < 2) {
            document.getElementById('cityError').textContent = 'Please enter a valid city name';
            isValid = false;
        }

        if (address.trim().length < 10) {
            document.getElementById('addressError').textContent = 'Please enter a complete address (minimum 10 characters)';
            isValid = false;
        }

        if (!validatePassword(password)) {
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters and contain both letters and numbers';
            isValid = false;
        }

        if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            isValid = false;
        }

        if (isValid) {
            // Create user object
            const user = {
                name,
                email,
                mobile,
                dob,
                city,
                address,
                password // In a real application, this should be hashed
            };

            // Simulate AJAX POST request
            setTimeout(() => {
                // Add user to array
                users.push(user);
                
                // Save to localStorage
                localStorage.setItem('users', JSON.stringify(users));
                
                // Redirect to login page
                window.location.href = 'index.html';
            }, 1000);
        }
    });
}

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulate AJAX POST request
        setTimeout(() => {
            // Check credentials
            const user = users.find(u => (u.email === username || u.mobile === username) && u.password === password);
            
            if (user) {
                // Store logged in user
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'data-list.html';
            } else {
                alert('Invalid username or password');
            }
        }, 1000);
    });
}

// Data list page handling
const userList = document.getElementById('userList');
if (userList) {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
    }

    // Display users
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Mobile:</strong> ${user.mobile}</p>
            <p><strong>Date of Birth:</strong> ${user.dob}</p>
            <p><strong>City:</strong> ${user.city}</p>
            <p><strong>Address:</strong> ${user.address}</p>
        `;
        userList.appendChild(userCard);
    });
} 