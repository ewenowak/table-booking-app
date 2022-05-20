import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTableById } from "../../redux/tablesReducer";
import { useState } from "react";
import { editTableRequest } from "../../redux/tablesReducer";

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
    
  const tableData = useSelector(state => getTableById(state, parseInt(id)));
  
  const [status, setStatus] = useState(tableData.status || '');
  const [peopleAmount, setPeopleAmount] = useState(tableData.peopleAmount || '');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData.maxPeopleAmount || '');
  const [bill, setBill] = useState(tableData.bill || ''); 
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editTableRequest({status, peopleAmount, maxPeopleAmount, bill}));
    navigate('/');
  }

  const requirementSetStatus = (status) => {
    if (status === 'busy') {
      setBill(0);
      setStatus(status);
    } else if (status === 'free' || status === 'cleaning') {
      setBill(0);
      setPeopleAmount(0);
      setStatus(status);
    } else if (status === 'reserved') {
      setPeopleAmount(0);
      setMaxPeopleAmount(10);
      setBill(0);
      setStatus(status);
    } else {
    setStatus(status);
    }
  };

  const requirementPeopleAmount = (amount) => {
    if (amount > setMaxPeopleAmount){
      setPeopleAmount(maxPeopleAmount);
    } else if (amount <= 0) {
      setPeopleAmount(0);
    } else {
      setPeopleAmount(amount);
    }
  };
  
  const requirementMaxPeopleAmount = (amount) => {
    if (amount >= 10){
      setMaxPeopleAmount(10);
    } else if (peopleAmount >= amount) {
      setPeopleAmount(amount);
      maxPeopleAmount(amount);
    } else {
      setMaxPeopleAmount(amount);
    }
  };

  return (
      <>
      <h1>Table {tableData.id} </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3 w-50">
          <Form.Label column sm={2}>
            <b>Status:</b>
          </Form.Label>
          <Col sm={10}>
            <Form.Select value="status" onChange={e => requirementSetStatus(e.target.value)}>
              <option>{status}</option>
              <option value="reserved">Reserved</option>
              <option value="busy">Busy</option>
              <option value="free">Free</option>
              <option value="cleaning">Cleaning</option>
            </Form.Select>
          </Col>
          <Form.Label column sm={2} className="mt-2">
            <b>People:</b>
          </Form.Label>
          <Col sm={10} className="mt-2 d-flex">
            <Form.Control style={{maxWidth: '50px'}} className="text-center my-1 mx-1" value={peopleAmount} onChange={e => requirementPeopleAmount(e.target.value)} />
            <p className="mx-1 my-1" style={{fontSize: '25px'}}>/</p>
            <Form.Control style={{maxWidth: '50px'}} className="text-center my-1 mx-1" value={maxPeopleAmount} onChange={e => requirementMaxPeopleAmount(e.target.value)}/>
          </Col> 
          { status === 'busy' &&
          <>
          <Form.Label column sm={2} className="mt-2">
              <b>Bill:</b>
          </Form.Label>
          <Col sm={10} className="mt-2 d-flex">
              <p className="mx-1 my-1" style={{fontSize: '25px'}}>$</p>
              <Form.Control style={{maxWidth: '50px'}} className="text-center my-1 mx-1" value={bill} onChange={e => setBill(e.target.value)}/>
            </Col> 
            </>
          }
        </Form.Group>
        <Button variant="primary" type="submit">Update</Button>
      </Form>
      </>
  )
}


export default Table;