import { createAction } from '@reduxjs/toolkit'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('user/updateUserDarkMode')

export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>('user/updateMatchesDarkMode')

export const toggleURLWarning = createAction<void>('app/toggleURLWarning')

export const updateUserArcherUseRelay = createAction<{
  userArcherUseRelay: boolean
}>('user/updateUserArcherUseRelay')
export const updateUserArcherGasPrice = createAction<{
  userArcherGasPrice: string
}>('user/updateUserArcherGasPrice')
export const updateUserArcherETHTip = createAction<{
  userArcherETHTip: string
}>('user/updateUserArcherETHTip')
export const updateUserArcherGasEstimate = createAction<{
  userArcherGasEstimate: string
}>('user/updateUserArcherGasEstimate')
export const updateUserArcherTipManualOverride = createAction<{
  userArcherTipManualOverride: boolean
}>('user/updateUserArcherTipManualOverride')
