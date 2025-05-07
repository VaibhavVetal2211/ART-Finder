// DOM Elements
const employeesGrid = document.getElementById('employeesGrid');

// State management
let allEmployees = [];

// Fetch employees data from the API
async function fetchEmployees() {
    try {
        const response = await fetch('http://localhost:3000/api/employees');
        const data = await response.json();
        allEmployees = data.employees;
        renderEmployees();
    } catch (error) {
        console.error('Error fetching employees:', error);
        employeesGrid.innerHTML = '<p class="error">Error loading employees. Please try again later.</p>';
    }
}

// Render employees to the grid
function renderEmployees() {
    employeesGrid.innerHTML = allEmployees.length > 0
        ? allEmployees.map(createEmployeeCard).join('')
        : '<p class="no-results">No employees found matching your search.</p>';
}

// Remove pagination-related functions
// Format salary with currency symbol and commas
function formatSalary(salary) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(salary);
}

// Create employee card HTML
function createEmployeeCard(employee) {
    return `
        <div class="employee-card">
            <img src="${employee.image}" alt="${employee.name}" class="employee-image">
            <div class="employee-info">
                <h3 class="employee-name">${employee.name}</h3>
                <p class="employee-designation">${employee.designation}</p>
                <p class="employee-department">${employee.department}</p>
                <p class="employee-salary">${formatSalary(employee.salary)}</p>
            </div>
        </div>
    `;
}

// Filter employees based on search input
function filterEmployees(employees, searchTerm) {
    return employees.filter(employee => {
        const searchString = searchTerm.toLowerCase();
        return (
            employee.name.toLowerCase().includes(searchString) ||
            employee.designation.toLowerCase().includes(searchString) ||
            employee.department.toLowerCase().includes(searchString)
        );
    });
}

// Event listeners

// Initialize the application
fetchEmployees();