
import { SET_USER_ADDRESS } from '../features/web3/counterSlice'
import {useAppDispatch} from './hooks'

export const useConnect = (): any => {
	const dispatch = useAppDispatch();
	dispatch(SET_USER_ADDRESS('test'))
}
