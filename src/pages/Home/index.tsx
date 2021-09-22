import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
// @ts-ignore
import {NotificationManager} from 'react-notifications';
import {
	captureTheFlag,
	connect,
	fetchCurrentFlagHolder,
	fetchProof,
	getWhitelist
} from '../../utils/web3'


export default function Home() {

	const [holder, setHolder] = useState('-')


	const handleCapture = async () => {
		await connect(async () => {
			try {
				const { index, proof } = await fetchProof(getWhitelist())
				await captureTheFlag(index, proof)
			} catch (e) {
				console.log(e)
			}
		})
	}

	const fetchHolder = async () => {
		await connect(async () => {
			setHolder(await fetchCurrentFlagHolder())
		})
	}

	useEffect(() => {
		fetchHolder()
	}, [])


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
					Current holder: {holder}
				</div>
				<div className="page__btns">
					<button onClick={fetchHolder} className="page__btn base-btn">
						Fetch current holder
					</button>
					<button onClick={handleCapture} className="page__btn base-btn">
						Capture
					</button>
				</div>
			</div>
		</div>
	);
}
