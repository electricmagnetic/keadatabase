import React from 'react';
import { Helmet } from 'react-helmet';

import BandCombosList from '../../components/bandCombos/BandCombosList';
import BandComboSearchForm from '../../components/bandCombos/BandComboSearchForm';
import Banner from '../../components/presentation/Banner';

const BirdsPage = props => {
  return (
    <div className="BirdsPage">
      <Helmet title="Birds" />
      <Banner size="small" className="mb-3">
        <h1 className="mb-3">Search Birds</h1>
        <BandComboSearchForm />
      </Banner>
      <div className="container">
        <BandCombosList />
      </div>
    </div>
  );
};

export default BirdsPage;
