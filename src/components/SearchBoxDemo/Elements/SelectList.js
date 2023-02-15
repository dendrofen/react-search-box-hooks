import { Select } from '@chakra-ui/react';

export default function SelectList({ dispatchParams, paramKey, value }) {
    const items = ['🌳 trees', '💃 Rumba', 'books 📚'];

    return (
        <Select placeholder='Select option'
            onChange={e => dispatchParams({ key: paramKey, value: e.target.value })}
            value={value}
        >
            {items.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
        </Select>
    )
}