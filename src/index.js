const search = (docs, query) => {
  const term = query.toLowerCase();
  return docs
    .filter((doc) => {
      const words = doc.text.toLowerCase().split(/\W+/);
      return words.includes(term);
    })
    .map((doc) => doc.id);
};

export default search;
