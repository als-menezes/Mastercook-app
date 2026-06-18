import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MealDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  const youtubeEmbedUrl = recipe.strYoutube
    ? recipe.strYoutube.replace('watch?v=', 'embed/')
    : '';

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
    </div>
  );
}

export default MealDetails;
