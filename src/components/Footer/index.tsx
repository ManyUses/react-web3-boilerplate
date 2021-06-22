import { ChainId } from '@sushiswap/sdk'
import ExternalLink from '../ExternalLink'
import Polling from '../Polling'
import { t } from '@lingui/macro'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useLingui } from '@lingui/react'

const Footer = () => {
  const { chainId } = useActiveWeb3React()
  const { i18n } = useLingui()
  return (
    // <footer className="absolute bottom-0 flex items-center justify-between w-screen h-20 p-4 mx-auto text-center text-low-emphesis">
    <footer className="flex-shrink-0">
      <div className="flex items-center justify-between w-screen h-20 px-4">
        {chainId && chainId === ChainId.MATIC && (
          <ExternalLink
            id={`polygon-bridge-link`}
            href="https://wallet.matic.network/bridge/"
            className="text-low-emphesis"
          >
            {i18n._(t`Matic Bridge`)}
          </ExternalLink>
        )}
        <Polling />
      </div>
    </footer>
  )
}

export default Footer
