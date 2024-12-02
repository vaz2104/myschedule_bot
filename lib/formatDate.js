function formatDate(date) {
  const dateObject = typeof date === "object" ? date : new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

module.exports = formatDate;
