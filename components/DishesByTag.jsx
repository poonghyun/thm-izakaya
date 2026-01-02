import { useState } from 'react';

import { customerToTags, tagsForCustomer } from '../data.js';

const customers = Object.keys(customerToTags);

export default function DishesByTag() {
  const [cTags, setCTags] = useState([]);

  return (
    <div className="flex flex-col">
      <h1>Dishes Ranked By Tag For Customer</h1>
      <select
        onChange={e => setCTags(tagsForCustomer(e.target.value).reverse())}
      >
        <option value="">Select a customer</option>
        {customers.map(c => <option value={c}>{c}</option>)}
      </select>
      <div className="flex flex-col">
        {(cTags || []).map(g =>
          g.map(([dish, tags]) =>
            <div>
              • {dish} has {tags.length} compatible tags: {tags.join(', ')}
            </div>
          )
        )}
      </div>
    </div>
  );
}
