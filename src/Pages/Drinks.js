import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../Context/RecipesContext';
import RecipeCard from '../Components/RecipeCard';
import { fetchDrinks, fetchDrinkCategories } from '../Services/cocktailAPI';
import { fetchMeals } from '../Services/mealAPI';

function Drinks() {
  const { drinks,
    setDrinks, meals, setMeals, loading, setLoading } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    const loadInitialDrinks = async () => {
      if (drinks.length === 0) {
        setLoading(true);

        const data = await fetchDrinks();
        setDrinks(data.drinks || []);

        setLoading(false);
      }
    };

    const loadInitialMeals = async () => {
      if (meals.length === 0) {
        setLoading(true);

        const data = await fetchMeals();
        setMeals(data.meals || []);

        setLoading(false);
      }
    };

    const loadCategories = async () => {
      const data = await fetchDrinkCategories();
      setCategories(data.drinks.slice(0, MAX_CATEGORIES));
    };

    loadInitialDrinks();
    loadInitialMeals();
    loadCategories();
  }, [drinks.length, meals.length, setDrinks, setMeals, setLoading]);

  const handleCategoryClick = async (categoryName) => {
    setLoading(true);

    if (selectedCategory === categoryName) {
      const data = await fetchDrinks();

      setDrinks(data.drinks || []);
      setSelectedCategory('');
      setLoading(false);
      return;
    }

    const data = await fetchDrinks(categoryName, 'category');

    setDrinks(data.drinks || []);
    setSelectedCategory(categoryName);
    setLoading(false);
  };

  const handleAllClick = async () => {
    setLoading(true);

    const data = await fetchDrinks();

    setDrinks(data.drinks || []);
    setSelectedCategory('');
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={ handleAllClick }
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={ category.strCategory }
            type="button"
            onClick={ () => handleCategoryClick(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
      </div>

      <div>
        {drinks.slice(0, MAX_RECIPES).map((drink) => (
          <RecipeCard
            key={ drink.idDrink }
            recipe={ drink }
            type="drink"
          />
        ))}
      </div>
    </div>
  );
}

export default Drinks;
