import {
  linkedAccounts,
  certsClaimed,
  examData,
  scoreDistribution,
  uniqueUserData,
  numberOfUsersPerExamsTaken,
  surveyResponses,
} from "./data.js";

import { formatDate, secondsToMinutes } from "./helpers.js";

// shared functions
const ticksToK = (value) => {
  return value >= 1000 ? value / 1000 + "k" : value;
};

// shared config
const lineChartTension = { tension: 0.3 };

const hideLegend = {
  legend: {
    display: false,
  },
};

const tooltipStyles = {
  titleColor: "#000",
  backgroundColor: "#fff",
  borderColor: "#777",
  bodyColor: "#777",
  borderWidth: 1,
  boxPadding: 3,
  padding: 8,
  bodyFont: {
    size: 15,
  },
  titleFont: {
    size: 13,
  },
};

const lineChartStyles = {
  borderWidth: 2,
  pointRadius: 8,
  pointHoverRadius: 11,
};

const axisTitleStyle = {
  display: true,
  color: "#666",
  padding: 20,
  font: {
    size: 14,
  },
};

const yTicks = {
  ticks: {
    callback: ticksToK,
    font: {
      size: 18,
    },
    padding: 10,
  },
};

const yGrid = {
  grid: {
    drawTicks: false,
    lineWidth: 3,
  },
};

const yBorder = {
  border: {
    color: "#777",
    dash: [10, 5],
    width: 2,
  },
};

const yStyles = {
  ...yTicks,
  ...yGrid,
  ...yBorder,
};

const xTicks = {
  ticks: {
    maxRotation: 45,
    minRotation: 45,
    labelOffset: 5,
    padding: 10,
    font: {
      size: 14,
    },
  },
};

const xGrid = {
  grid: {
    drawTicks: false,
    lineWidth: 2,
  },
};

const xBorder = {
  border: {
    color: "#777",
    dash: [3, 6],
    width: 2,
  },
};

const xStyles = {
  ...xTicks,
  ...xGrid,
  ...xBorder,
};

// Linked accounts chart
new Chart(document.getElementById("linked-accounts-canvas"), {
  type: "line",
  data: {
    labels: Object.keys(linkedAccounts).map(formatDate),
    datasets: [
      {
        label: "Linked User Accounts",
        data: Object.values(linkedAccounts),
        borderColor: "#3C8DBC",
        backgroundColor: "#7FB4E3",
        ...lineChartTension,
      },
    ],
  },
  options: {
    ...lineChartStyles,
    scales: {
      y: {
        title: {
          ...axisTitleStyle,
          text: "Number of users",
        },
        ...yStyles,
      },
      x: { ...xStyles },
    },
    plugins: {
      ...hideLegend,
      tooltip: {
        ...tooltipStyles,
      },
    },
  },
});

// Certifications claimed chart
new Chart(document.getElementById("certs-claimed-canvas"), {
  type: "line",
  data: {
    labels: Object.keys(certsClaimed).map(formatDate),
    datasets: [
      {
        label: "Certifications Claimed",
        data: Object.values(certsClaimed),
        borderColor: "#D6693C",
        backgroundColor: "#F7B77E",
        ...lineChartTension,
      },
    ],
  },
  options: {
    ...lineChartStyles,
    scales: {
      y: {
        title: {
          ...axisTitleStyle,
          text: "Number of Certifications Claimed",
        },
        ...yStyles,
      },
      x: { ...xStyles },
    },
    plugins: {
      ...hideLegend,
      tooltip: {
        ...tooltipStyles,
      },
    },
  },
});

