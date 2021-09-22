import React, {useState} from 'react'
import {Link} from "react-router-dom";
// @ts-ignore
// import {addMember, connect, getWhitelist} from '../../utils/web3'

export default function Home() {

	const [address, setAddress] = useState('')

	const handleAddMember = async () => {
		// await connect(async () => {
		// 	try {
		// 		await addMember(address, getWhitelist())
		// 	} catch (e) {
		// 		console.log(e)
		// 	}
		// })
	}

	return (
		<div className="page">
			<Link to="/" className="page__nav">
				Back
			</Link>
			<div className="page__container">
				<div className="page__title">
					Add new member to whitelist
				</div>
				<div className="page__field">
					<div className="base-field">
						<div className="base-field__title">
							Address
						</div>
						<div className="base-field__body">
							<input onChange={(e) => setAddress(e.target.value)} value={address} type="text"/>
						</div>
					</div>
				</div>
				<button onClick={handleAddMember} className="page__btn base-btn">
					Add
				</button>
			</div>
		</div>
	);
}
