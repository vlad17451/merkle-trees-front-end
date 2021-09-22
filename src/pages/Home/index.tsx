import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
// @ts-ignore
import {NotificationManager} from 'react-notifications';
import {captureTheFlag, connect, fetchCurrentFlagHolder, getUserAddress, setWhiteListRootHash} from "../../utils/web3";
import {getProofByAddress, getTree} from "../../utils/helper";
import {whiteList} from "../../config";

// const proof = [
// 	'0xba39927221295cdcbbf0ff6911766add1bccd962cafce848607db612684c816b',
// 	'0x514bea1c536ed9476b4d1911bbb62c980b52a93b92c5fe7ae3eb0a89a45db3d4',
// 	'0x3f601d1ffdfcb68df9d06f5376062b7811a4f2c69a849814ecb0705d06a4bfb1',
// 	'0x83e91ad4af68d8d04b5fd16e9cbf91b3b940c79efa5f16d2a8b312a2ad5094db'
// ]

// const rootHash = '0xd18167faf0396cccd6669ce235e39ab9920c36b46ef89c865efa30fbed693af4'
//
// const index = 8

export default function Home() {

	const [holder, setHolder] = useState('-')


	const handleCapture = async () => {
		await connect(async () => {
			try {
				const tree = getTree(whiteList)
				const { index, proof } = getProofByAddress(tree, getUserAddress())
				// await setWhiteListRootHash(rootHash)
				// const { index, proof } =
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
