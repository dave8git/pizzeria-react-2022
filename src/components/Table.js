import { Container, Row, Form, Col, Button, ProgressBar, Alert } from 'react-bootstrap'; 
import  { useParams } from 'react-router-dom';
import { getStatus, getTableId } from '../redux/tablesRedux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

function Table() {
  const { id } = useParams();

  const table = useSelector((state) => getTableId(state, id));


  const [status, setStatus] = useState(table.status);
  const [people, setPeople ] = useState(table.maxPeople);
  const [maxPeople, setMaxPeople] = useState(table.maxPeople);

  console.log(status);
  const allStatus = [ 'Free', 'Reserved', 'Busy', 'Cleaning' ];
  const statusArray = [];

  const handleStatus = (e) => {
    setStatus(e.target.value);
  }

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleChangePeople = (e) => {
    const peopleValue = e.target.value;
    if (e.target.value >= 0 && e.target.value <= maxPeople) {
      setPeople(e.target.value);
    }
  }

  const handleChangeMaxPeople = (e) => {
    if (e.target.value >= 0 && e.target.value <= 10) {
      setMaxPeople(e.target.value);
    }
    if (e.target.value < people ) {
      setPeople(e.target.value);
    }
  };

  // const getCurrentStatus = (status) => {
  //   currentStatus = 
  // }

    return (
      <Form>
        <Row>
          <h2>Table: {id}</h2>
        </Row>
        <Row>
          <Col>
            <h2>Status: </h2>
          </Col>
          <Col>
            <Form.Select
              onChange={handleStatus}
              value={status}
            >
              <option>{status}</option>
              {allStatus.map((statusFromArray, index) => (
                <option value={statusFromArray} key={index}> 
                  {statusFromArray}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Form.Group> 
            <Row> 
              <h2>People: </h2>
              <Col>
              <Form.Control 
                {...register('people', { min: 0, max: maxPeople })}
                type='number'
                value={people}
                onChange={handleChangePeople}
                />
              </Col>
              <Col>
              <Form.Control
                type='number'
                value={maxPeople}
                onChange={handleChangeMaxPeople}
              />
              </Col>
            </Row>
          </Form.Group>
       
          
        </Row>
      </Form>
    );
  }
  
  export default Table;