import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { NftContractContext } from '../../contexts/NftContractProvider'
import { useConnectWallet } from '../../hooks/useConnectWallet'
import { useMint } from '../../hooks/useMint'
import { Fade } from '../elements/Fade'
import { NftImagesSlideShow } from '../elements/NftImagesSlideShow'

import { useAddress } from '@thirdweb-dev/react'

const Component: React.FC = () => {
  const store = useContext(NftContractContext)
  const address = useAddress()

  const { mint } = useMint()
  const { connectWallet } = useConnectWallet()

  return (
    <Flex
      maxW={'8xl'}
      justifyContent="center"
      h="93%"
      alignItems="center"
      mx="auto"
    >
      <Fade>
        <VStack spacing={5}>
          <Box width="400px" height="400px">
            <NftImagesSlideShow />
          </Box>
          <Text pt={2} fontSize="xl" textAlign={'center'}>
              残りのNFT： {store.totalSupply - store.claimedSupply} 枚
            </Text> 
          <Text pt={1} fontSize="xl" textAlign={'center'}>
              【↓ 残っているものからランダムにミント ↓】
            </Text> 
          <div>
            {address ? (
              <Button onClick={mint} colorScheme='facebook' size='lg' disabled={store.isClaiming}>
                <Text fontSize="4xl" textAlign={'center'}>
                {store.isClaiming
                  ? 'クレーム中...'
                  : `ミント実行 (${store.claimPrice} ETH)`}
                </Text>
              </Button>
            ) : (
              <Button onClick={connectWallet} colorScheme='facebook' size='lg'>
                <Text fontSize="4xl" textAlign={'center'}>ウォレット接続</Text>
              </Button>
            )}
            
            <Text pt={5} fontSize="m" textAlign={'center'}>
              ネットワーク： Ethereum MainNet 
            </Text>
            <Text pt={1} fontSize="xs" textAlign={'center'}>
              ※ミントは無料ですが、別途ガス代がかかります。
            </Text>
          </div>
        </VStack>
      </Fade>
    </Flex>
  )
}

export { Component as Minting }
