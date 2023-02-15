import { Box, Circle } from "@chakra-ui/react";

export default function HintBox({ children }) {
    return (
        <Box pos={'relative'} width={'100%'}>
            <Circle size={'2'} bg={'blue'} pos={'absolute'} left={'-4'} top={'2'} />
            {children}
        </Box>
    )
}