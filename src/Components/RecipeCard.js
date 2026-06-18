import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, type }) {
  const isMeal = type === 'meal';

  const id = isMeal ? recipe.idMeal : recipe.idDrink;
  const name = isMeal ? recipe.strMeal : recipe.strDrink;
  const image = isMeal ? recipe.strMealThumb : recipe.strDrinkThumb;

  return (
    <Link to={ `${isMeal ? '/meals' : '/drinks'}/${id}` }>
      <div>
        <img
          src={ image }
          alt={ name }
          width="150"
        />

        <p>{name}</p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.oneOfType([
    PropTypes.shape({
      idMeal: PropTypes.string,
      strMeal: PropTypes.string,
      strMealThumb: PropTypes.string,
    }),
    PropTypes.shape({
      idDrink: PropTypes.string,
      strDrink: PropTypes.string,
      strDrinkThumb: PropTypes.string,
    }),
  ]).isRequired,
  type: PropTypes.oneOf(['meal', 'drink']).isRequired,
};

export default RecipeCard;
