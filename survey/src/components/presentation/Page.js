import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import './Page.scss';

const API_URL = `${process.env.REACT_APP_WORDPRESS_API}/pages/?per_page=100`;

const Page = props => {
  const { data, error, isValidating } = useSWR(`${API_URL}`);

  const { hideTitle, id } = props;

  // Add sr-only (screen-reader only) class
  const className = hideTitle ? 'sr-only' : '';

  if (isValidating) return <Loader />;
  else if (error) return <Error />;
  else if (data) {
    const page = data.find(page => page.id === id);

    return (
      <div className="Page">
        <div className="Page-content" key={page.id}>
          <h2 dangerouslySetInnerHTML={{ __html: page.title.rendered }} className={className} />
          <p dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </div>
      </div>
    );
  } else return null;
};

Page.propTypes = {
  id: PropTypes.number.isRequired,
  hideTitle: PropTypes.bool.isRequired,
};

Page.defaultProps = {
  hideTitle: false,
};

export default Page;
