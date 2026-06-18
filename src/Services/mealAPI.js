const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchMeals = async (search = '', filter = '') => {
  let endpoint = '';

  if (!search) {
    endpoint = 'search.php?s=';
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
    meals: Array.isArray(data.meals) ? data.meals : [],
  };
};

export const fetchMealCategories = async () => {
  const response = await fetch(`${BASE_URL}/list.php?c=list`);
  const data = await response.json();

  return {
    meals: Array.isArray(data.meals) ? data.meals : [],
  };
};
