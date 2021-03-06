import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import theme from 'theme'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`

const Title = styled.h2`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-top: 2rem;
  margin-bottom: 0;
  font-size: 1.5rem;
  a {
    color: ${props => props.theme.colors.grey.dark};
    border-bottom-width: 0;
  }
`

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: ${theme.fontFamily.sans};
  color: ${theme.colors.blacks[7]};
`

const ShadowBox = styled.div`
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2),
    0 18px 36px -18px rgba(0, 0, 0, 0.33);
  transition: box-shadow 0.4s;

  &:hover {
    box-shadow: 0 30px 90px -10px rgba(0, 0, 0, 0.3),
      0 18px 36px -18px rgba(0, 0, 0, 0.33);
    transition: box-shadow 0.4s;
  }
`
const StyledImage = styled(Img)`
  img {
    object-fit: contain !important;
  }
  @media all and (min-width: ${theme.breakpoints.phone}) {
    img {
      object-fit: cover !important;
      object-position: center top !important;
    }
  }
`

const PostCard = ({ title, date, excerpt, slug, timeToRead, cover }) => (
  <Link to={slug}>
    <Card>
      <ShadowBox>
        {cover && <StyledImage fluid={cover.childImageSharp.sizes} />}
      </ShadowBox>

      <Title>{title}</Title>
      <Excerpt>{excerpt}</Excerpt>
    </Card>
  </Link>
)

export default PostCard
