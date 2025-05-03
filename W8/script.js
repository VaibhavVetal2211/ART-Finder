document.addEventListener('DOMContentLoaded', function () {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Get the form element
    const form = document.getElementById('registrationForm');

    // Handle form submission
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            try {
                // Collect form data
                const formData = {
                    fullName: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    eventType: document.getElementById('eventType').value,
                    eventDate: document.getElementById('eventDate').value,
                    specialRequirements: document.getElementById('specialRequirements').value,
                    registrationDate: new Date().toISOString()
                };

                // Send data to server to save in JSON file
                const response = await fetch('/save-registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Failed to save registration');
                }

                // Show success message
                alert('Registration successful! Your details have been saved.');
                form.reset();
                form.classList.remove('was-validated');
            } catch (error) {
                console.error('Error saving registration:', error);
                alert('There was an error saving your registration. Please try again.');
            }
        } else {
            form.classList.add('was-validated');
        }
    });

    // Add custom validation for phone number
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function () {
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });

    // Set minimum date to today for event date
    const eventDateInput = document.getElementById('eventDate');
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.setAttribute('min', today);
});