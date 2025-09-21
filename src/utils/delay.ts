const delay = async function (ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default delay;
