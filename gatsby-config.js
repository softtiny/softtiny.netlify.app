require('dotenv').config()
var proxy = require("http-proxy-middleware")

module.exports = {
  siteMetadata: {
    title: `Creative Portfolio`,
  },
    developMiddleware: app => {
        app.use(
                  "/.netlify/functions/",
            proxy({
                        target: "http://localhost:9000",
                pathRewrite: {
                              "/.netlify/functions/": "",
                            
                },
                      
            })
                
        )
          
    },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/tree_svg`,// 文件路径
        name: 'tree_svg' // 名称，可以用来过滤
      }
    }
  ],
}
