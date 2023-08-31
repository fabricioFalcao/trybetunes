import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';
import Search from './pages/search/Search';
import Album from './pages/album/Album';
import Favorites from './pages/favorites/Favorites';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profileEdit/ProfileEdit';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
      </Route>
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
