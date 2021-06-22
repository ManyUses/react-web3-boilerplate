import {
  DEFAULT_ARCHER_ETH_TIP,
  DEFAULT_ARCHER_GAS_ESTIMATE,
  DEFAULT_ARCHER_GAS_PRICES,
} from '../../constants'
import {
  toggleURLWarning,
  updateMatchesDarkMode,
  updateUserArcherETHTip,
  updateUserArcherGasEstimate,
  updateUserArcherGasPrice,
  updateUserArcherTipManualOverride,
  updateUserArcherUseRelay,
  updateUserDarkMode,
} from './actions'

import { createReducer } from '@reduxjs/toolkit'
import { updateVersion } from '../global/actions'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  userDarkMode: boolean | null // the user's choice for dark mode or light mode
  matchesDarkMode: boolean // whether the dark mode media query matches

  timestamp: number
  URLWarningVisible: boolean

  userArcherUseRelay: boolean // use relay or go directly to router
  userArcherGasPrice: string // Current gas price
  userArcherETHTip: string // ETH tip for relay, as full BigInt string
  userArcherGasEstimate: string // Gas estimate for trade
  userArcherTipManualOverride: boolean // is user manually entering tip
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

export const initialState: UserState = {
  userDarkMode: null,
  matchesDarkMode: false,
  timestamp: currentTimestamp(),
  URLWarningVisible: true,
  userArcherUseRelay: false,
  userArcherGasPrice: DEFAULT_ARCHER_GAS_PRICES[4].toString(),
  userArcherETHTip: DEFAULT_ARCHER_ETH_TIP.toString(),
  userArcherGasEstimate: DEFAULT_ARCHER_GAS_ESTIMATE.toString(),
  userArcherTipManualOverride: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (state) => {
      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateUserDarkMode, (state, action) => {
      state.userDarkMode = action.payload.userDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateMatchesDarkMode, (state, action) => {
      state.matchesDarkMode = action.payload.matchesDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(toggleURLWarning, (state) => {
      state.URLWarningVisible = !state.URLWarningVisible
    })
    .addCase(updateUserArcherUseRelay, (state, action) => {
      state.userArcherUseRelay = action.payload.userArcherUseRelay
    })
    .addCase(updateUserArcherGasPrice, (state, action) => {
      state.userArcherGasPrice = action.payload.userArcherGasPrice
    })
    .addCase(updateUserArcherETHTip, (state, action) => {
      state.userArcherETHTip = action.payload.userArcherETHTip
    })
    .addCase(updateUserArcherGasEstimate, (state, action) => {
      state.userArcherGasEstimate = action.payload.userArcherGasEstimate
    })
    .addCase(updateUserArcherTipManualOverride, (state, action) => {
      state.userArcherTipManualOverride = action.payload.userArcherTipManualOverride
    })
)
