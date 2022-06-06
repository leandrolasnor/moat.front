import { useState } from "react";
import { useDispatch } from "react-redux";
import Dropzone from '../common/dropzone-uploader/component'
import Logout from "../common/logout/component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row} from "react-bootstrap";
import {ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import Modal from "../common/modal/component";
import {
	Arquitetura, 
	Front,
	Back,
	Database,
	Sidekiq,
	Auth,
	Manual,
	Responsive
} from "../common/docs/component"
import '@fortawesome/fontawesome-free-brands'
import '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-free-regular'
import "./styles.css"

let Home = props => {
	const dispatch = useDispatch()

	const handleReceived = props => {
    const {type, data} = props
		console.log(type)
    dispatch({type: type, payload: data});
  }

	const [showModalArq, setShowArq] = useState(false);	
	const [showModalFront, setShowFront] = useState(false);
	const [showModalBack, setShowBack] = useState(false);
	const [showModalDB, setShowDB] = useState(false);
	const [showModalSide, setShowSide] = useState(false);
	const [showModalAuth, setShowAuth] = useState(false);
	const [ShowModalManual, setShowManual] = useState(false);
	const [ShowModalResp, setShowResp] = useState(false);

	return (
		<Col lg={12}>
			<Row>
				<Col onClick={() => setShowArq(true)} className="text-center hvr-grow item-panel mt-5" md={3} sm={6} xs={12}>
						<FontAwesomeIcon icon={["fas", "cloud"]} />
						<p>Arquitetura</p>
				</Col>
				<Col onClick={() => setShowFront(true)} className="text-center hvr-grow item-panel mt-5" md={3} sm={6} xs={12}>
						<FontAwesomeIcon icon={["fab", "react"]} />
						<p>Front-end</p>    
				</Col>
				<Col onClick={() => setShowBack(true)} className="text-center hvr-grow item-panel mt-5" md={3} sm={6} xs={12}>
						<FontAwesomeIcon icon={["far", "gem"]} />
						<p>Back-end</p>
				</Col>
				<Col onClick={() => setShowDB(true)} className="text-center item-panel hvr-grow mt-5" md={3} sm={6} xs={12}>
						<FontAwesomeIcon icon={["fas", "database"]} />
						<p>Banco de dados</p>
				</Col>
			</Row>
			<Row className="mb-5">
				<Col onClick={() => setShowSide(true)} className="text-center hvr-grow item-panel mt-5" md={3} sm={6} xs={12}>
						<FontAwesomeIcon icon={["fas", "hands-helping"]} />
						<p>Sidekiq</p>
				</Col>
				<Col onClick={() => setShowAuth(true)} className="text-center hvr-grow item-panel mt-5" md={3} sm={6} xs={12}>
						<FontAwesomeIcon icon={["fas", "user"]} />
						<p>Authentication</p>    
				</Col>
				<Col onClick={() => setShowManual(true)} className="text-center hvr-grow item-panel mt-5" md={3} sm={6} xs={12}>
						<FontAwesomeIcon icon={["far", "file-alt"]} />
						<p>Manual de uso</p>
				</Col>
				<Col onClick={() => setShowResp(true)} className="text-center hvr-grow item-panel mt-5" md={3} sm={6} xs={12}>
						<FontAwesomeIcon icon={["fas", "mobile"]} />
						<p>Responsive</p>
				</Col>
			</Row>
			<ActionCableConsumer
				channel="NotificationChannel"
				onReceived={handleReceived}
				onConnected={props => console.log("Cable Online")}
				onDisconected={props => console.log("Cable Offline")}
				onInitialized={props => console.log("Cable Initialized")}
				onRejected={props => console.log("Cable Rejected")}
			/>
			<Modal title={"Arquitetura"} subtitle={"Como foi pensado"} content={<Arquitetura />} handleClose={() => setShowArq(false)} show={showModalArq} />
			<Modal title={"React"} subtitle={"Redux"} content={<Front />} handleClose={() => setShowFront(false)} show={showModalFront} />
			<Modal title={"Ruby"} subtitle={"On Rails REST API"} content={<Back />} handleClose={() => setShowBack(false)} show={showModalBack} />
			<Modal title={"MySQL"} subtitle={"v8"} content={<Database />} handleClose={() => setShowDB(false)} show={showModalDB} />
			<Modal title={"Sidekiq"} subtitle={"Workers Working in background"} content={<Sidekiq />} handleClose={() => setShowSide(false)} show={showModalSide} />
			<Modal title={"Auth"} subtitle={"devise-token-auth"} content={<Auth />} handleClose={() => setShowAuth(false)} show={showModalAuth} />
			<Modal title={"Fazendo o upload"} subtitle={"e acompanhando sua importação"} content={<Manual />} handleClose={() => setShowManual(false)} show={ShowModalManual} />
			<Modal title={"Design"} subtitle={"Responsivo"} content={<Responsive />} handleClose={() => setShowResp(false)} show={ShowModalResp} />
		</Col>
	);
};
export default Home
