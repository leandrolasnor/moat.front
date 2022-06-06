import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import {login} from "./actions"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const InputText =  props => {
	return (
		<Form.Control autoComplete="on" {...props.input} {...props} />
	)
}

const style_main_panel = {backgroundColor: 'rgba(0, 0, 0, 0.9)'}

let Auth = props => {
  const dispatch = useDispatch()
  const seletor = formValueSelector("authForm");
  const email = useSelector(state => seletor(state, "email"))
  const password = useSelector(state => seletor(state, "pwd"))


	const { submitting} = props;
	return (
    <Container lg={12} md={12} sm={12} xs={12}>
        <Row className="bg-dark mt-5 pt-4 profile">
          <Col lg={12}>
            <h1 className="text-light text-center font-weight-light">Entrar</h1>
          </Col>
        </Row>
        <Row style={style_main_panel}>
          <Col className="mt-5 mb-5" lg={{span:4, offset:4}} md={{span:8, offset:2}} sm={{span:8, offset:2}}>
            <Card className="bg-dark">
              <Card.Body as={Row}>
                <Card.Text as={Col} lg={12}>
                  <Form onSubmit={e => {dispatch(login({email, password})); e.preventDefault();}}>
                    <Form.Group>
                      <Col>
                        <h3 className="text-light font-weight-light">Acessar minha Conta</h3>
                      </Col>
                      <Col className="mt-4" lg={12}>
                        <Field name="email" component={InputText} placeholder="E-mail" type="email"/>
                      </Col>
                      <Col className="mt-2" lg={12}>
                        <Field name="pwd" component={InputText} type="password" placeholder="Password"/>
                      </Col>
                      <Col lg={6} md={12} sm={8} xs={12}>
                        <button type="submit" disabled={submitting} className="mt-2 btn btn-success btn-block pull-right font-weight-bold btn-sm">ACESSAR</button>
                      </Col>
                    </Form.Group>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
	);
};

Auth = reduxForm({ form: "authForm", initialValues: { email: "", pwd: "" } })(Auth);
export default Auth;
