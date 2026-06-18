import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../Context/RecipesContext';
import RecipeCard from '../Components/RecipeCard';
import { fetchMeals, fetchMealCategories } from '../Services/mealAPI';

function Meals() {
  const { meals, setMeals, loading, setLoading } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    const loadInitialMeals = async () => {
      if (meals.length === 0) {
        setLoading(true);

        const data = await fetchMeals();
        setMeals(data.meals || []);

        setLoading(false);
      }
    };

    const loadCategories = async () => {
      const data = await fetchMealCategories();
      setCategories(data.meals.slice(0, MAX_CATEGORIES));
    };

    loadInitialMeals();
    loadCategories();
  }, [meals.length, setMeals, setLoading]);

  const handleCategoryClick = async (categoryName) => {
    setLoading(true);

    if (selectedCategory === categoryName) {
      const data = await fetchMeals();

      setMeals(data.meals || []);
      setSelectedCategory('');
      setLoading(false);
      return;
    }

    const data = await fetchMeals(categoryName, 'category');

    setMeals(data.meals || []);
    setSelectedCategory(categoryName);
    setLoading(false);
  };

  const handleAllClick = async () => {
    setLoading(true);

    const data = await fetchMeals();

    setMeals(data.meals || []);
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
        {meals.slice(0, MAX_RECIPES).map((meal) => (
          <RecipeCard
            key={ meal.idMeal }
            recipe={ meal }
            type="meal"
          />
        ))}
      </div>
    </div>
  );
}

export default Meals;
