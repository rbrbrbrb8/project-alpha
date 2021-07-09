const path = require('path');

module.exports = {
  entry: {
    addProject: './static/apps/addProject/addProjectApp.js',
    homepage: './static/apps/homepage/homepageApp.js',
    login: '/static/apps/login/loginApp.js',
    projectsGeneral: '/static/apps/projectsGeneral/projectsGeneralApp.js',
    signUp: '/static/apps/signUp/signUpApp',
    userProfile: '/static/apps/userProfile/userProfileApp.js',
    viewProject: '/static/apps/viewProject/viewProjectApp.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
            // name: '[name].[ext]',
            // outputPath: '../fonts/',  
            // publicPath: '../static/fonts' 
            }
        }]
      },{
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env']
            }
          }
        
      }
    ]
  },
  
  output: {
    filename: '[name].js',
    path: __dirname + '/static/bundles'
  }
}