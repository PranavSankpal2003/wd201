let userForm = document.getElementById("user-form");
const retriveEntries = () => 
{
    let entry = localStorage.getItem("user-entry");
    if (entry) 
    {
        entry = JSON.parse(entry);
    } 
    else 
    {
        entry = [];
    }
    return entry;
}
let userEntries = retriveEntries();
const displayEntries = () => 
{
    const entry = retriveEntries();

    let data = entry.map((entry) => 
    {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptedTermsAndConditionsCell = `<td>${entry.acceptedTermsAndConditions}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptedTermsAndConditionsCell}</tr>`;
        return row;
    }).join("\n");

    let table = `<table><tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Dob</th>
            <th>Accepted terms?</th>
    </tr> ${data} </table>`
    let details = document.getElementById("table");
    details.innerHTML = table;
}
const saveUserForm = (event) => 
{
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;
    let currentYr = new Date().getFullYear();
    let birthyr = dob.split("-");
    let year = birthyr[0];
    let age = currentYr - year;
    let isValid = (age) => 
    {
        if (age > 55 || age < 18) {
            return false;
        } else {
            return true;
        }
    }
    if (!isValid(age))
    {
        document.getElementById("dob").style = "border: 2px solid red;"
        return alert("You must be between age 18 and 55.\nYou are not elligible!");
    } 
    else 
    {
        document.getElementById("dob").style = "border: 2px solid #cccc;"
        let entry = {name,email,password,dob,acceptedTermsAndConditions};
        userEntries.push(entry);
        localStorage.setItem("user-entry", JSON.stringify(userEntries));
        displayEntries();
    }
}
userForm.addEventListener("submit", saveUserForm);
displayEntries();