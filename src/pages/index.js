import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const IndexPage = ({ data }) =>{
  console.log(data)
  return (
    <Layout>
      <Masonry className="showcase">
        {data.allDatoCmsWork.edges.map(({ node: work }) => {
          let tLink
          if(work.slug=="tree"){
            tLink="/tree"
          }else if(work.slug=="turbogears"){
            tLink="/TurboGears"
          }else{
            tLink=`/works/${work.slug}`
          }
          return (
            <div key={work.id} className="showcase__item">
              <figure className="card">
                <Link to={tLink} className="card__image">
                  <Img fluid={work.coverImage.fluid} />
                </Link>
                <figcaption className="card__caption">
                  <h6 className="card__title">
                    <Link to={tLink}>{work.title}</Link>
                  </h6>
                  <div className="card__description">
                    <p>{work.excerpt}</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          )
        })}
      </Masonry>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
