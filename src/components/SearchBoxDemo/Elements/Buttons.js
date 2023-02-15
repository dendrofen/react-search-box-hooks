import { Button, HStack } from "@chakra-ui/react";

export default function Categories({ dispatchParams, paramKey, value }) {
    const items = ['🌳 trees', '💃 Rumba', 'books 📚'];

    return (
        <HStack px={'1'}>
            {items.map((item, index) =>
                <Button
                    key={index}
                    isActive={item === value}
                    pointerEvents={item === value ? 'none' : 'auto'}
                    size={'sm'}
                    onClick={dispatchParams.bind(this, { key: paramKey, value: item })}
                >{item}</Button>
            )}
        </HStack>
    )
}