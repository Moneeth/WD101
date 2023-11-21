let formUser = document.getElementById("forms");

const retireive = () => {
  let entries = localStorage.getItem("entryByUser");
  if (entries) {
    return JSON.parse(entries);
  } else {
    return [];
  }
};

let entryUser = retireive();

const display = () => {
  const entries = retireive();
  
  const tableEntries = entries.map((entry) => {
    const nameCell = `<td'>${entry.name}</td>`;
    const emailCell = `<td'>${entry.email}</td>`;
    const passwordCell = `<td'>${entry.password}</td>`;
    const dobCell = `<td'>${entry.dob}</td>`;
    const acceptTermsCell = `<td'>${entry.acceptedTermsAndconditions}</td>`;
    const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
    return row;
  }).join("\n");

  const table = `<table>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>DOB</th>
                    <th>Accepted Terms?</th>
                  </tr>
                  ${tableEntries}
                </table>`;

  let details = document.getElementById("entryByUser");
  details.innerHTML = table;
};

const ageCalc = (dob) => {
  const today = new Date();
  const bob = new Date(dob);
  let age = today.getFullYear() - bob.getFullYear();
  const month = today.getMonth() - bob.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < bob.getDate())) {
    age--;
  }
  return age;
};

const formSave = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;
  
  const age = ageCalc(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndconditions,
  };
  entryUser.push(entry);
  
  localStorage.setItem("entryByUser", JSON.stringify(entryUser));
  display();
};

formUser.addEventListener("submit", formSave);
display();