import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BEARER, HOST} from '../Endpoints';

export const useFetch = (
  url,
  method,
  needsAuth = true,
  game,
  force = false,
) => {
  const token = React.useRef();
  const cache = React.useRef({});

  const initialState = {
    status: 'idle',
    error: null,
    data: [],
  };

  const isExpired = date => {
    const minutes = 1000 * 60;
    return (new Date().getTime() - new Date(date).getTime()) / minutes > 1;
  };

  const [state, dispatch] = React.useReducer((data, action) => {
    switch (action.type) {
      case 'FETCHING':
        return {...initialState, status: 'fetching'};
      case 'FETCHED':
        return {...initialState, status: 'fetched', data: action.payload};
      case 'FETCH_ERROR':
        return {...initialState, status: 'error', error: action.payload};
      default:
        return data;
    }
  }, initialState);

  React.useEffect(() => {
    let cancelRequest = false;
    if (!url || !url.trim()) {
      return;
    }

    const fetchData = async () => {
      //Start fetch proccess
      dispatch({type: 'FETCHING'});

      //Check if data exist and if expired
      if (
        cache.current[game] &&
        !isExpired(cache.current[game].date) &&
        !!token.current
      ) {
        const data = cache.current[game];
        dispatch({type: 'FETCHED', payload: data});
      } else {
        try {
          if (!token.current && needsAuth) {
            token.current = await AsyncStorage.getItem('token');
          }

          let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          };

          const response = await fetch(`${HOST}${url}`, {
            method,
            headers: needsAuth
              ? {
                  ...headers,
                  Authorization: `${BEARER}${token.current}`,
                }
              : headers,
          });

          const data = await response.json();

          cache.current[game] = {...data, date: new Date().toISOString()};

          if (cancelRequest) {
            return;
          }

          dispatch({
            type: 'FETCHED',
            payload: {...data, date: new Date().toISOString()},
          });
        } catch (error) {
          if (cancelRequest) {
            return;
          }

          dispatch({type: 'FETCH_ERROR', payload: error.message});
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url, force, game, method, needsAuth]);

  return state;
};
