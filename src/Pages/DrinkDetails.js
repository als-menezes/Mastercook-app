import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DrinkDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
      />

      <h1>{recipe.strDrink}</h1>

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
              {recipe[`strMeasure${index + 1}`] || ''}
            </li>
          ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.strInstructions}</p>

    </div>
  );
}

export default DrinkDetails;
