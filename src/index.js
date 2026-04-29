const tokenize = (text) => text.toLowerCase().match(/\w+/g) ?? [];

const score = (docTerms, queryTerms) => {
  const counts = queryTerms.map((term) => (
    docTerms.filter((t) => t === term).length
  ));
  const matched = counts.filter((n) => n > 0).length;
  const total = counts.reduce((sum, n) => sum + n, 0);
  return { matched, total };
};

const search = (docs, query) => {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) return [];

  return docs
    .map((doc) => ({ id: doc.id, ...score(tokenize(doc.text), queryTerms) }))
    .filter(({ total }) => total > 0)
    .sort((a, b) => b.matched - a.matched || b.total - a.total)
    .map(({ id }) => id);
};

export default search;
