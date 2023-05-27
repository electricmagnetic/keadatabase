import React from 'react';
import { Typeahead, MenuItem, Menu } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import './GridTileTypeahead.scss';
import tiles from '../../assets/geo/tiles.json';

/**
  Displays a label (if given) otherwise display grid tile result itself.
  This resolves a bug with displaying the paginationText vs a grid tile result.
 */
const renderMenuItem = (result, index) => {
  if (result.label) {
    return (
      <MenuItem option={result} position={index} key={result}>
        {result.label}
      </MenuItem>
    );
  } else {
    return (
      <MenuItem option={result} position={index} key={result}>
        <div className="MenuItemTileImage mr-3">
          <img
            src={tiles.features.find(tile => tile.id === result).properties.get_small_image}
            alt={`Tile of ${result}`}
          />
        </div>
        {result}
      </MenuItem>
    );
  }
};

/**
  Provides a common typeahead component for selecting grid tiles.
 */
const GridTileTypeahead = ({ ...props }) => (
  <Typeahead
    className="GridTileTypeahead"
    options={tiles.features.map(feature => feature.id)}
    minLength={3}
    selectHintOnEnter
    highlightOnlyResult
    name="gridTile"
    placeholder="Grid ID (XXXX-XX)"
    id="gridTile"
    ignoreDiacritics={false}
    maxResults={8}
    paginationText="Display more…"
    renderMenu={(results, menuProps) => (
      <Menu {...menuProps}>{results.map((result, index) => renderMenuItem(result, index))}</Menu>
    )}
    {...props}
  />
);

export default GridTileTypeahead;
