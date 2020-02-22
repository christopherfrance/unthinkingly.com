import React from 'react'
import styled from 'styled-components'
import { font, color } from '../styles/shared-deprecated'
import resumeData from '../data/resume.json'
import { Layout, Wrapper, SectionTitle } from '../components'

const borderWidth = '3px'

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media print {
    box-shadow: none;
    padding: 0;
  }
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`

const Grid = styled.div`
  @media all and (min-width: 700px) {
    display: grid;
    grid-gap: 2em;
    align-items: start;
    grid-template-areas:
      'A  A  A  01'
      'B  B  C  D'
      'B  B  E  E'
      'B  B  02  02'
      'F  F  F  F';
  }
  padding: 1em 0;
`

const TitleResume = styled.div`
  color: black;
  font: ${font.subheading2};
  padding: 3rem 0;
  @media print {
    padding: 0;
  }
`

export const DateStamp = styled.div`
  font: ${font.mono};
  text-transform: uppercase;
  line-height: 2rem;
  font-size: 12px;
`

const PageHeader = styled.h1`
  font: ${font.display2};
  @media print {
    font: ${font.body2};
    font-weight: bold;
  }
`

const SectionHeader = styled.div`
  font: ${font.body1};
  font-weight: bold;
  font-weight: 700;
  border-bottom: ${borderWidth} solid black;
  line-height: 3rem;
  margin-bottom: calc(1rem - ${borderWidth});
  @media print {
    line-height: 3rem;
  }
`

const Header = styled.div`
  font: ${font.body1};
  font-size: 14px;
  font-weight: bold;
  color: black;
  line-height: inherit;
  @media print {
    padding-top: 1rem;
    font-weight: 400;
  }
`

const SubHeader = styled.div`
  font: ${font.mono};
  font-weight: 100;
  line-height: 1;
  padding-top: 0.4rem;
  color: ${color.monzaRed};
  @media print {
    color: black;
  }
`

const Description = styled.div`
  font: ${font.body1};
  line-height: inherit;
  ${props => (props.padTop ? `padding-top: ${props.padTop}` : '')};
`

const Item = styled.div`
  ${props => (props.area ? `grid-area: ${props.area}` : 'A')};
  padding: 1rem 0 2rem;
  line-height: 1.5;
  @media print {
    padding: 0.2rem 0 0.5rem;
  }
`

export default function Resume({ data }) {
  return (
    <Layout>
      <Wrapper>
        <Content>
          <Item area="X1">
            <TitleResume>
              <PageHeader>{resumeData.basics.name}</PageHeader>
              <SubHeader>{resumeData.basics.label}</SubHeader>
            </TitleResume>
          </Item>
          <Grid>
            <Item area="A">
              <Description>{resumeData.basics.summary}</Description>
            </Item>

            <Item area="B">
              <SectionHeader>Work experience</SectionHeader>
              {resumeData.work.map((job, index) => (
                <Item>
                  <Header>{job.company}</Header>
                  {/* <SubHeader>{job.position}</SubHeader> */}
                  <DateStamp>
                    {job.position}: {job.startDate} - {job.endDate}
                  </DateStamp>
                  <Description>{job.summary}</Description>
                </Item>
              ))}
            </Item>

            <Item area="C">
              <SectionHeader>Education</SectionHeader>
              {resumeData.education.map((school, index) => (
                <Item>
                  <Header>{school.institution}</Header>
                  <SubHeader>{school.area}</SubHeader>
                  <DateStamp>
                    {school.startDate} - {school.endDate}
                  </DateStamp>
                  <Description>{school.studyType}</Description>
                </Item>
              ))}
            </Item>

            <Item area="D">
              <SectionHeader>Speaking</SectionHeader>
              <Description padTop="1rem">
                {resumeData.speaking.summary}
              </Description>
            </Item>
            <Item area="E">
              <SectionHeader>Awards</SectionHeader>
              <Description padTop="1rem">
                {resumeData.awards.summary}
              </Description>
            </Item>
            <Item area="F">
              <Description padTop="1rem">
                {resumeData.basics.phone} • 
                {resumeData.basics.email} • 
                {resumeData.basics.location.postalCode} •{' '}
                {resumeData.basics.location.city} • 
                {resumeData.basics.location.region},{' '}
                {resumeData.basics.location.countryCode}
              </Description>
            </Item>
          </Grid>
        </Content>
      </Wrapper>
    </Layout>
  )
}