import { useState } from 'react';

function Search() {
  const [artist, setArtist] = useState<string>('');

  return (
    <div className="search-container">
      <form action="">
        <input
          type="text"
          data-testid="search-artist-input"
          value={ artist }
          onChange={ ({ target }) => setArtist(target.value) }
        />
      </form>
    </div>
  );
}

export default Search;
