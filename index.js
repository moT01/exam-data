import {
  linkedAccounts,
  certsClaimed,
  examData,
  uniqueUserData,
  lastUpdated,
} from "./data.js";

import { formatDate } from "./helpers.js";

// Update last updated
const lastUpdatedEl = document.getElementById("last-updated");
lastUpdatedEl.innerText = `(Last updated: ${formatDate(lastUpdated)})`;

// Add numbers to headings
const keys1 = Object.keys(linkedAccounts);
const latest1 = linkedAccounts[keys1[keys1.length - 1]];
document.getElementById(
  "heading-1"
).innerHTML += `<span class="color-1"> ${latest1.toLocaleString()}</span>`;

const keys2 = Object.keys(certsClaimed);
const latest2 = certsClaimed[keys2[keys2.length - 1]];
document.getElementById(
  "heading-2"
).innerHTML += `<span class="color-2"> ${latest2.toLocaleString()}</span>`;

const keys3 = Object.keys(examData);
const latest3 = examData[keys3[keys3.length - 1]].totalExamsTaken;
document.getElementById(
  "heading-3"
).innerHTML += `<span class="color-3"> ${latest3.toLocaleString()}</span>`;

const keys5 = Object.keys(uniqueUserData);
const latest5 = uniqueUserData[keys5[keys5.length - 1]].usersWhoCompletedAnExam;
document.getElementById(
  "heading-5"
).innerHTML += `<span class="color-3"> ${latest5.toLocaleString()}</span>`;

// Elements for toggling
const els = [
  {
    chevron: document.getElementById("chevron-1"),
    toggleEls: [document.getElementById("linked-accounts-canvas")],
  },
  {
    chevron: document.getElementById("chevron-2"),
    toggleEls: [document.getElementById("certs-claimed-canvas")],
  },
  {
    chevron: document.getElementById("chevron-3"),
    toggleEls: [document.getElementById("exam-data-canvas")],
  },
  {
    chevron: document.getElementById("chevron-4"),
    toggleEls: [document.getElementById("score-distribution-canvas")],
  },
  {
    chevron: document.getElementById("chevron-5"),
    toggleEls: [document.getElementById("unique-users-canvas")],
  },
  {
    chevron: document.getElementById("chevron-6"),
    toggleEls: [document.getElementById("exams-per-user-canvas")],
  },
  {
    chevron: document.getElementById("chevron-7"),
    toggleEls: [
      document.getElementById("survey-1-wrap"),
      document.getElementById("survey-2-wrap"),
    ],
  },
];

els.forEach((el) => {
  el.chevron.addEventListener("click", () => {
    if (el.chevron.style.transform === "rotate(90deg)") {
      el.toggleEls.forEach((element) => {
        element.style.display = "block";
      });

      el.chevron.style.transform = "rotate(0deg)";
    } else {
      el.toggleEls.forEach((element) => {
        element.style.display = "none";
      });
      el.chevron.style.transform = "rotate(90deg)";
    }
  });
});
