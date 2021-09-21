import React from "react";
import {Link} from "react-router-dom";
// @ts-ignore
import {NotificationManager} from 'react-notifications';


export default function Home() {

	const handleCapture = () => {
		NotificationManager.warning('Capture', '');
	}

	return (
		<div className="page">
			<Link to="/admin" className="page__nav">
				I'm admin
			</Link>
			<div className="page__container">
				<div className="page__title">
					Capture The Flag
				</div>
				<div className="page__value">
					Current holder: 0xBC6ae91F55af580B4C0E8c32D7910d00D3dbe54d
				</div>
				<button onClick={handleCapture} className="page__btn base-btn">
					Capture
				</button>
			</div>
		</div>
	);
}
