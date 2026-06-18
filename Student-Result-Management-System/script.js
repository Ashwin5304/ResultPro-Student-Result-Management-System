const resultTable = document.getElementById("resultTable");

function addSubject() {

    const container = document.getElementById("subjectsContainer");

    const row = document.createElement("div");

    row.className = "subject-row";

    row.innerHTML = `
        <input type="text" class="subject-name" placeholder="Subject Name">
        <input type="number" class="subject-mark" placeholder="Marks Obtained">
        <input type="number" class="subject-max" placeholder="Out Of">
    `;

    container.appendChild(row);
}

function getGrade(percentage) {

    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
}

function addResult() {

    const name = document.getElementById("name").value.trim();

    if (name === "") {
        alert("Please enter student name");
        return;
    }

    const subjects = document.querySelectorAll(".subject-name");
    const marks = document.querySelectorAll(".subject-mark");
    const maxMarks = document.querySelectorAll(".subject-max");

    if (subjects.length < 4) {
        alert("Minimum 4 subjects required");
        return;
    }

    let obtainedTotal = 0;
    let maximumTotal = 0;
    let pass = true;
    let subjectDetails = "";

    for (let i = 0; i < subjects.length; i++) {

        const subject = subjects[i].value.trim();
        const mark = Number(marks[i].value);
        const max = Number(maxMarks[i].value);

        if (subject === "" || marks[i].value === "" || maxMarks[i].value === "") {
            alert("Please fill all subject details");
            return;
        }

        if (mark > max) {
            alert(`Marks obtained cannot exceed Out Of value for ${subject}`);
            return;
        }

        obtainedTotal += mark;
        maximumTotal += max;

        if ((mark / max) * 100 < 35) {
            pass = false;
        }

        subjectDetails += `${subject}: ${mark}/${max}`;

        if (i !== subjects.length - 1) {
            subjectDetails += "<br>";
        }
    }

    const percentage = (obtainedTotal / maximumTotal) * 100;

    const grade = getGrade(percentage);

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${subjectDetails}</td>
        <td>${obtainedTotal}/${maximumTotal}</td>
        <td>${percentage.toFixed(2)}%</td>
        <td>${grade}</td>
        <td class="${pass ? 'pass' : 'fail'}">${pass ? 'Pass' : 'Fail'}</td>
        <td>
            <button class="delete-btn" onclick="deleteRow(this)">
                Delete
            </button>
        </td>
    `;

    resultTable.appendChild(row);

    document.getElementById("name").value = "";

    document.querySelectorAll(".subject-name").forEach(input => input.value = "");
    document.querySelectorAll(".subject-mark").forEach(input => input.value = "");
    document.querySelectorAll(".subject-max").forEach(input => input.value = "");
}

function deleteRow(button) {
    button.parentElement.parentElement.remove();
}