import {
  ethPriceQuery,
  liquidityPositionSubsetQuery,
  pairSubsetQuery,
  pairsQuery,
  tokenPriceQuery,
  tokenSubsetQuery,
  tokensQuery,
} from '../queries'

import { ChainId } from '@sushiswap/sdk'
import { request } from 'graphql-request'

export const EXCHANGE = {
  [ChainId.MAINNET]: 'sushiswap/exchange',
  [ChainId.XDAI]: 'sushiswap/xdai-exchange',
  [ChainId.MATIC]: 'sushiswap/matic-exchange',
  [ChainId.FANTOM]: 'sushiswap/fantom-exchange',
  [ChainId.BSC]: 'sushiswap/bsc-exchange',
}
export const exchange = async (chainId = ChainId.MAINNET, query, variables) =>
  request(`https://api.thegraph.com/subgraphs/name/${EXCHANGE[chainId]}`, query, variables)

export const getPairs = async (chainId = ChainId.MAINNET, query = pairsQuery, variables = undefined) => {
  // console.log('getPairs')
  const { pairs } = await request(`https://api.thegraph.com/subgraphs/name/${EXCHANGE[chainId]}`, query, variables)
  return pairs
}

export const getPairSubset = async (chainId = ChainId.MAINNET, variables = undefined) => {
  const { pairs } = await request(
    `https://api.thegraph.com/subgraphs/name/${EXCHANGE[chainId]}`,
    pairSubsetQuery,
    variables
  )
  return pairs
}

export const getTokenSubset = async (chainId = ChainId.MAINNET, variables) => {
  // console.log('getTokenSubset')
  const { tokens } = await request(
    `https://api.thegraph.com/subgraphs/name/${EXCHANGE[chainId]}`,
    tokenSubsetQuery,
    variables
  )
  return tokens
}

export const getTokens = async (chainId = ChainId.MAINNET, variables) => {
  // console.log('getTokens')
  const { tokens } = await request(
    `https://api.thegraph.com/subgraphs/name/${EXCHANGE[chainId]}`,
    tokensQuery,
    variables
  )
  return tokens
}

export const getTokenPrices = async (chainId = ChainId.MAINNET, variables) => {
  // console.log('getTokenPrice')
  const { tokens } = await request(
    `https://api.thegraph.com/subgraphs/name/${EXCHANGE[chainId]}`,
    tokensQuery,
    variables
  )
  return tokens.map((token) => token?.derivedETH)
}

export const getTokenPrice = async (chainId = ChainId.MAINNET, query, variables) => {
  // console.log('getTokenPrice')
  const ethPrice = await getEthPrice()

  const { token } = await request(`https://api.thegraph.com/subgraphs/name/${EXCHANGE[chainId]}`, query, variables)
  return token?.derivedETH * ethPrice
}

export const getEthPrice = async () => {
  // console.log('getEthPrice')
  const data = await getBundle()
  return data?.bundles?.[0]?.ethPrice
}

export const getCvxPrice = async () => {
  return getTokenPrice(ChainId.MAINNET, tokenPriceQuery, {
    id: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
  })
}

export const getMaticPrice = async () => {
  // console.log('getMaticPrice')
  return getTokenPrice(ChainId.MATIC, tokenPriceQuery, {
    id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  })
}

export const getAlcxPrice = async () => {
  // console.log('getAlcxPrice')
  return getTokenPrice(ChainId.MAINNET, tokenPriceQuery, {
    id: '0xdbdb4d16eda451d0503b854cf79d55697f90c8df',
  })
}

export const getSushiSwapPrice = async () => {
  // console.log('getSushiSwapPrice')
  return getTokenPrice(ChainId.MAINNET, tokenPriceQuery, {
    id: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
  })
}

export const getBundle = async (
  chainId = ChainId.MAINNET,
  query = ethPriceQuery,
  variables = {
    id: 1,
  }
) => {
  return exchange(chainId, query, variables)
}

export const getLiquidityPositionSubset = async (chainId = ChainId.MAINNET, user) => {
  const { liquidityPositions } = await exchange(chainId, liquidityPositionSubsetQuery, { user })
  return liquidityPositions
}
