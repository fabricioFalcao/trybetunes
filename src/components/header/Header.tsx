import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';

function Header() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [userName, setUserName] = useState();

  useEffect(() => {
    const fetchUserName = async () => {
      const { name } = await getUser();
      setUserName(name);
      setCarregando(false);
    };
    fetchUserName();
  }, []);

  return (
    <header data-testid="header-component">
      <nav>
        <NavLink data-testid="link-to-search" to="/search">Pesquisa</NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      </nav>
      <br />
      {carregando ? (<p>Carregando...</p>)
        : (<p data-testid="header-user-name">{userName}</p>)}
      <br />
    </header>
  );
}

export default Header;
