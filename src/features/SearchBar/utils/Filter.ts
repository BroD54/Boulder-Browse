import Fuse from 'fuse.js';

interface FilterParams<T> {
  data: T[];
  fields: string[];
  search: string;
}

function filterJson<T>({ data, fields, search }: FilterParams<T>): T[] {
  const options = {
    keys: fields,
    threshold: 0.3, // Controls sensitivity: 0.0 (strict) - 1.0 (loose)
    shouldSort: true,
    includeScore: true,
  };

  const my_fuse = new Fuse(data, options);
  const result = my_fuse.search(search);

  return result.map(resultItem => resultItem.item);
}

export default filterJson;
