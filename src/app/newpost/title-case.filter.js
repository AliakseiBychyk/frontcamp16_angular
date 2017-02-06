exports.titleCase = () => {
  return (val) => {
    return val ? val.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) : val;
  };
};