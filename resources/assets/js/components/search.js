import React from 'react';
import { debounce } from 'lodash';
import DropdownList from '../containers/dropdown-list';

const handleDebounceEvent = (...args) => {
  const deb = debounce(...args);
  return function(e) {
    e.persist();
    return deb(e);
  }
}

const Search = ({ handleInput, handleClick }) => (
  <div className="search-container">
    <input className="search" type="text"
      onInput={handleDebounceEvent(handleInput, 500, { leading: true, trailing: true })}
      onKeyPress={handleDebounceEvent(handleInput, 500, { leading: true, trailing: true })}/>
    <DropdownList />
  </div>
)

export default Search;
