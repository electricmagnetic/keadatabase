import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GridTileTypeahead from './GridTileTypeahead';
import GridTileSelectMap from '../map/GridTileSelectMap';
import GridTile from './GridTile';
import Error from '../helpers/Error';

import './GridTileTool.scss';

/**
  Provides a typeahead interface, returning a single GridTile.
*/
class GridTileTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridTiles: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setGridTiles = this.setGridTiles.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  setGridTiles(name, value) {
    // Name does not have an effect, just retained for compatibility with GridTileSelectMap.
    this.setState({ gridTiles: value });
  }

  render() {
    const hasTile = this.state.gridTiles.length > 0 ? true : false;

    return (
      <div className="GridTileTool">
        {this.state.gridTiles && (
          <h2 className="d-none d-print-block my-5">
            <small>Grid Tiles, Kea Survey Tool</small>
            <br />
            {this.state.gridTiles.join(' ')}
          </h2>
        )}
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className="col-md-9">
              <GridTileSelectMap
                {...this.props}
                values={{ gridTiles: this.state.gridTiles }}
                setFieldValue={this.setGridTiles}
              />
            </div>
            <div className="col-md-3">
              <div className="InformationBox bg-faded">
                <form onSubmit={this.handleSubmit} className="form d-print-none mb-3">
                  <div className="form-group">
                    <label htmlFor="gridTile">Select grid tiles to view</label>
                    <GridTileTypeahead
                      onChange={selected => this.setGridTiles('gridTiles', selected)}
                      autoFocus
                      selected={this.state.gridTiles}
                      multiple
                    />
                  </div>
                </form>
                <div className="result">
                  {hasTile ? (
                    this.state.gridTiles.map(gridTileId => (
                      <GridTile id={gridTileId} key={gridTileId} type="card" hideImage addLink />
                    ))
                  ) : (
                    <Error message="No grid tiles selected" info />
                  )}
                </div>
                <div className="print d-print-none">
                  <button type="button" className="btn btn-primary" onClick={() => window.print()}>
                    <i className="fa-fw fas fa-print mr-2"></i>
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GridTileTool.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
};

export default GridTileTool;
