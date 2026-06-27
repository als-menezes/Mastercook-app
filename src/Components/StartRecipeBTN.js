import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function StartRecipeButton({ recipeId, type }) {
  const history = useHistory();

  const storageKey = type === 'meal' ? 'meals' : 'drinks';

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ) || {
    meals: {},
    drinks: {},
  };

  const isRecipeDone = doneRecipes.some(
    (recipe) => recipe.id === recipeId && recipe.type === type,
  );

  const isRecipeInProgress = Boolean(
    inProgressRecipes[storageKey]
      && inProgressRecipes[storageKey][recipeId],
  );

  const handleStartRecipe = () => {
    if (!isRecipeInProgress) {
      const updatedInProgressRecipes = {
        ...inProgressRecipes,
        [storageKey]: {
          ...inProgressRecipes[storageKey],
          [recipeId]: [],
        },
      };

      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(updatedInProgressRecipes),
      );
    }

    history.push(`/${type}s/${recipeId}/in-progress`);
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '16px',
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    zIndex: 1000,
    cursor: 'pointer',
  };

  if (isRecipeDone) return null;

  return (
    <button
      type="button"
      style={ buttonStyle }
      onClick={ handleStartRecipe }
    >
      {isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

StartRecipeButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['meal', 'drink']).isRequired,
};

export default StartRecipeButton;
