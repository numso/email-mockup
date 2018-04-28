import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: white;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
  margin: 20px;
  min-width: 720px;
`

const Title = styled.div`
  background: ${props => props.color};
  border-bottom: 1px solid #ccc;
  color: #fff;
  font-size: 30px;
  padding: 30px 30px 0 20px;
  text-align: right;
`

const Content = styled.div`
  padding: 30px;
`

export default ({ title, color, children }) => (
  <Wrapper>
    <Title color={color}>{title}</Title>
    <Content>{children}</Content>
  </Wrapper>
)