// Exam Data Chart
new Chart(document.getElementById("exam-data-canvas"), {
  type: "line",
  data: {
    labels: Object.keys(examData).map(formatDate),
    datasets: [
      {
        label: "Exams Taken",
        data: Object.values(examData).map((v) => v.totalExamsTaken),
        borderColor: "#7D6DAB",
        backgroundColor: "#BAAED5",
        ...lineChartTension,
      },
      {
        label: "Exams Passed",
        data: Object.values(examData).map((v) => v.totalExamsPassed),
        borderColor: "#4DBDC4",
        backgroundColor: "#9CE0E1",
        ...lineChartTension,
      },
      {
        label: "Exams Not Passed",
        data: Object.values(examData).map((v) => v.totalExamsNotPassed),
        borderColor: "#E83C8D",
        backgroundColor: "#F3A5D9",
        ...lineChartTension,
      },
    ],
  },
  options: {
    ...lineChartStyles,
    plugins: {
      ...hideLegend,
      tooltip: {
        mode: "index",
        position: "nearest",
        ...tooltipStyles,
        callbacks: {
          title: (data) => {
            const exam = Object.values(examData)[data[0].dataIndex];
            const averageTime = secondsToMinutes(exam.averageExamTime);
            const averageScore = `${exam.averagePercentCorrect}%`;
            return `${data[0].label}\nAverage Score: ${averageScore}\nAverage Time: ${averageTime}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          ...axisTitleStyle,
          text: "Number of Exams",
        },
        ...yStyles,
      },
      x: { ...xStyles },
    },
  },
});

// Score Distribution Chart
new Chart(document.getElementById("score-distribution-canvas"), {
  type: "bar",
  data: {
    labels: Object.keys(scoreDistribution).map((n) => `${n}%`),
    datasets: [
      {
        label: "Number of exams",
        data: Object.values(scoreDistribution),
        borderColor: (ctx) => {
          var score = Object.keys(scoreDistribution)[ctx.dataIndex];
          if (score >= 70) {
            return "#4DBDC4";
          } else {
            return "#E83C8D";
          }
        },
        backgroundColor: (ctx) => {
          var score = Object.keys(scoreDistribution)[ctx.dataIndex];
          if (score >= 70) {
            return "#9CE0E1";
          } else {
            return "#F3A5D9";
          }
        },
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      y: {
        title: {
          ...axisTitleStyle,
          text: "Number of Exams",
        },
        ...yGrid,
        ...yBorder,
      },
      x: {
        ...xStyles,
        title: {
          ...axisTitleStyle,
          text: "Percent Correct",
        },
      },
    },
    plugins: {
      ...hideLegend,
      tooltip: {
        ...tooltipStyles,
        callbacks: {
          title: (data) => {
            const n = parseFloat(data[0].label.replace("%", ""));
            return n >= 70 ? `${n}% Correct (passed)` : `${n}% Correct (not passed)`;
          },
        },
      },
    },
  },
});

// Unique users chart
new Chart(document.getElementById("unique-users-canvas"), {
  type: "line",
  data: {
    labels: Object.keys(uniqueUserData).map(formatDate),
    datasets: [
      {
        label: "Number of users who have taken the exam",
        data: Object.values(uniqueUserData).map(
          (v) => v.usersWhoCompletedAnExam
        ),
        borderColor: "#7D6DAB",
        backgroundColor: "#BAAED5",
        ...lineChartTension,
      },
      {
        label: "Number of users who have passed the exam",
        data: Object.values(uniqueUserData).map((v) => v.usersWhoPassedAnExam),
        borderColor: "#4DBDC4",
        backgroundColor: "#9CE0E1",
        ...lineChartTension,
      },
      {
        label: "Users who have taken and not passed the exam",
        data: Object.values(uniqueUserData).map(
          (v) => v.usersWhoCompletedAndNotPassedAnExam
        ),
        borderColor: "#E83C8D",
        backgroundColor: "#F3A5D9",
        ...lineChartTension,
      },
    ],
  },
  options: {
    ...lineChartStyles,
    plugins: {
      ...hideLegend,
      tooltip: {
        mode: "index",
        position: "nearest",
        ...tooltipStyles,
        callbacks: {
          title: (data) => {
            const users = Object.values(uniqueUserData)[data[0].dataIndex];
            return `${data[0].label}\nUsers who have passed the exam and not claimed the certification: ${users.usersWhoPassedAnExamAndNotClaimedCert}\nAverage number of exams taken per user: ${users.averageExamsPerUser}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          ...axisTitleStyle,
          text: "Number of exams",
        },
        ...yStyles,
      },
      x: { ...xStyles },
    },
  },
});

// Exams per user
new Chart(document.getElementById("exams-per-user-canvas"), {
  type: "bar",
  data: {
    labels: Object.keys(numberOfUsersPerExamsTaken),
    datasets: [
      {
        label: "Number of users",
        data: Object.values(numberOfUsersPerExamsTaken),
        backgroundColor: "#9AC7B0",
        borderColor: "#5B9F8F",
        borderWidth: 3,
      },
    ],
  },
  options: {
    scales: {
      y: {
        type: "logarithmic",
        min: 0,
        title: {
          ...axisTitleStyle,
          text: "Number of users",
        },
        ticks: {
          callback: (value) => {
            return value === 0.1 ||
              value === 1.0 ||
              value === 10.0 ||
              value === 100.0 ||
              value === 1000.0 ||
              value === 10000.0
              ? value
              : "";
          },
        },
        ...yGrid,
        ...yBorder,
      },
      x: {
        ...xStyles,
        title: {
          ...axisTitleStyle,
          text: "Number of exams taken",
        },
      },
    },
    plugins: {
      ...hideLegend,
      tooltip: {
        ...tooltipStyles,
        callbacks: {
          title: (data) => {
            const n = parseInt(data[0].label);
            return `${n === 1 ? n + " exam taken" : n + " exams taken"}`;
          },
        },
      },
    },
  },
});

// Survey Question 1 Chart
const question1 = Object.keys(surveyResponses)[0];
const question1Responses = surveyResponses[question1];

new Chart(document.getElementById("survey-question-1-canvas"), {
  type: "bar",
  data: {
    labels: Object.keys(question1Responses),
    datasets: [
      {
        label: "Number of responses",
        data: Object.values(question1Responses),
        borderColor: "#E84D4D",
        backgroundColor: "#F29B9B",
        borderWidth: 3,
      },
    ],
  },
  options: {
    layout: {
      padding: 30,
    },
    indexAxis: "y",
    scales: {
      y: {
        ticks: {
          font: {
            size: 15,
          },
          padding: 8,
        },
        ...yGrid,
        ...yBorder,
      },
      x: {
        ...xStyles,
      },
    },
    plugins: {
      title: {
        display: true,
        text: question1,
        font: {
          size: 20,
        },
        padding: 20,
        align: "start",
      },
      ...hideLegend,
      tooltip: {
        ...tooltipStyles,
      },
    },
  },
});

// Survey Question 2 Chart
const question2 = Object.keys(surveyResponses)[1];
const question2Responses = surveyResponses[question2];

new Chart(document.getElementById("survey-question-2-canvas"), {
  type: "bar",
  data: {
    labels: Object.keys(question2Responses),
    datasets: [
      {
        label: "Number of responses",
        data: Object.values(question2Responses),
        borderColor: "#E84D4D",
        backgroundColor: "#F29B9B",
        borderWidth: 3,
      },
    ],
  },
  options: {
    layout: {
      padding: 30,
    },
    indexAxis: "y",
    scales: {
      y: {
        ticks: {
          font: {
            size: 15,
          },
          padding: 8,
        },
        ...yGrid,
        ...yBorder,
      },
      x: {
        ...xStyles,
      },
    },
    plugins: {
      title: {
        display: true,
        text: question2,
        font: {
          size: 20,
        },
        padding: 20,
        align: "start",
      },
      ...hideLegend,
      tooltip: {
        ...tooltipStyles,
      },
    },
  },
});
