import { Flex } from '@chakra-ui/react'
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" flex={1}>
      <Navbar />
      <Dashboard />
    </Flex>
  )
}

export default App;
