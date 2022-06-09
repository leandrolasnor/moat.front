import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { Col, Row, Table, Card, Form} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import {search_albums} from './actions'
const _ = require("lodash");
const List = () => {
  const albums = useSelector(state => state.musicollection.albums)
  const listItems = albums.map(
    (album, i) => (
      <tr key={i}>
        <td>{album.id}</td>
        <td>{album.name}</td>
        <td>{album.year}</td>
        <td>@ # $ %</td>
      </tr>
    )
  )
  return listItems;
}

const InputText = props => <Form.Control className='mt-1 mb-1' autoComplete="on" {...props.input} {...props} />

let Musicollection = props => {
  const dispatch = useDispatch();
  const seletor = formValueSelector("musicollection");
  const query = useSelector(state => seletor(state, "query"))
  const current_page = useSelector(state => _.get(state.musicollection.pagination, 'Current-Page'))
  const [searching, setSearching] = useState(false);	
  const { submitting, reset } = props;


  const handleSearchChanged = () => {
    setSearching(false)
  }

  const handleReset = () => {
    reset();
    setSearching(false)
  }

  const handlePaginate = (props) => {
    // axios.defaults.headers.common['pagination']['current_page'] = current_page + 1;
    console.log(current_page+1)
    dispatch(search_albums(query))
  }

  return (
    <Col className=" mb-3" lg={12}>
        <Card className="bg-dark mt-3">
          <Card.Header eventKey="0">
            <Row>
              <Col lg={{ span: 5, offset: 0 }} className='mt-1 mb-1'>
                <h3 className="text-light font-weight-light">
                  <NavLink className="darkseagreen" to="/">Home</NavLink> / Music Collection
                </h3>
              </Col>
              <Col lg={{ span: 6, offset: 0 }}>
                <Form onSubmit={e => {dispatch(search_albums(query)); e.preventDefault(); setSearching(true)}}>
                  <Row>
                    <Col lg={{ span: 9, offset: 0 }}>
                      <Field component={InputText} onChange={handleSearchChanged} onKeyDown={(e) => e.key === 'Escape' ? handleReset() : null} name="query" placeholder="Search" type="text" />
                    </Col>
                    <Col lg={{ span: 3, offset: 0 }}>
                      <button type="submit" disabled={submitting || searching} className="mt-1 btn btn-success btn-block font-weight-bold">{searching ? ". . ." : "search"}</button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Header>
            <Card.Body>
              <Card.Text lg={12}>
                <Table variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Year</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <List />
                  </tbody>
                </Table>
              </Card.Text>
              <p onClick={handlePaginate} className="text-light font-weight-light">Pagination</p>
            </Card.Body>
        </Card>
    </Col>
  )
}

Musicollection = reduxForm({ form: "musicollection", initialValues: { query: '' } })(Musicollection);
export default Musicollection