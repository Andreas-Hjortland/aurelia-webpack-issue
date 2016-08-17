const path = require('path');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaderLimit = 20000;
function getLoader(mime) {
	return 'url-loader?limit=' + loaderLimit + '&mimetype=' + mime;
}

module.exports = {
	entry : {
		frame : [
			'./wwwroot/styles/frame.less',
		],
		app : [
			'bluebird',
			'whatwg-fetch',
			'babel-polyfill',
			'./wwwroot/styles/style.less',
			'./wwwroot/js/index.js',
			'./wwwroot/js/main.js'
		]
	},

	output : {
		path          : path.join(__dirname, 'wwwroot', 'dist'),
		filename      : '[name].js',
		publicPath    : '/dist/',
		chunkFilename : '[id].bundle.js'
	},

	module : {
		loaders : [
			{
				test    : /\.js/,
				loader  : 'babel-loader',
				exclude : /(node_modules)/,
				query   : {
					cacheDirectory : true,
					presets        : ['es2015', 'stage-3'],
					plugins        : [
						'babel-plugin-transform-decorators-legacy',
						'transform-class-properties',
						'transform-regenerator'
					]
				}
			},
			{ test : /\.html(\?.*)?$/, loader : 'html-loader' },

			{ test : /\.png(\?.*)?$/, loader : getLoader('image/png') },
			{ test : /\.gif(\?.*)?$/, loader : getLoader('image/gif') },
			{ test : /\.svg(\?.*)?$/, loader : getLoader('svg+xml') },
			{ test : /\.woff(\?.*)?$/, loader : getLoader('application/font-woff') },
			{ test : /\.woff2(\?.*)?$/, loader : getLoader('font/woff2') },
			{ test : /\.eot(\?.*)?$/, loader : getLoader('application/vnd.ms-fontobject') },
			{ test : /\.otf(\?.*)?$/, loader : getLoader('application/font-otf') },
			{ test : /\.ttf(\?.*)?$/, loader : getLoader('application/font-ttf') },

			{ test : /\.less(\?.*)?$/, loader : ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') }
			//{ test : /\.less(\?.*)?$/, loader : 'style-loader!css-loader!less-loader' }
		]
	},
	plugins : [
		new AureliaWebpackPlugin({
			src : path.resolve('./wwwroot/js')
		}),
		new ExtractTextPlugin('[name].css')
	]
};
