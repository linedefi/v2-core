import { keccak256 } from '@ethersproject/solidity'
import { bytecode as v3PoolBytecode } from './artifacts/contracts/UniswapV2Pair.sol/UniswapV2Pair.json'
const POOL_INIT_CODE_HASH = keccak256(['bytes'], [`${v3PoolBytecode}`])

console.log(POOL_INIT_CODE_HASH);
