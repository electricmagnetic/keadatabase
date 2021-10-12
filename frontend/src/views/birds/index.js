import React from 'react';
import { Helmet } from 'react-helmet';
import { useQueryParams, StringParam, NumberParam, withDefault } from 'use-query-params';

import BandCombosList from '../../components/bandCombos/BandCombosList';
import BandComboSearchForm from '../../components/bandCombos/BandComboSearchForm';
import Banner from '../../components/presentation/Banner';

const BirdsPage = () => {
  const [queryObject, setQueryObject] = useQueryParams({
    style: withDefault(StringParam, ''),
    bird__status: withDefault(StringParam, ''),
    colours: withDefault(StringParam, ''),
    symbols: withDefault(StringParam, ''),
    search: withDefault(StringParam, ''),
    page_size: withDefault(NumberParam, 408),
  });

  return (
    <div className="BirdsPage">
      <Helmet title="Birds" />
      <Banner size="small" className="mb-3">
        <h1 className="mb-3">Search Birds</h1>
        <BandComboSearchForm queryObject={queryObject} setQueryObject={setQueryObject} />
      </Banner>
      <div className="container">
        <BandCombosList queryObject={queryObject} />
      </div>
    </div>
  );
};

export default BirdsPage;
