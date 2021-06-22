import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { e10 } from '../math'
import { getCurrency } from './getCurrency'

export function getUSDValue(amount: BigNumberish, token: any): BigNumber {
return BigNumber.from(amount)
    .mul(token.usd)
    .div(e10(token?.decimals ? token.decimals : token.tokenInfo.decimals))
}

export function getUSDString(amount: BigNumberish, token: any): string {
return BigNumber.from(amount)
    .mul(token.usd)
    .div(e10(token?.decimals ? token.decimals : token.tokenInfo.decimals))
    .toFixed(getCurrency(token.chainId).decimals)
}

export * from './currencyId'
export * from './getCurrency'
export * from './wrappedCurrency'
export * from './maxAmountSpend'
