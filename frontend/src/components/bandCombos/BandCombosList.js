import React from 'react';
import { useQuery } from 'react-query';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';
import Bird from '../birds/Bird';

const API_PATH = `band_combos`;

// TODO: Fix key (band combos don't always have bird?)

const BandCombosList = ({ queryObject }) => {
  const baseQuery = {
    ordering: 'bird__bird_extended,bird__name',
  };

  const { isLoading, data, error } = useQuery([
    `${API_PATH}/`,
    Object.assign({}, baseQuery, queryObject),
  ]);

  if (isLoading || !data) return <Loader />;
  else if (error) return <Error />;
  else if (data) {
    const bandCombos = data.results.results;

    return (
      <div className="BandCombosList">
        <div className="row">
          {bandCombos.length === 0 && (
            <div className="col-12">
              <h3>No birds found with that search criteria.</h3>
            </div>
          )}
          {bandCombos.map(bandCombo => (
            <div className="col-6 col-sm-4 col-lg-3 mb-3" key={bandCombo.bird.slug}>
              <Bird bird={bandCombo.bird} type="card" />
            </div>
          ))}
        </div>
      </div>
    );
  } else return null;
};

export default BandCombosList;
