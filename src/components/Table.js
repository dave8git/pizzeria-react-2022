import { Container, Row, Form, Col, Button, ProgressBar, Alert } from 'react-bootstrap'; 
import  { Navigate, useParams } from 'react-router-dom';
import { getStatus, getTableId } from '../redux/tablesRedux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { editTableRequest } from '../redux/tablesRedux';

function Table() {
  const { id } = useParams();

  const table = useSelector((state) => getTableId(state, id));


  const [status, setStatus] = useState(table.status);
  const [people, setPeople ] = useState(table.people);
  const [maxPeople, setMaxPeople] = useState(table.maxPeople);
  const [bill, setBill] = useState(table.bill);
  const [ visible, setVisible ] = useState(status === 'Busy');

  console.log(status);
  const allStatus = [ 'Free', 'Reserved', 'Busy', 'Cleaning' ];
  const statusArray = [];

  const handleSubmit = (e) => {
    dispatchEvent(editTableRequest(id, { status, people, maxPeople, status }));
    Navigate('/');
  }

  const handleStatus = (e) => {
    setStatus(e.target.value);
    if(e.target.value === 'Cleaning' || e.target.value === 'Free') {
      setPeople(0);
      setVisible(false);
    } else {
      setVisible(true);
    }
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
  const handleBill = (e) => {
    if (e.target.value >= 0) {
      setBill(e.target.value);
    }
  };

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
              <option>Choose availability:</option>
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
          {visible && (
              <Form.Group>
              <h2>Bill: </h2>
              <Form.Control 
                type='number'
                value={bill}
                onChange={handleBill}
              />
            </Form.Group>
          )}
        
          
        </Row>
        <Button variant='primary' type='submit'>Edit</Button>
      </Form>
    );
  }
  
  export default Table;