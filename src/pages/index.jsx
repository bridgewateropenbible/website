import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, Listing } from '../components'
import website from '../../config/website'

class Index extends Component {
  render() {
    const {
      data: { homepage, social, posts, projects },
    } = this.props
    return (
      <Layout>
            <h1>{homepage.data.title.text}</h1>
            <div dangerouslySetInnerHTML={{ __html: homepage.data.content.html }} />

              {social.nodes.map((s, index) => (
                <li data-name={`social-entry-${index}`} key={s.primary.label.text}>
                  <a href={s.primary.link.url}>{s.primary.label.text}</a>
                </li>
              ))}


          <h2 style={{ marginTop: '4rem' }}>Recent posts</h2>
          <Listing posts={posts.nodes} />
          <h2 style={{ marginTop: '8rem' }}>Recent projects</h2>

            {projects.nodes.map(project => (
              <li key={project.primary.label.text}>
                <a href={project.primary.link.url}>{project.primary.label.text}</a>
              </li>
            ))}


      </Layout>
    )
  }
}

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.shape({
      data: PropTypes.shape({
        title: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }),
        content: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }),
      }),
    }),
    social: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    projects: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
    social: allPrismicHeroLinksBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
    posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
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
    projects: allPrismicProjectsBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
  }
`
