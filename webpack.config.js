module.exports = {
    entry: './src/index.js',
    target:'node',
    output: {
      path: __dirname + '/dist',
      filename: 'hgtvsdup.js',
    },
    optimization: {
		// Minimize code to single line?
    minimize: false
  	},
  }