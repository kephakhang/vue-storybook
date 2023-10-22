const formatNumber = (number: number | string, seperator = ",") => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
};

export default {
  formatNumber,
};
