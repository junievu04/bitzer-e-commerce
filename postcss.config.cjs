// postcss.config.cjs
module.exports = {
  plugins: {
    "@pandacss/dev/postcss": {},
    "postcss-prune-var": {},
    "@csstools/postcss-cascade-layers": {},
    "postcss-preset-env": {},
  },
};
