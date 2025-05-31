import { useState, useRef, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartIcon from '../../assets/icons/CartIcon';
import UserIcon from '../../assets/icons/UserIcon';
import SearchIcon from '../../assets/icons/SearchIcon';
import Logo from '../../assets/icons/LogoIcon';
import MenuIcon from '../../assets/icons/MenuIcon';
import styles from '../Header/NavMenu.module.scss';

const NavMenu = memo(({ onProfileClick }) => {
  const { cartItems } = useCart();
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    if (trimmedValue) {
      alert(`Вы ищете: ${trimmedValue}`);
      // Здесь можно добавить переход на страницу поиска
      // или выполнить поиск через API
    }
  }, [searchValue]);

  const clearSearch = useCallback(() => {
    setSearchValue('');
    searchInputRef.current?.focus();
  }, []);

  const focusSearchInput = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const navItems = [
  { path: "/about", label: "О нас" },
  { path: "/blog", label: "Блог" },
  { path: "/contacts", label: "Контакты" },
  { path: "/delivery", label: "Доставка" },
  ...(isAdmin ? [{ path: "/admin/orders", label: "Заказы (admin)" }] : [])
];


  return (
    <header className={styles.menu} role="banner">
      <div className={styles.leftMenu}>
        <Link to="/" className={styles.logo} aria-label="На главную">
          <Logo />
        </Link>
        
        <nav className={styles.navigation} aria-label="Основное меню">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.rightMenu}>
        <form 
          className={styles.searchForm} 
          onSubmit={handleSearchSubmit}
          role="search"
        >
          <div className={styles.searchContainer}>
            <input
              ref={searchInputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Поиск..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Поиск по сайту"
            />
            
            {searchValue && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={clearSearch}
                aria-label="Очистить поиск"
                tabIndex={searchValue ? 0 : -1}
              >
                ×
              </button>
            )}
            
            <button
              type="submit"
              className={styles.searchButton}
              onClick={focusSearchInput}
              aria-label="Выполнить поиск"
              disabled={!searchValue.trim()}
            >
              <SearchIcon className={styles.searchIcon} />
            </button>
          </div>
        </form>

        <button 
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Мобильное меню"
        >
          <span>Меню</span>
          <MenuIcon className={styles.menuIcon} />
        </button>

        <Link 
          to="/cart" 
          className={styles.cartButton} 
          aria-label={`Корзина, ${cartItems.length} товаров`}
        >
          <CartIcon className={styles.cartIcon} />
          {cartItems.length > 0 && (
            <span className={styles.cartBadge} aria-hidden="true">
              {cartItems.length}
            </span>
          )}
        </Link>

        <button 
          className={styles.profileButton}
          onClick={onProfileClick}
          aria-label="Профиль пользователя"
        >
          <UserIcon className={styles.profileIcon} />
        </button>
      </div>
    </header>
  );
});

NavMenu.displayName = 'NavMenu'; // Для отладки в React DevTools

export default NavMenu;