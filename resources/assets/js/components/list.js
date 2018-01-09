import React from 'react';

const renderList = (list, val, handleClick, icon) => {
  const i = `glyphicon ${icon}`;
  let btn = (listItem) => (
    <button className="btn btn-success" onClick={() => handleClick(listItem)}>
      <span className={i}></span>
    </button>
  );
  if (list.length === 1 &&
    (list[0] === 'Loading...' || list[0] === 'Check your spelling.' || list[0] === 'Search a breed.')) {
    btn = (x) => '';
    val = null;
  };
  return list.map(listItem => {
    if (val !== null) {
      const reg = new RegExp(val, 'gi');
      listItem = listItem.split(reg).reduce((res, curr, i, arr) => {
        if (i < arr.length - 1) {
          res.push(curr);
          res.push(<span key={ curr + reg.source } className="highlight">{ reg.source }</span>);
        } else {
          res.push(curr);
        }
        return res;
      }, []);
    }

    return (
      <li key={ listItem+icon } className="listItem">
        <span>{ listItem }</span>
        { btn(listItem) }
      </li>);
  });
}

const List = ({list, val, handleClick, icon}) => (
  <ul className="list">
    {renderList(list, val, handleClick, icon)}
  </ul>
);

export default List;
