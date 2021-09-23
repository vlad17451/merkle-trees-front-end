
import {getIsConnected, getUserAddress, SET_IS_CONNECTED, SET_USER_ADDRESS} from '../features/web3/web3Slice'
import {useAppDispatch, useAppSelector} from './hooks'
import {useEffect} from "react";

// @ts-ignore
import Web3 from 'web3'
import CaptureTheFlag from "../abis/CaptureTheFlag";
import {AbiItem} from "web3-utils";
import {captureTheFlagAddress} from "../config";

const CaptureTheFlagAbi: AbiItem = CaptureTheFlag as any
let web3: Web3

let isConnected = false
let chainId = -1
let userAddress: string

let ctfInst: any

export const fetchCurrentFlagHolder = async (): Promise<string> => {
	return ctfInst.methods.currentFlagHolder().call()
}

export const fetchProof = async (whitelist: string[]): Promise<{ proof: string[], index: number }> => {
	return ctfInst.methods.getProof(userAddress, whitelist).call()
}

export const addMember = async (address: string, whitelist: string[]) => {
	const method = ctfInst.methods.addMember(address, whitelist)
	await method.estimateGas({
		from: userAddress,
		to: ctfInst.address
	})
	return method.send({
		from: userAddress,
		to: ctfInst.address
	})
}

let whitelist: string[] = []

export const getWhitelist = (): string[] => whitelist

export const fetchWhitelist = async () => {
	const provider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/4f9234a0518644ef9b62fb4d4ff53df2')
	const web3Infura = new Web3(provider)
	ctfInst = new web3Infura.eth.Contract(CaptureTheFlagAbi, captureTheFlagAddress)
	ctfInst.events.AddNewMember({
		fromBlock: 0
	}, (e: any, r: any) => {
		whitelist.push(r.returnValues.newMember)
	})
}


export const captureTheFlag = async (index: number, proof: string[]): Promise<void> => {
	const method = ctfInst.methods.capture(index, proof)
	await method.estimateGas({
		from: userAddress,
		to: ctfInst.address
	})
	return method.send({
		from: userAddress,
		to: ctfInst.address
	})
}

// export const connect = async(callback: () => any): Promise<any> => {
// 	if (!isConnected) {
// 		try {
// 			// @ts-ignore
// 			const { ethereum } = window
// 			if (!ethereum) {
// 				alert('Install metamask')
// 				return
// 			}
// 			web3 = new Web3(ethereum)
// 			userAddress = await web3.eth.getCoinbase()
// 			if (userAddress === null) {
// 				await ethereum.enable()
// 				userAddress = await web3.eth.getCoinbase()
// 			}
// 			chainId = await web3.eth.net.getId()
// 			if (chainId !== 4) {
// 				alert('Select rinkeby in metamask')
// 				return
// 			}
// 			isConnected = true
// 			const dispatch = useAppDispatch();
// 			dispatch(SET_USER_ADDRESS(userAddress))
// 			ctfInst = new web3.eth.Contract(CaptureTheFlagAbi, captureTheFlagAddress)
// 		} catch (e) {
// 			console.log(e)
// 			return
// 		}
// 	}
// 	return callback()
// }

export const _getUserAddress = () => {
	return useAppSelector(getUserAddress)
}

export const useConnect = (): (callback: () => any) => Promise<any> => {
	const dispatch = useAppDispatch();
	const isConnected = useAppSelector(getIsConnected)
	return async(callback = () => {}): Promise<any> => {
		if (!isConnected) {
			try {
				// @ts-ignore
				const { ethereum } = window
				if (!ethereum) {
					alert('Install metamask')
					return
				}
				web3 = new Web3(ethereum)
				userAddress = await web3.eth.getCoinbase()
				if (userAddress === null) {
					await ethereum.enable()
					userAddress = await web3.eth.getCoinbase()
				}
				chainId = await web3.eth.net.getId()
				if (chainId !== 4) {
					alert('Select rinkeby in metamask')
					return
				}
				// isConnected = true
				dispatch(SET_USER_ADDRESS(userAddress))
				dispatch(SET_IS_CONNECTED(true))
				ctfInst = new web3.eth.Contract(CaptureTheFlagAbi, captureTheFlagAddress)
				// console.log(123123, _getUserAddress())
			} catch (e) {
				console.log(e)
				return
			}
		}
		return callback()
	}
}

// export useWeb3
