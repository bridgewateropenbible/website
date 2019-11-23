import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, Listing, SEO, Header } from '../components'
import website from '../../config/website'




const Category = ({
  pageContext: { category },
  data: {
    posts: { nodes, totalCount },
  },
  location,
}) => (
  <Layout>
    <SEO title={`Category: ${category} | ${website.titleAlt}`} pathname={location.pathname} />
    <Hero>
      <Wrapper>
        <Header invert />
        <Headline>Category</Headline>
        <h1>{category}</h1>
      </Wrapper>
    </Hero>
      <Title style={{ marginTop: '4rem' }}>
        {totalCount} {totalCount === 1 ? 'Post' : 'Posts'} {totalCount === 1 ? 'was' : 'were'} tagged with "{category}"
      </Title>
      <Listing posts={nodes} />
  </Layout>
)

export default Category

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    posts: allPrismicPost(
      sort: { fields: [data___date], order: DESC }
      filter: {
        data: {
          categories: { elemMatch: { category: { document: { elemMatch: { data: { name: { eq: $category } } } } } } }
        }
      }
    ) {
      totalCount
      nodes {
        uid
        data {
          title {
            text
          }
          date(formatString: "DD.MM.YYYY")
          categories {
            category {
              document {
                data {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`
