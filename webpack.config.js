const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 查找js文件
let selectEntrys = {};
glob.sync(__dirname+'/src/**/index.js').forEach(file => {
	let jsRelativeDir = '.'+file.substring(file.indexOf('src')-1, file.indexOf(path.basename(file)));;
	selectEntrys[(jsRelativeDir.replace('./src/','') + path.basename(file.substring(file.indexOf('src')+4), '.js'))] = jsRelativeDir + path.basename(file);
});
// console.log(selectEntrys)
// 查找HTML文件
let selectPlugins = [];
glob.sync(__dirname+'/src/**/*.ejs').forEach(file => {
	let htmlRelativeDir = file.substring(file.indexOf('src')+4, file.indexOf(path.basename(file)));
	// console.log(htmlRelativeDir);
	let aChunk = [];
	aChunk.push((file.substring(file.indexOf('src')+4).replace('.html', '')))
	let pluginConf = {
		// template: ('.' + htmlRelativeDir + path.basename(file)).replace(/\\/g, "\/"),
		template: path.dirname(file) + "/template.ejs",
		filename: htmlRelativeDir + 'index.html',
		inject: false,
		minify: true
	};
	selectPlugins.push(new HtmlWebPackPlugin(pluginConf));
});
// console.log(selectPlugins);
module.exports = {
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader/url"
					},
					{ loader: "file-loader",
						options: {
							name: 'css/[name].[ext]',
						}
					}
					],
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'font/[name].[ext]',
				},
			},
			{ test: /\.(jpg|png|gif|bmp|jpeg)$/,//正则表达式匹配图片规则
				use: [{
					loader:'url-loader',
					options:{
						limit:8192,//限制打包图片的大小：
						//如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
						name:'images/[name]-[hash:8].[ext]',//images:图片打包的文件夹；
						//[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
						//[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
					}
				}]}
		]
	},
	output: {
		path: __dirname + '/public/',
		filename: "[name].js"
	},
	entry: selectEntrys,
	plugins: selectPlugins,
	devServer: {
		host:'127.0.0.1',
		port:3000,
	},
};