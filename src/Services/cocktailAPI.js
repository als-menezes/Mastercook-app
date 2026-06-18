const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const fetchDrinks = async (search = '', filter = '') => {
  let endpoint = '';

  if (!search) {
    endpoint = 'filter.php?c=Cocktail';
  } else if (filter === 'ingredient') {
    endpoint = `filter.php?i=${search}`;
  } else if (filter === 'name') {
    endpoint = `search.php?s=${search}`;
  } else if (filter === 'first-letter') {
    endpoint = `search.php?f=${search}`;
  } else if (filter === 'category') {
    endpoint = `filter.php?c=${search}`;
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`);
  const data = await response.json();

  return {
    drinks: Array.isArray(data.drinks) ? data.drinks : [],
  };
};

export const fetchDrinkCategories = async () => {
  const response = await fetch(`${BASE_URL}/list.php?c=list`);
  const data = await response.json();

  return {
    drinks: Array.isArray(data.drinks) ? data.drinks : [],
  };
};
