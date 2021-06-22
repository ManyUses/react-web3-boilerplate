import { request } from 'graphql-request'

export * from './blocks'
export * from './exchange'

export const status = async (subgraphName) =>
  request(
    'https://api.thegraph.com/index-node/graphql',
    `
        indexingStatusForCurrentVersion(subgraphName: "${subgraphName}") {
            synced
            health
            fatalError {
              message
              block {
                number
                hash
              }
              handler
            }
            chains {
              chainHeadBlock {
                number
              }
              latestBlock {
                number
              }
            }
          }
        `
  )
