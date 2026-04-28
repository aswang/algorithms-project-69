const tokenize = (text) => text.toLowerCase().match(/\w+/g) ?? [];

const countOccurrences = (terms, target) => (
  terms.filter((term) => term === target).length
);

const search = (docs, query) => {
  const [term] = tokenize(query);
  if (!term) return [];

  return docs
    .map((doc) => ({ id: doc.id, score: countOccurrences(tokenize(doc.text), term) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ id }) => id);
};

export default search;
