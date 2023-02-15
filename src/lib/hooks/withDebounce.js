/**
 * Function that returns a debounced version of a callback function.
 * @param {number} timeout - The debounce timeout.
 * @param {function} callback - The function to debounce.
 * @param {object} debounceRef - A ref object used to store the current timeout ID.
 * @returns {function} The cancellation function.
 */
export default function withDebounce(timeout, callback, debounceRef) {
    const onCancel = () => clearTimeout(debounceRef.current);

    onCancel();
    debounceRef.current = setTimeout(async () => {
        await callback()
    }, timeout);

    return onCancel;
}