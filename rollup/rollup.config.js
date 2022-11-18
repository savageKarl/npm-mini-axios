const path = require("path");
const ts = require("rollup-plugin-typescript2");
const del = require("rollup-plugin-delete");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");

const config = require("../config/config.js");

const { srcLibsPath, devLibsPath, distPath } = config;

const env = process.env.NODE_ENV;

const output = [
  {
    format: "esm",
    file: path.resolve(env === "dev" ? devLibsPath : distPath, "index.mjs"),
    sourcemap: true,
  },
  {
    format: "cjs",
    file: path.resolve(env === "dev" ? devLibsPath : distPath, "index.js"),
    sourcemap: true,
  },
];

const plugins = [
  ts({
    tsconfig: path.resolve(__dirname, "tsconfig.rollup.json"),
  }),
  // let it empty the dist, because rollup faster than gulp
  del({ targets: path.resolve(distPath, "*") }),
  commonjs(),
  resolve(),
];

if (env === "pro") plugins.push(terser());
// if (env === "pro")
//   plugins.unshift(
//     // 这个插件，生产环境，小程序特殊的npm编译不编译包依赖的其他包再用
//     peerDepsExternal({
//       includeDependencies: true,
//     })
//   );

module.exports = {
  input: path.resolve(srcLibsPath, "index.ts"),
  output: output,
  plugins,
};
