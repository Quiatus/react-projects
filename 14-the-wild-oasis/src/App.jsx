import styled from 'styled-components'

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
  margin: 20px;
  cursor: pointer;
`

 const StyledApp = styled.div`
  background-color: #AAA;
  display: flex;
 `

export default function App() {
  return (
    <StyledApp>
      <H1>The Wild Oasis</H1>
      <Button onClick={() => alert('Welcome')}>Checkin</Button>
      <Button onClick={() => alert('Farewell')}>Checkout</Button>
    </StyledApp>
  )
}
