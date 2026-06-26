import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function StartRecipeButton({ recipeId, type }) {
  const history = useHistory();

  const handleStartRecipe = () => {
    if (type === 'meal') {
      history.push(`/meals/${recipeId}/in-progress`);
      return;
    }

    history.push(`/drinks/${recipeId}/in-progress`);
  };

  return (
    <button
      type="button"
      onClick={ handleStartRecipe }
    >
      Start Recipe
    </button>
  );
}

StartRecipeButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['meal', 'drink']).isRequired,
};

export default StartRecipeButton;
