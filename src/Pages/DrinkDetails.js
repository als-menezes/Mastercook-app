import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import RecipeCard from '../Components/RecipeCard';
import StartRecipeButton from '../Components/StartRecipeBTN';
import RecipeActions from '../Components/RecipeActions';

function DrinkDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { meals, setMeals } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);

      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      const data = await response.json();

      setRecipe(data.drinks[0]);
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const loadRecommendedMeals = async () => {
      if (meals.length === 0) {
        const data = await fetchMeals();

        setMeals(data.meals || []);
      }
    };

    loadRecommendedMeals();
  }, [meals.length, setMeals]);

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  const MAX_RECOMMENDATIONS = 6;

  const recommendedMeals = meals.slice(0, MAX_RECOMMENDATIONS);

  return (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
      />

      <h1>{recipe.strDrink}</h1>
      <RecipeActions
        recipe={ recipe }
        type="drink"
      />

      <p>

        {recipe.strCategory}
        {' '}
        -
        {recipe.strAlcoholic}

      </p>

      <h3>Ingredients</h3>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.includes('strIngredient') && recipe[key])
          .map((key, index) => (
            <li key={ index }>
              {recipe[key]}
              {' '}
              -
              {recipe[`strMeasure${index + 1}`] || ''}
            </li>
          ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.strInstructions}</p>

      <h3>Recommended Meals</h3>

      <div className="recommendations-carousel">
        {recommendedMeals.map((meal) => (
          <div
            key={ meal.idMeal }
            className="recommendation-card"
          >
            <RecipeCard
              recipe={ meal }
              type="meal"
            />
          </div>
        ))}
      </div>
      <StartRecipeButton
        recipeId={ recipe.idDrink }
        type="drink"
      />
    </div>
  );
}

export default DrinkDetails;
