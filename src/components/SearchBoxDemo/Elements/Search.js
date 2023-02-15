import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useSearchBoxInput } from "lib";
import { MdOutlineClear } from 'react-icons/md';

export default function Search({ defaultValue, dispatchParams, paramKey, debounceTimeout }) {
    const { ref, onInput, onChange, onClear, isClearable } = useSearchBoxInput(dispatchParams, paramKey, debounceTimeout);

    return (
        <InputGroup>
            <Input pr={'12'} placeholder={'Search...'}
                {...{ ref, onInput, onChange, defaultValue }}
            />
            {isClearable &&
                <InputRightElement>
                    <IconButton
                        icon={<MdOutlineClear />}
                        onClick={onClear}
                        size={'sm'}
                    />
                </InputRightElement>
            }
        </InputGroup>
    )
}