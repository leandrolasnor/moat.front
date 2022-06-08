import {useSelector} from "react-redux";
import Routes from "./routes/routes";
import Profile from './common/profile/component'
import ListTecnologies from './common/tecnologies/componet'
import { Container, Row, Col } from "react-bootstrap";

let App = props => {
	const user = useSelector(state => state.auth.user)

  const style_main_panel = {backgroundColor: 'rgba(255, 255, 255, 0.2)'}
	return (
		<Container lg={12} md={12} sm={12} xs={12}>
			<Row className="bg-dark mt-5 profile">
					<Col className="text-light mt-3" lg={{ span: 2, offset: 0 }}>
							<Profile user={user} />
					</Col>
					<Col className="text-light mt-4 mb-5" lg={{ span: 10, offset: 0 }} sm={12} xs={12}>
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