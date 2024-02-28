const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const m = months[date.getMonth()];
  const d = date.getDate();
  const y = date.getFullYear();
  return `${m} ${d}, ${y}`;
};

export const secondsToMinutes = (seconds) => {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return `${minutes}:${
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
  }`;
};
