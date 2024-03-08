module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"], // Transpile JavaScript using Babel
      },
      {
        test: /\.html$/,
        use: ["html-loader"], // both style and html  process img inside it
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/i,
        type: "asset/resource", // Inject CSS into the DOM
      },
    ],
  },
};
