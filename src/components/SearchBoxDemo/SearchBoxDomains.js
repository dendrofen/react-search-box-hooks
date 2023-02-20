import {
    Box, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent,
    PopoverHeader, PopoverTrigger, Portal, Stack, Text
} from "@chakra-ui/react";
import { useSearchBox } from "lib";
import { memo, useCallback } from "react";
import Preloader from "./Elements/Preloader";
import Search from "./Elements/Search";

const List = memo(function List({ items }) {
    return (
        items &&
        <Stack boxSize={'100%'} overflow={'auto'}>
            {items.map((item, index) => (
                <Box key={index}>
                    <Popover isLazy>
                        {({ isOpen, onClose }) => (
                            <>
                                <PopoverTrigger>
                                    <Button>{item.domain}</Button>
                                </PopoverTrigger>
                                {isOpen &&
                                    <Portal>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>Domain info</PopoverHeader>
                                            <PopoverBody as={Stack}>
                                                {item.A && <Text>A: {item.A.join(',')}</Text>}
                                                {item.country && <Text>Country: {item.country}</Text>}
                                                {<Text>isDead: {item.isDead}</Text>}
                                                <Text>Update date: {item.update_date}</Text>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                }
                            </>
                        )}

                    </Popover>
                </Box>
            ))}
        </Stack>
    )
})

export default function SearchBoxDomains() {
    const queryFunc = useCallback((params) => {
        return new Promise(async (resolve) => {
            let items, totalItems;

            if (params.query) {
                [items, totalItems] = await fetch(`https://proxy.cors.sh/http://api.domainsdb.info/v1/domains/search?domain=${params.query}`)
                    .then(res => res.json())
                    .then(res => [res.domains || [], res.total])
                    .catch(() => [])
            } else {
                items = [];
                totalItems = undefined;
            }

            resolve([items, totalItems])
        })
    }, [])

    const { items, totalCount, isLoading, params, dispatchParams } = useSearchBox(
        queryFunc,
        { query: 'github.com', cat: undefined }
    )

    return (
        <Stack w={'100%'} h={'80'}>
            <Search {...{ dispatchParams, paramKey: 'query', defaultValue: params.query }} />

            {!isLoading && totalCount !== undefined && <Text fontSize={'small'}>Domains found: {totalCount}</Text>}

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