import React from 'react';
import Helmet from 'react-helmet';

import GridTile from '../../components/grid/GridTile';
import Banner from '../../components/presentation/Banner';

const GridDetailPage = ({ match }) => {
  const slug = match.params.slug;

  return (
    <div className="GridDetailPage">
      <Helmet title={`${slug} (Grid Tile)`} />
      <section className="mb-5">
        <Banner size="small" additionalClasses="d-print-none">
          <h1>Grid Tile {slug}</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <GridTile id={slug} type="page" />
        </div>
      </section>
    </div>
  );
};

export default GridDetailPage;
