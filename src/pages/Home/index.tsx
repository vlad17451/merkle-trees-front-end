import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
// @ts-ignore
import {NotificationManager} from 'react-notifications';
// import {
// 	connect,
// 	fetchCurrentFlagHolder,
// } from '../../app/useWeb3'
import {
	selectCount, getUserAddress, SET_USER_ADDRESS
} from '../../features/web3/web3Slice'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {captureTheFlag, fetchCurrentFlagHolder, fetchProof, getWhitelist, useConnect} from '../../app/useWeb3'

export default function Home() {

	const count = useAppSelector(selectCount);
	const userAddress = useAppSelector(getUserAddress);


	const [holder, setHolder] = useState('-')

	const dispatch = useAppDispatch();

	const connect = useConnect()


	const handleCapture = async () => {
		dispatch(SET_USER_ADDRESS(userAddress + '1'))

		await connect(async () => {
			try {
				const { index, proof } = await fetchProof(getWhitelist())
				await captureTheFlag(index, proof)
			} catch (e) {
				console.log(e)
			}
		})
		// dispatch(increment(123))
		// await connect(async () => {
		// 	try {
		// 		const { index, proof } = await fetchProof(getWhitelist())
		// 		await captureTheFlag(index, proof)
		// 	} catch (e) {
		// 		console.log(e)
		// 	}
		// })
	}

	const fetchHolder = async () => {
		await connect(async () => {
			setHolder(await fetchCurrentFlagHolder())
		})
	}

	// useEffect(() => {
	// 	fetchHolder()
	// }, [])


	return (
		<div className="page">
			<Link to="/admin" className="page__nav">
				I'm admin {count}
			</Link>
			<div>
				Current connected user: {userAddress}
			</div>
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
