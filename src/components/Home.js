
import { Row, ListGroup, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTables } from '../redux/tablesRedux';
import { Link } from 'react-router-dom';

function Home() {
    //const dispatch = useDispatch();

    const tables = useSelector(getAllTables);

    return (
        <div>
        <ListGroup variant='flush'>
          {tables.map((table) => (
            <ListGroup.Item key={table.id} >
              <Row>
                <Col md={2}>
                  <h4>Table {table.id}</h4>
                </Col>
                <Col md={8}>
                  <p>
                    <span>Status: </span>
                    {table.status}
                  </p>
                </Col>
                <Col md={2}>
                  <Link to={'/table/' + table.id}>
                    <Button>Show more</Button>
                  </Link>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
  
  export default Home;