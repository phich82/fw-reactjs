import React, { useRef } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParams = () => {
    let qs = {};
    for (const [key, value] of searchParams) {
      qs[key] = value;
    }
    return qs;
  };

  return {
    navigate,
    location,
    params,
    searchParams,
    setSearchParams,
    paramsQuery: getQueryParams(),
  };
};

export default useNavigation;
