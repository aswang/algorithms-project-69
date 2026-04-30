const tokenize = (text) => text.toLowerCase().match(/\w+/g) ?? [];

const buildIndex = (docs) => {
  const index = new Map();
  docs.forEach((doc) => {
    tokenize(doc.text).forEach((term) => {
      if (!index.has(term)) index.set(term, new Map());
      const postings = index.get(term);
      postings.set(doc.id, (postings.get(doc.id) ?? 0) + 1);
    });
  });
  return index;
};

const search = (docs, query) => {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) return [];

  const index = buildIndex(docs);
  const scores = new Map();

  queryTerms.forEach((term) => {
    const postings = index.get(term);
    if (!postings) return;
    postings.forEach((count, docId) => {
      const current = scores.get(docId) ?? { matched: 0, total: 0 };
      scores.set(docId, { matched: current.matched + 1, total: current.total + count });
    });
  });

  const order = new Map(docs.map((doc, i) => [doc.id, i]));

  return [...scores.entries()]
    .sort(([idA, a], [idB, b]) => (
      b.matched - a.matched
      || b.total - a.total
      || order.get(idA) - order.get(idB)
    ))
    .map(([id]) => id);
};

export default search;
