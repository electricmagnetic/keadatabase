import React, { useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import ColourInput from './ColourInput';

const BandComboSearchForm = ({ queryObject, setQueryObject }) => {
  const [form, setForm] = useState(queryObject);

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'symbols':
        setForm(prevState => ({
          ...prevState,
          [name]: value.toUpperCase(),
        }));
        break;
      default:
        setForm(prevState => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    setQueryObject(form);
  };

  return (
    <form className="BandComboSearchForm mb-3" onSubmit={handleSubmit}>
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
            onChange={handleChange}
            value={form.search}
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
              onChange={handleChange}
              value={form.symbols}
            />
          </div>
          <div className="col">
            <ColourInput
              selected={form.colours}
              onChange={selected =>
                setForm(prevState => ({
                  ...prevState,
                  colours: selected,
                }))
              }
            />
          </div>
          <div className="col">
            <label htmlFor="bird__status">Status</label>
            <select
              className="form-control"
              name="bird__status"
              id="bird__status"
              onChange={handleChange}
              value={form.bird__status}
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
              onChange={handleChange}
              value={form.style}
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
};

export default BandComboSearchForm;
