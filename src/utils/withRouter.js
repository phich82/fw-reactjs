import React from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const withRouter = (Component)  => {
  return function ComponentWithRouter(props) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const getQueryParams = () => {
      let qs = {};
      for (const [key, value] of searchParams) {
        qs[key] = value;
      }
      return qs;
    };

    return (
      <Component
        {...props}
        navigation={{
          params,
          navigate,
          location,
          searchParams,
          setSearchParams,
          paramsQuery: getQueryParams(),
        }}
      />
    );
  };
};

export default withRouter;
