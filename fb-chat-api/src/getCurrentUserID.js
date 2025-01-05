"use strict";

module.exports = (defaultFuncs, api, ctx) => {
  return () => {
    return ctx.i_userID || ctx.userID;
  };
};