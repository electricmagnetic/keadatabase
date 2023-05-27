import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

import GridTile from './GridTile';
import Loader from '../helpers/Loader';
import Error from '../helpers/Error';
import getUniqueGridTiles from '../helpers/getUniqueGridTiles';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/hours/?page_size=120`;

/**
  Displays grid tiles condensed from survey hours.
 */
const GridTilesFromSurveyHours = ({ limit, classes, ...others }) => {
  const { data, error, isValidating } = useSWR(`${API_URL}`, { dedupingInterval: 0 });

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error message="Error loading grid tiles" />;
  } else if (data) {
    const gridTileIds = getUniqueGridTiles(data.results).slice(0, limit);

    return (
      <div className="RecentGridTiles">
        <div className="form-row my-n3">
          {gridTileIds.map(gridTileId => (
            <div className={classes} key={gridTileId}>
              <Link to={`/grid/${gridTileId}`}>
                <GridTile id={gridTileId} {...others} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } else return null;
};

GridTilesFromSurveyHours.propTypes = {
  limit: PropTypes.number.isRequired,
  classes: PropTypes.string.isRequired,
};

GridTilesFromSurveyHours.defaultProps = {
  limit: 4,
  classes: 'col-6 col-md-4 col-lg-3',
};

export default GridTilesFromSurveyHours;
