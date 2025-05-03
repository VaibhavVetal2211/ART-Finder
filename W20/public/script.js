// DOM Elements
const employeeForm = document.getElementById('employeeForm');
const employeeList = document.getElementById('employeeList');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const editForm = document.getElementById('editForm');
const saveEditBtn = document.getElementById('saveEdit');

// API URL
const API_URL = 'http://localhost:3000/api/employees';

// Load employees on page load
document.addEventListener('DOMContentLoaded', loadEmployees);

// Add new employee
employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const employee = {
        name: document.getElementById('name').value,
        department: document.getElementById('department').value,
        designation: document.getElementById('designation').value,
        salary: document.getElementById('salary').value,
        joiningDate: document.getElementById('joiningDate').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        if (response.ok) {
            employeeForm.reset();
            loadEmployees();
            showAlert('Employee added successfully!', 'success');
        } else {
            throw new Error('Failed to add employee');
        }
    } catch (error) {
        showAlert('Error adding employee', 'danger');
    }
});

// Load all employees
async function loadEmployees() {
    try {
        const response = await fetch(API_URL);
        const employees = await response.json();
        
        employeeList.innerHTML = '';
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.designation}</td>
                <td>$${employee.salary}</td>
                <td>${new Date(employee.joiningDate).toLocaleDateString()}</td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="editEmployee('${employee._id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${employee._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            employeeList.appendChild(row);
        });
    } catch (error) {
        showAlert('Error loading employees', 'danger');
    }
}

// Edit employee
async function editEmployee(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to load employee details');
        }
        const employee = await response.json();
        
        document.getElementById('editId').value = employee._id;
        document.getElementById('editName').value = employee.name;
        document.getElementById('editDepartment').value = employee.department;
        document.getElementById('editDesignation').value = employee.designation;
        document.getElementById('editSalary').value = employee.salary;
        document.getElementById('editJoiningDate').value = employee.joiningDate.split('T')[0];
        
        editModal.show();
    } catch (error) {
        showAlert(`Error: ${error.message}`, 'danger');
        console.error('Error loading employee details:', error);
    }
}

// Save edited employee
saveEditBtn.addEventListener('click', async () => {
    const id = document.getElementById('editId').value;
    const employee = {
        name: document.getElementById('editName').value,
        department: document.getElementById('editDepartment').value,
        designation: document.getElementById('editDesignation').value,
        salary: document.getElementById('editSalary').value,
        joiningDate: document.getElementById('editJoiningDate').value
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        if (response.ok) {
            editModal.hide();
            loadEmployees();
            showAlert('Employee updated successfully!', 'success');
        } else {
            throw new Error('Failed to update employee');
        }
    } catch (error) {
        showAlert('Error updating employee', 'danger');
    }
});

// Delete employee
async function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadEmployees();
                showAlert('Employee deleted successfully!', 'success');
            } else {
                throw new Error('Failed to delete employee');
            }
        } catch (error) {
            showAlert('Error deleting employee', 'danger');
        }
    }
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
} 