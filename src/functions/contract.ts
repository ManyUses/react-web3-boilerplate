// NOTE: Try not to add anything to thie file, it's almost entirely refactored out.

import { ChainId, ROUTER_ADDRESS } from '@sushiswap/sdk'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

import { ARCHER_ROUTER_ADDRESS } from '../constants'
import { AddressZero } from '@ethersproject/constants'
import ArcherSwapRouterABI from '../constants/abis/ArcherSwapRouter.json'
import { Contract } from '@ethersproject/contracts'
import { isAddress } from '../functions/validate'

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function getRouterAddress(chainId?: ChainId) {
  if (!chainId) {
    throw Error(`Undefined 'chainId' parameter '${chainId}'.`)
  }
  return ROUTER_ADDRESS[chainId]
}

export function getArcherRouterContract(chainId: number, library: Web3Provider, account?: string): Contract {
  return getContract(ARCHER_ROUTER_ADDRESS[chainId as ChainId] ?? '', ArcherSwapRouterABI, library, account)
}
