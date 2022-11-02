import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from '../src/components/Home';
import Table from '../src/components/Table';
import NotFound from '../src/components/NotFound';

const App = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/table/:id' element={<Table />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App;
