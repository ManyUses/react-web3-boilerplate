import { ChainId, NATIVE, Ether } from '@sushiswap/sdk'
import React from 'react'

import Buy from '../../features/ramp'
import Image from 'next/image'
import LanguageSwitch from '../LanguageSwitch'
import Link from 'next/link'
import More from './More'
import NavLink from '../NavLink'
import { Popover } from '@headlessui/react'
import QuestionHelper from '../QuestionHelper'
import Web3Network from '../Web3Network'
import Web3Status from '../Web3Status'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useLingui } from '@lingui/react'

// Add localhost
const N = NATIVE
N[1337] = Ether

function AppBar(): JSX.Element {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()

  return (
    //     // <header className="flex flex-row justify-between w-screen flex-nowrap">
    <header className="flex-shrink-0 w-full">
      <Popover as="nav" className="z-10 w-full bg-transparent header-border-b">
        {({ open }) => (
          <>
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center uppercase">
                  <Image src="/logo.jpg" alt="FungyProof" width="32px" height="32px" />
                  <div className="hidden sm:block sm:ml-4">
                    <div className="flex space-x-2">
                      <Buy />
                      <NavLink href="/profile">
                        <a
                          id={`profile-nav-link`}
                          className="p-2 text-baseline text-primary rounded-md border hover:border-black md:p-3 whitespace-nowrap"
                        >
                          {i18n._(t`Profile`)}
                        </a>
                      </NavLink>
                      <NavLink href="/registry">
                        <a
                          id={`Registry-nav-link`}
                          className="p-2 text-baseline text-primary rounded-md border hover:border-black md:p-3 whitespace-nowrap"
                        >
                          {i18n._(t`Registry`)}
                        </a>
                      </NavLink>
                    </div>
                  </div>
                </div>

                <div className="z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto lg:relative lg:p-0 lg:bg-transparent">
                  <div className="flex items-center justify-between w-full space-x-2 sm:justify-end">
                    {chainId &&
                      [ChainId.MAINNET, ChainId.BSC, ChainId.MATIC].includes(chainId) &&
                      library &&
                      library.provider.isMetaMask && (
                        <>
                          <QuestionHelper text={i18n._(t`Add USDC to your MetaMask wallet`)}>
                            <div
                              className="hidden rounded-md cursor-pointer sm:inline-flex p-0.5"
                              onClick={() => {
                                let address: string | undefined
                                switch (chainId) {
                                  case ChainId.MAINNET:
                                    address = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
                                    break
                                  case ChainId.BSC:
                                    address = ''
                                    break
                                  case ChainId.MATIC:
                                    address = ''
                                    break
                                }
                                const params: any = {
                                  type: 'ERC20',
                                  options: {
                                    address: address,
                                    symbol: 'USDC',
                                    decimals: 18,
                                    image: 'https://www.centre.io/hubfs/usdc-icon-86074d9d49.png',
                                  },
                                }

                                if (library && library.provider.isMetaMask && library.provider.request) {
                                  library.provider
                                    .request({
                                      method: 'wallet_watchAsset',
                                      params,
                                    })
                                    .then((success) => {
                                      if (success) {
                                        console.log('Successfully added USDC to MetaMask')
                                      } else {
                                        throw new Error('Something went wrong.')
                                      }
                                    })
                                    .catch(console.error)
                                }
                              }}
                            >
                              <Image
                                src="/images/tokens/usdc-square.jpg"
                                alt="WETH"
                                width="38px"
                                height="38px"
                                objectFit="contain"
                                className="rounded-md"
                              />
                            </div>
                          </QuestionHelper>
                        </>
                      )}

                    {library && library.provider.isMetaMask && (
                      <div className="hidden sm:inline-block rounded border border-transparent hover:border-black">
                        <Web3Network />
                      </div>
                    )}

                    <div className="w-auto flex items-center rounded p-0.5 whitespace-nowrap text-md cursor-pointer select-none pointer-events-auto border border-transparent hover:border-black">
                      <Web3Status />
                    </div>
                    <div className="hidden md:block">
                      <LanguageSwitch />
                    </div>
                    <More />
                  </div>
                </div>
                <div className="flex -mr-2 sm:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-gray-400 focus:outline-none">
                    <span className="sr-only">{i18n._(t`Open main menu`)}</span>
                    {open ? (
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      // <X title="Close" className="block w-6 h-6" aria-hidden="true" />
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      // <Burger title="Burger" className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>

            <Popover.Panel className="sm:hidden">
              <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                <Link href={'/profile'}>
                  <a id={`profile-nav-link`} className="p-2 text-baseline text-primary md:p-3 whitespace-nowrap">
                    {i18n._(t`Profile`)}
                  </a>
                </Link>
                <NavLink href="/registry">
                  <a
                    id={`Registry-nav-link`}
                    className="p-2 text-baseline text-primary rounded-md md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Registry`)}
                  </a>
                </NavLink>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </header>
  )
}

export default AppBar
