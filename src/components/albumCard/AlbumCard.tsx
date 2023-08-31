import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';

function AlbumCard({ artistName, artworkUrl100, collectionId,
  collectionName, collectionPrice, releaseDate, trackCount }:AlbumType) {
  return (
    <div className="album-card">

      <div className="album-cover">
        <img src={ artworkUrl100 } alt="Capa do álbum" />
      </div>
      <div>
        <h3>{artistName}</h3>
        <h4>{collectionName}</h4>
        <p>{`Preço: ${collectionPrice}`}</p>
        <p>{`Data de lançamento: ${releaseDate}`}</p>
        <p>{`Número de faixas: ${trackCount}`}</p>
      </div>
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <button>Ver album</button>
      </Link>
    </div>
  );
}

export default AlbumCard;
