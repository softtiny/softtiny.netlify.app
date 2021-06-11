import React from 'react'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import {  Link,graphql } from "gatsby"
const Treev3 = ({data:{algebra,datoCmsWork}}) =>{ 
    console.log(algebra)
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
                            {algebra.edges.map(({node:{relativePath,}},idx)=>{
                                return (<li  key={idx} >
                                    <a href={`/algebra/${relativePath}`} target="_blank">{relativePath}</a>
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
  query treev3Query {
    algebra: allFile(filter: { sourceInstanceName: { eq: "algebra" } }) {
        edges {
          node {
            relativePath
          }
        } 
    }
    datoCmsWork(slug: {eq: "algebra"}) {
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

export default Algebra