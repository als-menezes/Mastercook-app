import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid #ddd',
  },
  icon: {
    width: '36px',
    cursor: 'pointer',
  },
};

function Footer() {
  return (
    <footer style={ styles.footer }>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="Comidas"
          style={ styles.icon }
        />
      </Link>

      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="Bebidas"
          style={ styles.icon }
        />
      </Link>
    </footer>
  );
}

export default Footer;
