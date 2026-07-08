import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function RecipeActions({ recipe, type }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const favoriteRecipe = type === 'meal'
    ? {
      id: recipe.idMeal,
      type: 'meal',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    }
    : {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    setIsFavorite(
      favorites.some(
        (fav) => fav.id === recipeId && fav.type === type,
      ),
    );
  }, [recipeId, type]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (fav) => !(fav.id === favoriteRecipe.id && fav.type === favoriteRecipe.type),
      );

      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(updatedFavorites),
      );

      setIsFavorite(false);
      return;
    }

    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...favorites, favoriteRecipe]),
    );

    setIsFavorite(true);
  };

  const handleShare = async () => {
    const url = window.location.href;

    await navigator.clipboard.writeText(url);

    global.alert('Link copied!');
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleShare }
      >
        Share
      </button>

      <button
        type="button"
        onClick={ handleFavorite }
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

RecipeActions.propTypes = {
  recipe: PropTypes.oneOfType([
    PropTypes.shape({
      idMeal: PropTypes.string,
      strMeal: PropTypes.string,
      strMealThumb: PropTypes.string,
      strArea: PropTypes.string,
      strCategory: PropTypes.string,
    }),
    PropTypes.shape({
      idDrink: PropTypes.string,
      strDrink: PropTypes.string,
      strDrinkThumb: PropTypes.string,
      strAlcoholic: PropTypes.string,
      strCategory: PropTypes.string,
    }),
  ]).isRequired,
  type: PropTypes.oneOf(['meal', 'drink']).isRequired,
};

export default RecipeActions;
