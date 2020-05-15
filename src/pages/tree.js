import React from 'react'
import Layout from "../components/layout"
import {  Link,graphql } from "gatsby"
const Tree = ({data:{tree}}) =>{ 
    console.log(tree)
    return (
        <Layout>
            <div>
                <article className="sheet">
                    <div className="sheet__inner">
                        <h1 className="sheet__title">TREE SVG LIST</h1>
                    </div>
                    <div className="sheet__body">
                        <ul className="sidebar__menu">
                            <li>
                            <Link to="/">Home</Link>
                            </li>
                            {tree.edges.map(({node:{relativePath,}},idx)=>{
                                return (<li  key={idx} >
                                    <a href={`/tree_svg/${relativePath}`} target="_blank">{relativePath}</a>
                                </li>)
                            })}
                        </ul>
                    </div>
                </article>
                
            </div>    
        </Layout>
    
    )
}
export const query = graphql`
  query TreeQuery {
    tree: allFile(filter: { sourceInstanceName: { eq: "tree_svg" } }) {
        edges {
          node {
            relativePath
          }
        } 
    }
  }
`

export default Tree

// {tree.allFile.edges.map(({node:{relativePath}})=>{
//     return (<li>
//         <a href={`/tree_svg/${relativePath}`} _self="_blank"></a>
//     </li>)
// })}