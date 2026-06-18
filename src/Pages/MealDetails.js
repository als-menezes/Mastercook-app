import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import RecipeCard from '../Components/RecipeCard';
import { fetchDrinks } from '../Services/cocktailAPI';

function MealDetails() {
  const { id } = useParams();
  const { drinks, setDrinks } = useContext(RecipesContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const MAX_RECOMMENDATIONS = 6;

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      const data = await response.json();

      setRecipe(data.meals[0]);
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const loadRecommendedDrinks = async () => {
      if (drinks.length === 0) {
        const data = await fetchDrinks();

        setDrinks(data.drinks || []);
      }
    };

    loadRecommendedDrinks();
  }, [drinks.length, setDrinks]);

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  const youtubeEmbedUrl = recipe.strYoutube
    ? recipe.strYoutube.replace('watch?v=', 'embed/')
    : '';

  const recommendedDrinks = drinks.slice(0, MAX_RECOMMENDATIONS);

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />

      <h1>{recipe.strMeal}</h1>

      <p>{recipe.strCategory}</p>

      <h3>Ingredients</h3>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.includes('strIngredient') && recipe[key])
          .map((key, index) => (
            <li key={ index }>
              {recipe[key]}
              {' '}
              -
              {' '}
              {recipe[`strMeasure${index + 1}`] || ''}
            </li>
          ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.strInstructions}</p>

      {youtubeEmbedUrl && (
        <>
          <h3>Video</h3>
          <iframe
            width="560"
            height="315"
            src={ youtubeEmbedUrl }
            title={ recipe.strMeal }
            allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </>
      )}

      <h3>Recommended Drinks</h3>

      <div className="recommendations-carousel">
        {recommendedDrinks.map((drink) => (
          <div
            key={ drink.idDrink }
            className="recommendation-card"
          >
            <RecipeCard
              recipe={ drink }
              type="drink"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealDetails;
