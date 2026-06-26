import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function StartRecipeButton({ recipeId, type }) {
  const history = useHistory();

  const handleStartRecipe = () => {
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

  return (
    <button
      type="button"
      style={ buttonStyle }
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
