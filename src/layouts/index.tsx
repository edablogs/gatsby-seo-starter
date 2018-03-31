import * as React from "react"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"
import "./index.css"
import Helmet from "react-helmet"
import "./scrollblur"
import { MuiThemeProvider } from 'material-ui/styles'
import theme from "../styles/theme"
import styled from "styled-components"
import Typography from 'material-ui/Typography';

const Content = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  grid-area: content;
`

const Default = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-areas: "header  header" "sidebar content" "footer  footer";
  transform: translateY(10);
  animation: default 0.5s both;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 3fr;
    grid-template-areas: "header  header" "content content" "sidebar sidebar" "footer footer";
  }

  @keyframes default {
    from {
        filter: blur(20px);
    }
    to {
        filter: blur(0px);
    }
  }

`

export default ({ children, data }) => {
  const metaData = data.site.siteMetadata
  return (
    <MuiThemeProvider theme={theme}>
    <Default>
      <Helmet title={metaData.siteTitle} />
      <Header title={metaData.siteTitle} blogLink={metaData.siteUrl} />
      <Sidebar
        algoliaAppId={metaData.algoliaAppId}
        algoliaApiKey={metaData.algoliaApiKey}
      />
      <Content>{children()}</Content>
      <Footer socialLinks={metaData.socialLinks} />
      
    </Default>
    </MuiThemeProvider>
  )
}

export const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        siteUrl
        siteTitle
        userEmail
        userName
        userMoto
        avatar
        year
        algoliaAppId
        algoliaApiKey
        socialLinks {
          label
          url
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          headings {
            depth
            value
          }
          frontmatter {
            title
            tags
            date(formatString: "MMMM DD, YYYY")
            path
            featuredImage {
              name
              childImageSharp {
                sizes(maxWidth: 1900) {
                  src
                  srcSet
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`