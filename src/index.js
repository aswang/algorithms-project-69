const tokenize = (text) => text.toLowerCase().match(/\w+/g) ?? [];

const search = (docs, query) => {
  const [term] = tokenize(query);
  if (!term) return [];

  return docs
    .filter((doc) => tokenize(doc.text).includes(term))
    .map((doc) => doc.id);
};

export default search;
