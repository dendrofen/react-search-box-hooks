import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import { useSearchBox } from "lib";
import { memo, useCallback } from "react";
import Buttons from "./Elements/Buttons";
import Preloader from "./Elements/Preloader";
import Search from "./Elements/Search";
import SelectList from "./Elements/SelectList";

const List = memo(function List({ items }) {
    return (
        <HStack
            boxSize={'100%'}
            overflow={'auto'}
            flexWrap={'wrap'}
            spacing={0}
            alignItems={'start'}
            gap={'2'}
        >
            {items && items.map((item, index) => (
                <Button key={index}>{item}</Button>
            ))}
        </HStack>
    )
})

export default function SearchBoxLetters() {
    const queryFunc = useCallback((params) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const text = [params.cat, params.query].filter(x => x).join('')
                const items = Array.from(text);
                resolve([items, items.length])
            }, 300);
        })
    }, [])

    const { items, isLoading, params, dispatchParams } = useSearchBox(
        queryFunc,
        { query: undefined, cat: undefined }
    )

    return (
        <Stack w={'100%'} h={'80'}>
            <Search {...{ dispatchParams, paramKey: 'query', value: params.query }} />
            <Buttons {...{ dispatchParams, paramKey: 'cat', value: params.cat }} />
            <SelectList {...{ dispatchParams, paramKey: 'cat', value: params.cat }} />

            <Box
                boxSize={'100%'}
                overflow={'hidden'}
                shadow={'inner'}
                className='border__solid'
                p={'4'}
                pos={'relative'}
            >
                {isLoading ? <Preloader /> : <List items={items} />}
            </Box>
        </Stack>
    )
}