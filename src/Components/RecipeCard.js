import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const { pathname } = useLocation();

  const isMeal = pathname.includes('/meals');

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
};

export default RecipeCard;
