import styled from 'styled-components'
import GlobalSyles from './styles/GlobalStyles'

import Button from './ui/Button'

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`

 const StyledApp = styled.div`
  background-color: #AAA;
  display: flex;
 `

export default function App() {
  return (
    <>
      <GlobalSyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert('Welcome')}>Checkin</Button>
        <Button onClick={() => alert('Farewell')}>Checkout</Button>
      </StyledApp>
    </>
  )
}
