import { Box, Center, Heading, Text } from "@chakra-ui/react";

const Preloader = () => {
    return (
        <Center w={'full'} h={'full'} pos={'fixed'}>
            <Box>
                <Heading>React Search Box Hooks</Heading>
                <Text opacity={0.85}>Construct search boxes with filters, using callbacks</Text>
            </Box>
        </Center>
    )
}

export default Preloader;