import {useSelector} from "react-redux";
import Routes from "./routes/routes";
import Profile from './common/profile/component'
import ListTecnologies from './common/tecnologies/componet'
import { Container, Row, Col } from "react-bootstrap";

let App = props => {
	const user = useSelector(state => state.auth.user)

  const style_main_panel = {backgroundColor: 'rgba(0, 0, 0, 0.9)'}
	return (
		<Container lg={12} md={12} sm={12} xs={12}>
			<Row className="bg-dark mt-5 profile">
					<Col className="text-light mt-3" lg={{ span: 4, offset: 0 }} md={5}>
							<Profile user={user} />
					</Col>
					<Col className="text-light mt-4 text-center" lg={4} md={2} />
					<Col className="text-light mt-4 mb-5" lg={{ span: 4, offset: 0 }} md={5} sm={12} xs={12}>
							<ListTecnologies />
					</Col>
			</Row>
			<Row style={style_main_panel}>
				<Routes />
			</Row>
		</Container>
	);
};

export default App;