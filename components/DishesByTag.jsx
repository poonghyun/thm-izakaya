import { useState } from 'react';

import { customerToTags, tagsForCustomer } from '../data.js';

const customers = Object.keys(customerToTags);

export default function DishesByTag() {
  const [cTags, setCTags] = useState([]);

  return (
    <div className="flex flex-col">
      <h1>Dishes By Tag</h1>
      <select
        className=""
        defaultValue={customers[0]}
        onChange={customer => setCTags(tagsForCustomer(customer).reverse())}
      >
        {customers.map(c => <option value={c}>{c}</option>)}
      </select>
      <div className="flex flex-col">
        {(cTags || []).map(g =>
          g.map(([dish, tags]) =>
            <div>
              • {dish} has ${tags.length} compatible tags: ${tags.join(', ')}
            </div>
          )
        )}
      </div>
    </div>
  );
}

// if (scriptType === 'dishesByTag') {
//   if (args.length !== 2) {
//     console.log('Wrong number of arguments');
//   } else {
//     const customer = args[1];
//     const result = tagsForCustomer(customer).reverse();
//     if (result) {
//       console.log(`Dishes for customer ${customer} sorted by compatible tags:`);
//       for (const group of result) {
//         for (const [dish, cTags] of group) {
//           console.log(`• ${dish} has ${cTags.length} compatible tags: ${cTags.join(', ')}`)
//         }
//       }
//     }
//   }
