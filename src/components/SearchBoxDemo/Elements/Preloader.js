import { Center, Spinner } from "@chakra-ui/react";

export default function Preloader() {
    return (
        <Center
            pos={'absolute'}
            left={0}
            top={0}
            boxSize={'100%'}
            backdropFilter={'auto'}
            backdropBlur={'sm'}
        >
            <Spinner />
        </Center>
    )
}