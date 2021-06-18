import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import getBandCombos from '../../actions/bandCombos';
import ColourInput from './ColourInput';

class BandComboSearchForm extends Component {
  constructor(props) {
    super(props);
    const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    this.state = {
      style: query.style || '',
      study_area: query.study_area || '',
      bird__status: query.bird__status || '',
      colours: query.colours || '',
      symbols: query.symbols || '',
      is_extended: 1,
      is_featured: 1,
      search: query.search || '',
      page_size: 408,
      ordering: 'bird__bird_extended,bird__name',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getBandCombos(qs.stringify(this.state)));
  }

  handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case 'symbols':
        this.setState({ [name]: value.toUpperCase() });
        break;
      default:
        this.setState({ [name]: value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(getBandCombos(qs.stringify(this.state)));
    const visibleQuery = qs.stringify({
      style: this.state.style,
      study_area: this.state.study_area,
      bird__status: this.state.bird__status,
      colours: this.state.colours,
      symbols: this.state.symbols,
      search: this.state.search,
    });
    this.props.history.push(`/birds?${visibleQuery}`);
  }

  render() {
    return (
      <form className="BandComboSearchForm mb-3" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="search"
              id="search"
              onChange={this.handleChange}
              value={this.state.search}
              placeholder="Search by name (e.g. Schist) or metal band (e.g. V-1696) or band combo (e.g. Black K on White)"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
        <a data-toggle="collapse" href="#advanced" aria-expanded="false" aria-controls="advanced">
          Advanced Search +
        </a>
        <div id="advanced" className="collapse">
          <div className="form-row">
            <div className="col">
              <label htmlFor="symbols">Symbols</label>
              <input
                type="text"
                className="form-control"
                name="symbols"
                id="symbols"
                onChange={this.handleChange}
                value={this.state.symbols}
              />
            </div>
            <div className="col">
              <ColourInput
                selected={this.state.colours}
                onChange={selected => this.setState({ colours: selected })}
              />
            </div>
            <div className="col">
              <label htmlFor="bird__status">Status</label>
              <select
                className="form-control"
                name="bird__status"
                id="bird__status"
                onChange={this.handleChange}
                value={this.state.bird__status}
              >
                <option value="">All</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="style">Style</label>
              <select
                className="form-control"
                name="style"
                id="style"
                onChange={this.handleChange}
                value={this.state.style}
              >
                <option value="">All</option>
                <option value="new">New</option>
                <option value="old">Old</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { bandCombos: state.bandCombos };
};

export default compose(withRouter, connect(mapStateToProps))(BandComboSearchForm);
