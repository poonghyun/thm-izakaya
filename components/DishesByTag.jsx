export default function DishesByTag() {
  return (
    <div>
      Dishes By Tag
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
