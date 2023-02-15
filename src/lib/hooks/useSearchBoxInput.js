import { isEmpty } from "../utils";
import { startTransition, useCallback, useRef, useState } from "react";
import withDebounce from "./withDebounce";

/**
 * Hook for controlling an input element used in searching.
 * @param {function} dispatchParams - The `dispatchParams` function returned by `useSearchBox`.
 * @param {string} paramKey - The key of the query parameter to control with the input element.
 * @param {number} [debounceTimeout=1000] - The debounce timeout for the input element.
 * @returns {object} Object containing `ref`, `onInput`, `onChange`, `onClear`, and `isClearable`.
 */
export default function useSearchBoxInput(dispatchParams, paramKey, debounceTimeout = 1000) {
    const ref = useRef();
    const debounceRef = useRef();
    const [isClearable, setClearable] = useState();

    const onChange = useCallback((e) => {
        startTransition(() => {
            const value = e?._reactName ? e.target.value : e;
            setClearable(isEmpty(value) === false);
            withDebounce(debounceTimeout, () => dispatchParams({ key: paramKey, value }), debounceRef);
        })
    }, [dispatchParams, paramKey, debounceTimeout]);

    const onInput = useCallback((e) => {
        startTransition(() => {
            setClearable(isEmpty(e.target.value) === false);
        })
    }, [setClearable]);

    const onClear = useCallback(() => {
        startTransition(() => {
            if (ref?.current) ref.current.value = '';
            setClearable(false);
            withDebounce(0, () => dispatchParams({ key: paramKey, value: undefined }), debounceRef);
        })
    }, [ref, setClearable, paramKey, dispatchParams])

    return { ref, onInput, onChange, onClear, isClearable };
}