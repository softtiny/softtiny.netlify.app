const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsWork.edges.map(({ node: work }) => {
        createPage({
          path: `works/${work.slug}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: work.slug,
          },
        })
      })
      resolve()
    })
  })
}
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type AllSvg {
        title:String
        svgs:[OneSvg]
    }
    type OneSvg {
        url: String
        base: String
    }
  `
    createTypes(typeDefs)  
}


exports.createResolvers = ({ createResolvers }) => {
    const resolves = {
        DatoCmsWork: {
            allSvg:{
                type:"AllSvg",
                resolve:async (source,args,context,info) => {
                    let slug = false
                    let svgs = false
                    if(source){
                        let entityPayload = source.entityPayload
                        if(entityPayload){
                            let attributes=entityPayload.attributes
                            if(attributes){
                                slug = attributes.slug
                                svgs = attributes.svgs
                            }
                        }
                    }
                    if(svgs){
                        let data=await context.nodeModel.getAllNodes()
                        let items = [] 
                        data = data||[]
                        data.map(details=>{
                            
                            if(details.internal.type == "File"&&details.ext==".svg"&&details.relativeDirectory===slug){

                                var file = details
                                var filename = `${file.internal.contentDigest}/${details.base}`;
                                var url =  `/static/${filename}`
                                var base = details.base
                                items.push({
                                    url,
                                    base
                                })
                            }
                        })
                        return {
                            title:slug,
                            svgs:items,
                            
                        }
                    }
                    return null
                }
            }
        }
    }
    createResolvers(resolves)
}

/*
exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        DatoCmsWork: {
            allSvg:{
                type:"String",
                resolve:async (source, args, context, info)=> {
                    const result = await context.nodeModel.findAll({
                        query: {
                            filter: {
                                ext: {eq: ".svg"},
                                relativeDirectory: {eq: source.slug},
                            },
                        },
                        type:"FileConnection"
                    })
                    //fs.writeFileSync('./a.log',JSON.stringify(result))
                    console.log(result)
                    const { entries } = result
                    return entries
                    var result =  await context.nodeModel.findAll({
                        type:"File"
                    })
                    var flag = 2
                    if(flag==2){
                        var tags = await context.nodeModel.findAll({
                            query:{
                                relativePath:{eq:"rust"},
                            },
                            type:"File"
                        })
                        var cols = await Promise.all(
                            [
    "DatoCmsAboutPage",
    "DatoCmsAsset",
    "DatoCmsFaviconMetaTags",
    "DatoCmsField",
    "DatoCmsHome",
    "DatoCmsModel",
    "DatoCmsSeoMetaTags",
    "DatoCmsSite",
    "DatoCmsTextNode",
    "DatoCmsWork",
    "Directory",
    "File",
    "MarkdownRemark",
    "Site",
    "SiteBuildMetadata",
    "SitePage",
    "SitePlugin"
                            ].map(ty=>{
                                return context.nodeModel.findAll({
                                    query: {},
                                    type:ty,
                                })
                            })
                        )
                        var allTypes = await context.nodeModel.getTypes()
                        return JSON.stringify(
                            [
                                cols,
                                JSON.stringify(context.nodeModel),
                                //JSON.stringify(args),
                                //Object.keys(info),
                                //JSON.stringify(info),
                                //context.constructor||'________6',
                                //context.nodeModel.constructor||'________7',
                                tags,
                                allTypes,
                            ]
                        )
                    }
                    if(flag == 1){
                       return JSON.stringify(Object.keys(context))
                    }
                    return JSON.stringify(result)
                },
            }
        }
    }
    createResolvers(resolvers)
}
*/
/*
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    DatoCmsWork: {
      allSvg: {
        type: "File",
        resolve: async (source, args, context, info) => {
            return "abcd"
            //if(!source.svgs){return null}
            //return context.nodeModel.findAll({
            //    type:"File",
            //    query: {
            //        filter: { 
            //            ext: { eq: ".svg" }, 
            //            relativeDirectory: { eq: source.slug } 
            //        } 
            //    }
            //})
        },
      },
    },
  }
  createResolvers(resolvers)
}
*/
