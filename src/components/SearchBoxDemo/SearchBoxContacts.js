import {
    Box, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Portal, Stack, Text
} from "@chakra-ui/react";
import { useSearchBox } from "lib";
import { memo } from "react";
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
                                    <Button>{item.name}</Button>
                                </PopoverTrigger>
                                {isOpen &&
                                    <Portal>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody as={Stack}>
                                                <Text>Name: {item.name}</Text>
                                                <Text>Email: {item.email}</Text>
                                                <Text>Phone: {item.phone}</Text>
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

const contacts = [
    { name: 'John Doe', email: 'johndoe@example.com', phone: '555-1234' },
    { name: 'Jane Smith', email: 'janesmith@example.com', phone: '555-5678' },
    { name: 'Bob Johnson', email: 'bobjohnson@example.com', phone: '555-9012' },
    { name: 'Mary Brown', email: 'marybrown@example.com', phone: '555-3456' },
    { name: 'David Lee', email: 'davidlee@example.com', phone: '555-7890' },
    { name: 'Amy Chen', email: 'amychen@example.com', phone: '555-2345' },
    { name: 'Mike Davis', email: 'mikedavis@example.com', phone: '555-6789' },
    { name: 'Sara Kim', email: 'sarakim@example.com', phone: '555-0123' },
    { name: 'Tom Nguyen', email: 'tomnguyen@example.com', phone: '555-4567' },
    { name: 'Rachel Patel', email: 'rachelpatel@example.com', phone: '555-8901' },
    { name: 'Chris Wilson', email: 'chriswilson@example.com', phone: '555-3456' },
    { name: 'Julie Garcia', email: 'juliegarcia@example.com', phone: '555-7890' },
    { name: 'Tony Park', email: 'tonypark@example.com', phone: '555-2345' },
    { name: 'Lauren Hernandez', email: 'laurenhernandez@example.com', phone: '555-6789' },
    { name: 'Kevin Chen', email: 'kevinchen@example.com', phone: '555-0123' },
    { name: 'Emily Lee', email: 'emilylee@example.com', phone: '555-4567' },
    { name: 'Benjamin Kim', email: 'benjaminkim@example.com', phone: '555-8901' },
    { name: 'Grace Jones', email: 'gracejones@example.com', phone: '555-3456' },
    { name: 'Justin Singh', email: 'justinsingh@example.com', phone: '555-7890' },
    { name: 'Hannah Park', email: 'hannahpark@example.com', phone: '555-2345' }
];


export default function SearchBoxItems() {
    const queryFunc = (params) => {
        let items;

        if (params.query) {
            items = contacts.filter(x => x.name.startsWith(params.query));
        } else {
            items = contacts;
        }

        return [items, items.length];
    }

    const { items, isLoading, params, dispatchParams } = useSearchBox(queryFunc, { query: undefined })

    return (
        <Stack w={'100%'} h={'80'}>
            <Search {...{ dispatchParams, paramKey: 'query', defaultValue: params.query, debounceTimeout: 100 }} />
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