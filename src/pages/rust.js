import React from 'react'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import {  Link,graphql } from "gatsby"
const Treev3 = ({data:{rust,datoCmsWork}}) =>{ 
    console.log(rust)
    if(!datoCmsWork){
        datoCmsWork={title:'',excerpt:'',coverImage:{fluid:'404'},descriptionNode:{childMarkdownRemark:{html:'<b><b>'}}}
    }
    return (
        <Layout>
            <div>
                <article className="sheet">
                    <div className="sheet__body">
                        <ul className="sidebar__menu">
                            <li>
                            <Link to="/">Home</Link>
                            </li>
                            {rust.edges.map(({node:{relativePath,}},idx)=>{
                                return (<li  key={idx} >
                                    <a href={`/rust/${relativePath}`} target="_blank">{relativePath}</a>
                                </li>)
                            })}
                        </ul>
                    </div>
                    <div className="sheet__inner">
                        <h1 className="sheet__title">{datoCmsWork.title}</h1>
                        <p className="sheet__lead">{datoCmsWork.excerpt}</p>
                        
                    </div>
                    <div
                        className="sheet__body"
                          dangerouslySetInnerHTML={{
                            __html: datoCmsWork.descriptionNode.childMarkdownRemark.html,
                          }}
                    />
                    <div className="sheet__gallery">
                      <Img fluid={datoCmsWork.coverImage.fluid} />
                    </div>

                </article>
                
            </div>    
        </Layout>
    
    )
}
export const query = graphql`
  query rustQuery {
    rust: allFile(filter: { sourceInstanceName: { eq: "rust" } }) {
        edges {
          node {
            relativePath
          }
        } 
    }
    datoCmsWork(slug: {eq: "rust"}) {
        title
        excerpt
        descriptionNode {
            childMarkdownRemark {
                html
            }
        }
        coverImage {
            url
       	    fluid(maxWidth: 600,){
              ...GatsbyDatoCmsSizes            
            }
        }
    }
  }
`

export default Treev3

// {tree.allFile.edges.map(({node:{relativePath}})=>{
//     return (<li>
//         <a href={`/tree_svg/${relativePath}`} _self="_blank"></a>
//     </li>)
// })}
