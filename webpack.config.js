var webpack = require('webpack');

module.exports = {
	entry: [
	'script!jquery/dist/jquery.min.js',
	//'script!foundation-sites/dist/foundation.min.js',
	'./app/app.jsx',

	],
	externals: {
		jquery: 'jQuery',

	},
	plugins:[
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		root: __dirname,
		alias: {
			Main: "app/components/Main.jsx",
			SidePanel: "app/components/SidePanel.jsx",
			SearchForm: "app/components/SearchForm.jsx",
			TextList: "app/components/TextList.jsx",
			CodexList: "app/components/CodexList.jsx",
			ExpressionInfo: "app/components/ExpressionInfo.jsx",
			sctaData: "app/api/sctaData.jsx",
			MiradorPanel: "app/components/MiradorPanel.jsx",
			//Mirador: "public/mirador/mirador.js",
			applicationStyles: "app/styles/app.scss",
			//miradorStyles: "public/mirador/css/mirador-combined.css"
		},
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	devtool: 'cheap-module-eval-source-map'

	// "cheap-source-map" can be used instead of above
	// which currently has bugs
	// buggy warning can also be avoided with filter in console.
	// see https://github.com/webpack/webpack/issues/91
	// 'cheap-source-map' sort of works, but line numbers are a bit off
	//devtool: 'cheap-source-map'
};
