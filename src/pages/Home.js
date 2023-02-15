import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import GithubCorner from "components/GtihubCorner";
import HintBox from "components/HintBox";
import { SearchBoxContacts, SearchBoxDomains, SearchBoxLetters } from "components/SearchBoxDemo";
import { memo } from "react";

const ColWrapper = memo(({ children }) => {
    return (
        <Stack spacing={'8'} w={['100%', 'sm']}>
            {children}
        </Stack>
    )
})

const HomePage = () => {
    return (
        <>
            <Stack
                pos={'fixed'}
                left={0} top={0}
                w={'100vw'} h={'100vh'}
                p={'10'}
                px={['4', '10']}
                gap={'10'}
                spacing={0}
                overflow={'auto'}
            >
                <Box>
                    <Heading>React Search Box Hooks</Heading>
                    <Text opacity={0.85}>Construct search boxes with filters, using callbacks</Text>
                </Box>

                <HStack spacing={0} flex={1} gap={'10'} flexWrap={'wrap'}
                    justifyContent={'center'} alignItems={'center'}
                >
                    <ColWrapper>
                        <HintBox>
                            <Heading fontSize={'md'}>Data Callbacks</Heading>
                            <Box opacity={0.5}>
                                <Text fontSize={'smaller'}>Hooks for searching in memory sources.</Text>
                                <Text fontSize={'smaller'}>Example of search person in contacts list.</Text>
                            </Box>
                        </HintBox>

                        <HintBox>
                            <SearchBoxContacts />
                        </HintBox>
                    </ColWrapper>

                    <ColWrapper>
                        <HintBox>
                            <Heading fontSize={'md'}>Fetch API Callbacks</Heading>
                            <Box opacity={0.5}>
                                <Text fontSize={'smaller'}>Hooks for contructing api based searches.</Text>
                                <Text fontSize={'smaller'}>Example of search domain name using api request.</Text>
                            </Box>
                        </HintBox>

                        <HintBox>
                            <SearchBoxDomains />
                        </HintBox>
                    </ColWrapper>

                    <ColWrapper>
                        <HintBox>
                            <Heading fontSize={'md'}>Custom Callbacks</Heading>
                            <Box opacity={0.5}>
                                <Text fontSize={'smaller'}>Using hooks as a flexible base for custom data callbacks.</Text>
                                <Text fontSize={'smaller'}>Example of search and category values split into letters.</Text>
                            </Box>
                        </HintBox>

                        <HintBox>
                            <SearchBoxLetters />
                        </HintBox>
                    </ColWrapper>
                </HStack>
            </Stack>
            <GithubCorner />
        </>
    )
}

export default HomePage;