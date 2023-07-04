const students = [

];

// DOM elements
const studentTableBody = document.getElementById('studentTableBody');
const studentForm = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const gradeInput = document.getElementById('grade');
const degreeInput = document.getElementById('degree');
const emailInput = document.getElementById('email');
const searchInput = document.getElementById('searchInput');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Render the table rows for students
function renderStudents() {
  studentTableBody.innerHTML = '';

  for (const student of students) {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${student.ID}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.grade}</td>
          <td>${student.degree}</td>
          <td>${student.email}</td>
          <td>
              <span class="edit-btn" data-id="${student.ID}">&#9998;</span>
              <span class="delete-btn" data-id="${student.ID}">&#128465;</span>
          </td>
      `;
      studentTableBody.appendChild(row);
  }
}

// Clear the form inputs
function clearForm() {
  studentForm.reset();
  submitBtn.textContent = 'Add Student';
  cancelBtn.style.display = 'none';
  studentForm.removeAttribute('data-edit-id');
}

// Fill the form inputs with student data for editing
function fillFormForEdit(student) {
  nameInput.value = student.name;
  ageInput.value = student.age;
  gradeInput.value = student.grade;
  degreeInput.value = student.degree;
  emailInput.value = student.email;
  submitBtn.textContent = 'Edit Student';
  cancelBtn.style.display = 'inline-block';
  studentForm.setAttribute('data-edit-id', student.ID);
}

// Add or update a student
function addOrUpdateStudent(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value);
  const grade = gradeInput.value.trim();
  const degree = degreeInput.value.trim();
  const email = emailInput.value.trim();

  if (name === '' || isNaN(age) || grade === '' || degree === '' || email === '') {
      alert('Please fill in all fields.');
      return;
  }

  const editId = studentForm.getAttribute('data-edit-id');
  if (editId) {
      // Update existing student
      const index = students.findIndex(student => student.ID === parseInt(editId));
      if (index !== -1) {
          students[index] = { ID: parseInt(editId), name, age, grade, degree, email };
          renderStudents();
          clearForm();
      }
  } else {
      // Add new student
      const newId = students.length > 0 ? students[students.length - 1].ID + 1 : 1;
      students.push({ ID: newId, name, age, grade, degree, email });
      renderStudents();
      clearForm();
  }
}

// Delete a student
function deleteStudent(event) {
  if (confirm('Are you sure you want to delete this student?')) {
      const studentId = parseInt(event.target.getAttribute('data-id'));
      const index = students.findIndex(student => student.ID === studentId);
      if (index !== -1) {
          students.splice(index, 1);
          renderStudents();
          clearForm();
      }
  }
}

// Edit student
function editStudent(event) {
  const studentId = parseInt(event.target.getAttribute('data-id'));
  const student = students.find(student => student.ID === studentId);
  if (student) {
      fillFormForEdit(student);
  }
}

// Search for students
function searchStudents() {
  const searchText = searchInput.value.trim().toLowerCase();
  const filteredStudents = students.filter(student => {
      return (
          student.name.toLowerCase().includes(searchText) ||
          student.email.toLowerCase().includes(searchText) ||
          student.degree.toLowerCase().includes(searchText)
      );
  });
  renderFilteredStudents(filteredStudents);
}

// Render the filtered students
function renderFilteredStudents(filteredStudents) {
  studentTableBody.innerHTML = '';

  for (const student of filteredStudents) {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${student.ID}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.grade}</td>
          <td>${student.degree}</td>
          <td>${student.email}</td>
          <td>
              <span class="edit-btn" data-id="${student.ID}">&#9998;</span>
              <span class="delete-btn" data-id="${student.ID}">&#128465;</span>
          </td>
      `;
      studentTableBody.appendChild(row);
  }
}

// Event listeners
studentForm.addEventListener('submit', addOrUpdateStudent);
cancelBtn.addEventListener('click', clearForm);
studentTableBody.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
      deleteStudent(event);
  } else if (event.target.classList.contains('edit-btn')) {
      editStudent(event);
  }
});
searchInput.addEventListener('input', searchStudents);

// Initial rendering
renderStudents();