const dishToTags = {
  'seafood miso soup': ['economical', 'homecooking', 'soup', 'vegetarian'],
  'grilled lamprey': ['aquatic', 'grilled', 'signature'],
  'fresh tofu': ['good w/ alcohol', 'homecooking', 'mild', 'small portion', 'vegetarian'],
  'rice ball': ['economical', 'filling', 'homecooking', 'japanese', 'vegetarian'],
  'boiled tofu': ['homecooking', 'mild', 'vegetarian'],
  'secret dried fish crisps': ['aquatic', 'fresh', 'salty', 'small portion'],
  'dew runny eggs': ['economical', 'mild', 'raw'],
  'stinky tofu': ['chinese', 'peculiar', 'spicy', 'vegetarian'],
  'roasted mushroom': ['economical', 'fungus', 'grilled', 'hot', 'salty', 'vegetarian'],
  'pork bowl': ['filling', 'homecooking', 'meat'],
  'fried lampreys': ['aquatic', 'greasy', 'signature'],
  'pork & trout kebab': ['aquatic', 'grilled', 'homecooking', 'meat'],
  'fried cicada sloughs': ['economical', 'greasy', 'peculiar'],
  'potato croquettes': ['greasy', 'homecooking', 'vegetarian'],
};

const dishToIncompatible = {
  'seafood miso soup': ['greasy'],
  'grilled lamprey': ['meat', 'vegetarian'],
  'fresh tofu': [],
  'rice ball': [],
  'boiled tofu': [],
  'secret dried fish crisps': [],
  'dew runny eggs': ['aquatic', 'greasy', 'meat'],
  'stinky tofu': ['fruity', 'sweet'],
  'roasted mushroom': [],
  'pork bowl': [],
  'fried lampreys': ['refreshing'],
  'pork & trout kebab': [],
  'fried cicada sloughs': [],
  'potato croquettes': ['refreshing'],
};

const ingredientToTags = {
  'seaweed': ['fresh', 'vegetarian'],
  'lamprey': ['aquatic', 'signature', 'fresh'],
  'beef': ['meat'],
  'onion': ['vegetarian', 'fresh'],
  'pumpkin': ['filling', 'vegetarian'],
  'tofu': ['vegetarian', 'homecooking', 'mild'],
  'radish': ['vegetarian', 'good w/ alcohol'],
  'trout': ['fresh', 'aquatic'],
  'pork': ['meat'],
  'dew': ['mild'],
  'honey': ['sweet'],
  'cicada slough': ['peculiar'],
  'boar meat': ['meat'],
  'iberico pork': ['meat', 'legendary', 'mountain delicacy'],
  'potato': ['vegetarian', 'homecooking'],
  'venison': ['meat'],
  'mushroom': ['vegetarian', 'fresh', 'fungus'],
  'egg': ['raw'],
  'chili': ['spicy'],
  'pufferfish': ['aquatic', 'sea delicacy', 'fresh'],
  'tuna': ['aquatic', 'fresh', 'premium'],
  'bamboo shoot': ['vegetarian', 'mild'],
  'shrimp': ['aquatic', 'fresh'],
  'salmon': ['aquatic', 'premium', 'fresh'],
  'wagyu beef': ['meat', 'legendary', 'premium'],
  'crab': ['aquatic', 'premium', 'fresh'],
  'flour': ['filling'],
};

const dishToIngredient = {
  'seafood miso soup': ['seaweed'],
  'grilled lamprey': ['lamprey'],
  'fresh tofu': ['radish', 'tofu'],
  'rice ball': ['seaweed'],
  'boiled tofu': ['tofu'],
  'secret dried fish crisps': ['trout'],
  'dew runny eggs': ['dew', 'egg'],
  'stinky tofu': ['tofu', 'chili'],
  'roasted mushroom': ['mushroom'],
  'pork bowl': ['pork'],
  'fried lampreys': ['lamprey'],
  'pork & trout kebab': ['pork', 'trout'],
  'fried cicada sloughs': ['cicada slough'],
  'potato croquettes': ['potato'],
};

