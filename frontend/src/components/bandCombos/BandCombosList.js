import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';
import Bird from '../birds/Bird';

// TODO: Fix key (band combos don't always have bird?)

class BandCombosList extends Component {
  render() {
    const { bandCombos } = this.props;

    if (bandCombos.pending) return <Loader />;
    else if (bandCombos.rejected) return <Error reason={bandCombos.value.message} />;
    else if (bandCombos.fulfilled) {
      return (
        <div className="BandCombosList">
          <div className="row">
            {bandCombos.value.results.length === 0 && (
              <div className="col-12">
                <h3>No birds found with that search criteria.</h3>
              </div>
            )}
            {bandCombos.value.results.map(bandCombo => (
              <div className="col-6 col-sm-4 col-lg-3 mb-3" key={bandCombo.bird.slug}>
                <Bird bird={bandCombo.bird} type="card" />
              </div>
            ))}
          </div>
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = state => {
  return { bandCombos: state.bandCombos };
};

export default connect(mapStateToProps)(BandCombosList);
