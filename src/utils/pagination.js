const getPagination = (currentPage, l = 12) => {
  const page = Math.max(Number(currentPage) || 1, 1);
  const limit = Math.max(Number(l) || 10, 1);
  const skip = (page - 1) * limit;

  return { limit, skip };
};

module.exports = { getPagination };