const customerToTags = {
  'rabbit': ['fresh', 'fruity', 'homecooking', 'refreshing', 'salty', 'signature', 'strength-boosting', 'sweet', 'trend - popular'],
  'cat': ['chinese', 'meat', 'refreshing', 'sea delicacy', 'signature', 'trend - popular'],
  'tanuki': ['filling', 'greasy', 'meat', 'mountain delicacy', 'salty', 'signature', 'trend - popular'],
  'fox': ['chinese', 'japanese', 'meat', 'signature', 'small portion', 'trend - popular'],
  'snake': ['good w/ alcohol', 'meat', 'mountain delicacy', 'strength-boosting', 'trend - popular'],
  'wriggle': ['meat', 'peculiar', 'raw', 'sweet'],
  'rumia': ['filling', 'meat', 'peculiar', 'raw', 'signature'],
  'chen': ['aquatic', 'greasy', 'grilled', 'meat', 'sweet'],
  'marisa': ['japanese', 'legendary'],
};

const customerToIncompatible = {
  'rabbit': [],
  'cat': [],
  'tanuki': [],
  'fox': [],
  'snake': [],
  'wriggle': ['mild', 'vegetarian'],
  'rumia': ['expensive'],
  'chen': [],
  'marisa': [],
};

function tagsForCustomer(customer) {
  if (!Object.keys(customerToTags).includes(customer)) {
    console.log(`Customer ${customer} not found`);
    return;
  }
  const customerTags = customerToTags[customer];
  const logLists = [];

  Object.keys(dishToTags).forEach(dish => {
    const dishTags = dishToTags[dish];

    const compatibleTags = [];
    for (const tag of dishTags) {
      if (customerTags.includes(tag)) {
        compatibleTags.push(tag);
      }
    }

    logLists[compatibleTags.length] = logLists[compatibleTags.length] || [];
    logLists[compatibleTags.length].push(
      [
        dish,
        compatibleTags,
      ]
    );
  });

  return logLists;
}

function ingredientsForOneTagDishes(customer, dish) {
  const oneTagDishes = tagsForCustomer(customer)[1];
  if (!oneTagDishes.map(o => o[0]).includes(dish)) {
    console.log('Provided dish does not exist or is not a one-tag dish.');
    return;
  }

  return Object.keys(ingredientToTags)
    .filter(i => !dishToIngredient[dish].includes(i)) // can't already be included in dish ingredients
    .filter(i => !dishToIncompatible[dish].includes(i)) // can't be incompatible with dish (or customer in future?)
    .reduce((acc, curr) => {
      // must add positive tag desired by customer
      // the positive tag can't already be present
      const cTags = ingredientToTags[curr].filter(t =>
        customerToTags[customer].includes(t) &&
          !dishToTags[dish].includes(t)
      );

      if (cTags.length === 0) return acc;

      return acc.concat([`${curr} (tagged with ${cTags.join(', ')})`]);
    }, []);
}

// const args = process.argv.slice(2);
// const scriptType = args[0];

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
// } else if (scriptType === 'oneTag') {
//   if (args.length !== 3) {
//     console.log('Wrong number of arguments');
//   } else {
//     const customer = args[1];
//     const dish = args[2];
//     const result = ingredientsForOneTagDishes(customer, dish);
//     if (result) {
//       console.log(`These ingredients can be added to ${dish}:`);
//       for (const l of result) {
//         console.log(`• ${l}`);
//       }
//     }
//   }
// } else if (scriptType === 'menu') {
//   if (args.length !== 3) {
//     console.log('Wrong number of arguments');
//   } else {
//     const result = generateMenu(args[1], args[2]);
//   }
// } else {
//   console.log(`Unexpected script type: ${scriptType}`);
// }

console.log("index.js loaded!");
