import React from "react";
import {Link} from "react-router-dom";
// import BaseField from "../../components/BaseField";
// @ts-ignore
import {NotificationManager} from 'react-notifications';


export default function Home() {

	const handleSendWhitelist = () => {
		NotificationManager.warning('Send Whitelist', '');
	}

	return (
		<div className="page">
			<Link to="/" className="page__nav">
				Back
			</Link>
			{/*<div className="page__container">*/}
			{/*	<div className="page__title">*/}
			{/*		Load whitelist*/}
			{/*	</div>*/}
			{/*	/!*<div className="page__field">*!/*/}
			{/*	/!*	<BaseField label="Amount" />*!/*/}
			{/*	/!*</div>*!/*/}
			{/*	<button onClick={handleSendWhitelist} className="page__btn base-btn">*/}
			{/*		Send new whitelist*/}
			{/*	</button>*/}
			{/*</div>*/}
		</div>
	);
}
