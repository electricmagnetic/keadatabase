import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typeahead, Token } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import colours from '../helpers/colours';

class ColourInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  _renderMenuItemChildren(colour, props, index) {
    const style = {
      background: colour.hex,
      color: 'transparent',
      marginRight: '.5rem',
    };
    if (colour.value === 'white') style.border = '1px solid #ddd';
    return (
      <React.Fragment key={index}>
        <span style={style}>colour</span>
        <span>{colour.label}</span>
      </React.Fragment>
    );
  }

  _renderToken(colour, props, index) {
    const style = {
      background: colour.hex,
      color: 'transparent',
      width: '22%',
    };
    if (colour.value === 'white') style.border = '1px solid #ddd';
    return (
      <Token option={colour} key={index} onRemove={props.onRemove} style={style}>
        colour
      </Token>
    );
  }

  handleChange(selected) {
    const coloursString = selected.map(colour => colour.value).join(',');
    this.props.onChange(coloursString);
  }

  render() {
    var colourOptions = colours
      ? Object.keys(colours).map(colour => ({
          label: colours[colour].name,
          value: colour,
          hex: colours[colour].hex,
        }))
      : [];

    // create selected array based on props.selected strings
    const selected = this.props.selected
      ? this.props.selected.split(',').map(value => {
          return colourOptions.find(colour => colour.value === value);
        })
      : [];

    var emptyLabel = '';
    if (selected.length >= 4) {
      colourOptions = selected;
      emptyLabel = 'Max of 4 colours';
    }

    return (
      <React.Fragment>
        <label htmlFor="colours">Colours</label>
        <Typeahead
          id="colours"
          multiple
          options={colourOptions}
          onChange={this.handleChange}
          emptyLabel={emptyLabel}
          selected={selected}
          renderMenuItemChildren={this._renderMenuItemChildren}
          renderToken={this._renderToken}
          clearButton
        />
      </React.Fragment>
    );
  }
}

ColourInput.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ColourInput;
