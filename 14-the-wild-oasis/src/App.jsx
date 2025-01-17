import styled from 'styled-components'
import GlobalSyles from './styles/GlobalStyles'

import Button from './ui/Button'
import Heading from './ui/Heading'
import Row from './ui/Row'


 const StyledApp = styled.div`
  background-color: #AAA;
  display: flex;
 `

export default function App() {
  return (
    <>
      <GlobalSyles />
      <StyledApp>
        <Heading type='h1'>The Wild Oasis</Heading>
        <Row type="horizontal">
          <Button variation="primary" size="medium" onClick={() => alert('Welcome')}>Checkin</Button>
          <Button variation="secondary" size="small" onClick={() => alert('Farewell')}>Checkout</Button>
        </Row>
      </StyledApp>
    </>
  )
}
