import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useContext } from 'react';
import RecipesContext from '../Context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchMeals } from '../Services/mealAPI';
import { fetchDrinks } from '../Services/cocktailAPI';

export function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [filter, setFilter] = useState('ingredient');
  const [search, setSearch] = useState('');

  const location = useLocation();
  const history = useHistory();

  const { setMeals, setDrinks } = useContext(RecipesContext);

  const titles = {
    '/': 'Home',
    '/profile': 'Perfil',
    '/meals': 'Comidas',
    '/drinks': 'Bebidas',
  };

  const routesWithSearch = ['/meals', '/drinks'];
  const shouldShowSearch = routesWithSearch.includes(location.pathname);

  const handleSearchBTN = async (event) => {
    event.preventDefault();

    const isMealsPage = location.pathname === '/meals';
    const isDrinksPage = location.pathname === '/drinks';

    if (isMealsPage) {
      const data = await fetchMeals(search, filter);
      setShowSearch(false);

      if (!data.meals || data.meals.length === 0) {
        global.alert('Nenhuma receita encontrada para esses filtros.');
        return;
      }

      if (data.meals.length === 1) {
        const recipeId = data.meals[0].idMeal;
        history.push(`/meals/${recipeId}`);
        return;
      }

      setMeals(data.meals);
      history.push('/meals');
      return;
    }

    if (isDrinksPage) {
      const data = await fetchDrinks(search, filter);
      setShowSearch(false);

      if (!data.drinks || data.drinks.length === 0) {
        global.alert('Nenhuma receita encontrada para esses filtros.');
        return;
      }

      if (data.drinks.length === 1) {
        const recipeId = data.drinks[0].idDrink;
        history.push(`/drinks/${recipeId}`);
        return;
      }

      setDrinks(data.drinks);
      history.push('/drinks');
    }
  };

  return (
    <header>
      <h1>{titles[location.pathname] || 'Página'}</h1>

      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          alt="profile-avatar"
        />
      </button>

      {shouldShowSearch && (
        <button
          type="button"
          onClick={ () => setShowSearch(!showSearch) }
        >
          <img src={ searchIcon } alt="Search icon" />
        </button>
      )}

      {showSearch && (
        <form onSubmit={ handleSearchBTN }>
          <input
            type="text"
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />

          <label>
            <input
              type="radio"
              name="search-filter"
              value="ingredient"
              checked={ filter === 'ingredient' }
              onChange={ (e) => setFilter(e.target.value) }
            />
            Ingrediente
          </label>

          <label>
            <input
              type="radio"
              name="search-filter"
              value="name"
              checked={ filter === 'name' }
              onChange={ (e) => setFilter(e.target.value) }
            />
            Nome
          </label>

          <label>
            <input
              type="radio"
              name="search-filter"
              value="first-letter"
              checked={ filter === 'first-letter' }
              onChange={ (e) => setFilter(e.target.value) }
            />
            Primeira letra
          </label>

          <button type="submit">
            Buscar
          </button>
        </form>
      )}
    </header>
  );
}
