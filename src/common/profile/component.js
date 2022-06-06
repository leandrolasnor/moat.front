import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImgProfile from "../imgs/profile.png";
import './style.css'
import React from "react";
import { logout } from "../../auth/actions";

let Profile = props => {
	const dispatch = useDispatch()
	const {user: {name, email}} = props
	const {user} = props

	return (
		<React.Fragment>
			<img src={ImgProfile} className="image--profile" alt="Profile" />
			<p className="name">
					{name} <a href="https://drive.google.com/file/d/1D7_LPjNh92eBQIQukwuYRKkxhPmn2NRL/view" rel="noopener noreferrer" target="_blank" data-tip data-for="nuuvem">
								<FontAwesomeIcon className="hvr-hang" id="cloud" icon={["fas", "cloud-download-alt"]} />
					</a>
			</p>
			<p className="email">
				{email}
			</p>
			<a className="email" style={{color: "red"}} role="button" onClick={() => dispatch(logout(user))}>Logout</a>
			<ReactTooltip id='cloud' type='light' place="top" effect="solid">
					<span>{'Download Resume'}</span>
			</ReactTooltip>
		</React.Fragment>
	)
}

export default Profile;