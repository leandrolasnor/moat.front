import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import Musicollection from "../musicollection/musicollection"
import { Col, Row} from "react-bootstrap";
import {ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import Modal from "../common/modal/component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

	const [showModalMoat, setShowMoat] = useState(false);	

	return (
		<Col lg={12}>
			<Row>
				<Col className="text-center hvr-grow item-panel mt-5" md={3} sm={6} xs={12}>
						<NavLink to="/musicollection">
							<FontAwesomeIcon icon={["fas", "fa-music"]} />
							<p>moat.ai</p>
						</NavLink>
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
			<Modal title={"Collections"} subtitle={"Music"} content={<Musicollection />} handleClose={() => setShowMoat(false)} show={showModalMoat} />
		</Col>
	);
};
export default Home
