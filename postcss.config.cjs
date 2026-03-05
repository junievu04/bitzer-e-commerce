// postcss.config.cjs
module.exports = {
  plugins: {
    "@pandacss/dev/postcss": {},
    "postcss-prune-var": {},
    "postcss-preset-env": {},
    "@csstools/postcss-cascade-layers": {},
  },
};
