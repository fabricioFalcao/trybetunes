import { useEffect, useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Carregando from '../../components/carregando/Carregando';
import { AlbumType } from '../../types';
import AlbumCard from '../../components/albumCard/AlbumCard';

function Search() {
  const [inputArtist, setInputArtist] = useState('');
  const [artist, setArtist] = useState('');
  const [carregando, setCarregando] = useState<boolean>(false);
  const [renderSearch, setRenderSearch] = useState<boolean>(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('myList'));
    if (storedList) {
      setRenderSearch(true);
      setAlbums(storedList);
      setInputArtist('');
      setCarregando(false);
    }
  }, []);

  const handleSearch = async () => {
    setCarregando(true);
    setArtist(inputArtist);
    const albumsList = await searchAlbumsAPI(inputArtist);
    localStorage.setItem('myList', JSON.stringify(albumsList));
    setRenderSearch(true);
    setAlbums(albumsList);
    setInputArtist('');
    setCarregando(false);
  };

  if (carregando) {
    return (<Carregando />);
  }

  return (
    <>
      <div className="search-container">
        <form action="" className="form">
          <input
            type="text"
            data-testid="search-artist-input"
            value={ inputArtist }
            onChange={ ({ target }) => setInputArtist(target.value) }
            placeholder="Nome do artista"
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ inputArtist.length < 2 }
            onClick={ handleSearch }
          >
            Pesquisar
          </button>
        </form>
      </div>
      {renderSearch
      && <div>
        {albums.length
          ? <section>
            <h3>{`Resultado de álbuns de: ${artist}`}</h3>
            <div className="albums-panel">
              {albums.map((album) => (
                <AlbumCard { ...album } key={ album.collectionId } />))}
            </div>
          </section>
          : <h1>Nenhum álbum foi encontrado</h1>}
         </div>}
    </>
  );
}

export default Search;
