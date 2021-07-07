import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { EvmNft } from '@fungyproof/nft-resolver'

export default function Dashboard() {
  const [nft, setNft] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [error, setNftError] = useState(null)

  // useEffect(() => {
  //   if (nft) return
  //   const token = new EvmNft({
  //     tokenId: 9460,
  //     contract: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  //     infuraKey: '8629530900274ca9bd4bc62e37f65052',
  //   })
  //   const sub = token.subscribe(
  //     () => null,
  //     setNftError,
  //     () => {
  //       axios.get(token.uri).then((res) => {
  //         setMetadata(res.data)
  //       })
  //       setNft(token)
  //     }
  //   )
  // }, [nft])

  return (
    <>
      <Head>
        <title>Registry | FungyProof</title>
        <meta name="description" content="FungyProof" />
      </Head>

      <div className="w-full max-w-2xl p-4 mb-3 rounded">
        Registry
        <pre>{JSON.stringify(nft, null, 2)}</pre>
        <pre>{JSON.stringify(metadata, null, 2)}</pre>
        <img src={metadata?.image} />
        {error?.message}
      </div>
    </>
  )
}
