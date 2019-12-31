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
  ],
}
