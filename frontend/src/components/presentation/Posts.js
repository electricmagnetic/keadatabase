import React from 'react';
import useSWR from 'swr';
import Moment from 'react-moment';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import './Posts.scss';

const API_URL = `${process.env.REACT_APP_WORDPRESS_API}/posts/?per_page=1`;

const Post = ({ post }) => {
  return (
    <li className="Post mb-3">
      <a href={post.link}>
        <h3 className="h5 mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </a>
      <h4 className="h6">
        <Moment format="dddd DD MMMM YYYY [at] h:mm a">{post.date}</Moment>
      </h4>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
    </li>
  );
};

const Posts = props => {
  const { data, error, isValidating } = useSWR(`${API_URL}`);

  if (isValidating) return <Loader />;
  else if (error) return <Error />;
  else if (data) {
    return (
      <div className="Posts">
        <ul className="list-unstyled">
          {data.map(post => (
            <Post post={post} key={post.id} />
          ))}
        </ul>
      </div>
    );
  } else return null;
};

export default Posts;
