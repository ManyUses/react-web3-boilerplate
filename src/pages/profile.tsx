import { ExternalLink, User } from 'react-feather'
import useSWR, { SWRResponse } from 'swr'

import Dots from '../components/Dots'
import Head from 'next/head'
import Copy from '../components/AccountDetails/Copy'
import React from 'react'
import { getExplorerLink } from '../functions/explorer'
import { shortenAddress } from '../functions/format'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../hooks/useActiveWeb3React'
import { useETHBalances } from '../state/wallet/hooks'
import { useLingui } from '@lingui/react'

// import Lottie from 'lottie-react'
// import anim from '../animation/network-switcher.json'

function Transactions() {
  const { i18n } = useLingui()

  const { account, chainId } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  // TODO get ManyUses enrichment transactions
  // const { data, error }: SWRResponse<any, Error> = useSWR(
  //   `https://api.covalenthq.com/v1/${chainId}/address/${account}/stacks/sushiswap/acts/?&key=ckey_cba3674f2ce5450f9d5dd290589&swaps=true&quote-currency=usd`,
  //   (url) =>
  //     fetch(url)
  //       .then((r) => r.json())
  //       .then((j) => j.data)
  // )

  // if (error) return <div>{i18n._(t`failed to load`)}</div>
  // if (!data) return <div>{i18n._(t`loading...`)}</div>

  return (
    <>
      <Head>
        <title>{i18n._(t`Profile`)} | ManyUses</title>
        <meta name="description" content="Proile..." />
      </Head>

      <div className="w-full max-w-2xl p-4 mb-3 rounded">
        <div className="flex justify-between">
          <div className="flex">
            <div className="p-1.5 bg-dark-800 rounded">
              <User strokeWidth={1} size={34} />
            </div>
            <div className="ml-3">
              <div className="font-semibold text-gray-300">{account && shortenAddress(account)}</div>
              <div className="text-sm text-gray-500">
                {account && chainId && (
                  <>
                    {userEthBalance ? (
                      <div>{userEthBalance?.toSignificant(4)} ETH</div>
                    ) : (
                      <Dots>{i18n._(t`Loading`)}</Dots>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="text-sm font-semibold text-primary">
            <div className="flex items-center">
              <Copy toCopy={account} />
              <div className="ml-1">Copy Address</div>
            </div>
            <div className="flex items-center  mt-2">
              <ExternalLink strokeWidth={0.5} size={14} />
              {chainId && account && (
                <a href={getExplorerLink(chainId, account, 'address')}>
                  <span style={{ marginLeft: '4px' }}>{i18n._(t`View on explorer`)}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <Lottie animationData={anim} autoplay loop /> */}
    </>
  )
}

export default Transactions
