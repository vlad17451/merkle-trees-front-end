import {ethers} from 'ethers'

interface ITree {
	amount: number,
	merkleRoot: string,
	leaves: {address: string, index: number, proof: string[]}[]
}


const expandLeaves = (whiteList: string[]): {address: string, index: number}[] => {
	let addresses = whiteList;
	addresses.sort(function(a, b) {
		let al = a.toLowerCase(), bl = b.toLowerCase();
		if (al < bl) { return -1; }
		if (al > bl) { return 1; }
		return 0;
	});
	return addresses.map((a, i) => ({
		address: a.toLowerCase(),
		index: i,
	}));
}

function getLeaves(whiteList: string[]) {
	let leaves = expandLeaves(whiteList);
	return leaves.map((leaf) =>
		ethers.utils.solidityKeccak256(["uint256", "address"], [leaf.index, leaf.address]));
}

function reduceMerkleBranches(leaves: string[]) {
	let output = [];
	while (leaves.length) {
		let left = leaves.shift();
		let right = (leaves.length === 0) ? left: leaves.shift();
		// @ts-ignore
		output.push(ethers.utils.keccak256(left + right.substring(2)));
	}
	output.forEach(function(leaf) {
		leaves.push(leaf);
	});
}

const computeMerkleProof = (index: number, whiteList: string[]) => {
	let leaves = getLeaves(whiteList);
	let path = index;
	let proof = [];
	while (leaves.length > 1) {
		let item
		if ((path % 2) === 1) {
			item = leaves[path - 1]
		} else {
			item = leaves[path + 1]
		}
		if (item) {
			proof.push(item)
		}
		reduceMerkleBranches(leaves);
		path = Math.floor(path / 2);
	}
	return proof;
}

function computeRootHash(whiteList: string[]) {
	let leaves = getLeaves(whiteList);
	while (leaves.length > 1) {
		reduceMerkleBranches(leaves);
	}
	return leaves[0];
}

export const getTree = (whiteList: string[]): ITree => {
	let leaves = expandLeaves(whiteList) as any;
	for(let i = 0; i < leaves.length; i++){
		leaves[i].proof = computeMerkleProof(i, whiteList)
		// leaves[i].str = JSON.stringify(computeMerkleProof(i))
		// leaves[i].hash = ethers.utils.solidityKeccak256(["uint256", "address"], [leaves[i].index, leaves[i].address]);
	}
	return {
		merkleRoot: computeRootHash(whiteList),
		amount: leaves.length,
		leaves: leaves
	};
}

export const getProofByAddress = (tree: ITree, address: string): { index: number, proof: string[] } => {
	const { index, proof } = tree.leaves!.find((item: { address: string }) =>
		(item.address.toLowerCase() === address.toLowerCase())) as {address: string, index: number, proof: string[]}
	return { index, proof }
}
