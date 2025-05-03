// DOM Elements
const employeesGrid = document.getElementById('employeesGrid');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');

// State management
let allEmployees = [];
let currentPage = 1;
const employeesPerPage = 10;

// Fetch employees data from the API
async function fetchEmployees() {
    try {
        const response = await fetch('http://localhost:3000/api/employees');
        const data = await response.json();
        allEmployees = data.employees;
        renderEmployees();
        setupPagination();
    } catch (error) {
        console.error('Error fetching employees:', error);
        employeesGrid.innerHTML = '<p class="error">Error loading employees. Please try again later.</p>';
    }
}

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

// Calculate pagination values
function getPaginationValues(totalItems) {
    const totalPages = Math.ceil(totalItems / employeesPerPage);
    const startIndex = (currentPage - 1) * employeesPerPage;
    const endIndex = startIndex + employeesPerPage;
    return { totalPages, startIndex, endIndex };
}

// Render employees to the grid
function renderEmployees() {
    const searchTerm = searchInput.value.trim();
    const filteredEmployees = filterEmployees(allEmployees, searchTerm);
    const { startIndex, endIndex } = getPaginationValues(filteredEmployees.length);
    
    const employeesToShow = filteredEmployees.slice(startIndex, endIndex);
    
    employeesGrid.innerHTML = employeesToShow.length > 0
        ? employeesToShow.map(createEmployeeCard).join('')
        : '<p class="no-results">No employees found matching your search.</p>';
    
    setupPagination(filteredEmployees.length);
}

// Setup pagination buttons
function setupPagination(totalItems = allEmployees.length) {
    const { totalPages } = getPaginationValues(totalItems);
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button 
            onclick="changePage(${currentPage - 1})"
            ${currentPage === 1 ? 'disabled' : ''}
        >
            Previous
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button 
                onclick="changePage(${i})"
                class="${currentPage === i ? 'active' : ''}"
            >
                ${i}
            </button>
        `;
    }
    
    // Next button
    paginationHTML += `
        <button 
            onclick="changePage(${currentPage + 1})"
            ${currentPage === totalPages ? 'disabled' : ''}
        >
            Next
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Change page
function changePage(newPage) {
    const searchTerm = searchInput.value.trim();
    const filteredEmployees = filterEmployees(allEmployees, searchTerm);
    const { totalPages } = getPaginationValues(filteredEmployees.length);
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderEmployees();
    }
}

// Event listeners
searchInput.addEventListener('input', () => {
    currentPage = 1; // Reset to first page on search
    renderEmployees();
});

// Initialize the application
fetchEmployees();