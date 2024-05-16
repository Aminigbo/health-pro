import {
  INITIALIZED,
  USER,
  PRODUCTS,
  NOTIFICATION,
  SCHEDULES,
  INSURANCE
} from "../state/types";


export const initAuth = () => {
  return {
    type: INITIALIZED,

  };
};



export const User = (payload) => {
  return {
    type: USER,
    payload

  };
};

export const Insurance_ = (payload) => {
  return {
    type: INSURANCE,
    payload

  };
};

export const Schedules_ = (payload) => {
  return {
    type: SCHEDULES,
    payload

  };
};

export const Products = (payload) => {
  return {
    type: PRODUCTS,
    payload

  };
};

export const Notification = (payload) => {
  return {
    type: NOTIFICATION,
    payload

  };
}; 