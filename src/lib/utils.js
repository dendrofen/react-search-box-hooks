/**
 * Checks if two objects are shallowly equal, i.e. they have the same keys and values.
 * @param {Object} object1 - The first object to compare.
 * @param {Object} object2 - The second object to compare.
 * @returns {boolean} Returns `true` if the two objects are shallowly equal, `false` otherwise.
 */
export function shallowEquals(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }
    return true;
}
/**

Checks whether a value is empty.
@param {any} value - The value to be checked for emptiness.
@returns {boolean} - Returns true if the value is empty, otherwise false.
*/
export function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}