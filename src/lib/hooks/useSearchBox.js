import { shallowEquals } from "../utils";
import { startTransition, useCallback, useEffect, useReducer, useRef, useState } from "react";
import withDebounce from "./withDebounce";

/**
 * A React hook that provides a search box for a given set of data.
 *
 * @param {function} queryFunc - Function to execute the search query. The function should accept a single argument which is an object of query parameters.
 * @param {object} initParams - Initial search query parameters.
 * @returns {object} - An object with the following properties:
 *   - items: The current search results.
 *   - totalCount: The total number of search results.
 *   - isLoading: A flag indicating whether a search is currently in progress.
 *   - params: The current search parameters.
 *   - dispatchParams: A function to update the search parameters.
 */
export default function useSearchBox(queryFunc, initParams) {
    // Define state variables and ref.
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [isLoading, setLoading] = useState(true);
    const debounceRef = useRef();

    // UseReducer hook to handle search parameters.
    const [params, dispatchParams] = useReducer(
        (state, payload) => {
            const update = (Array.isArray(payload) ? payload : [payload])
                .reduce((prev, curr) =>
                    (Object.assign(prev, { [curr.key]: curr.value })),
                    Object.assign({}, state)
                );
            return shallowEquals(state, update) ? state : update;
        },
        initParams
    );

    // Define the onSearch function that performs the search.
    const onSearch = useCallback(async () => {
        if (!queryFunc) {
            throw new Error("onSearch requires [query Function] as param");
        }

        // Update the isLoading flag.
        startTransition(() => {
            setLoading(true);
        })

        // Call the query function with the current search parameters.
        const [resItems, resTotal] = await queryFunc(params);

        // Update the state with the new search results.
        if (resItems) {
            startTransition(() => {
                setItems(resItems);
                setTotalCount(resTotal);
            })
        }

        // Update the isLoading flag.
        startTransition(() => {
            setLoading(false);
        })

    }, [setItems, queryFunc, params, setLoading]);

    // Use the useEffect hook to perform the search and cancel any previous search when the parameters change.
    useEffect(() => {
        const onCancel = withDebounce(0, () => {
            startTransition(() => {
                onSearch();
            })
        }, debounceRef)

        return () => onCancel();
        // eslint-disable-next-line
    }, [params])

    // Return an object with the search results and other relevant information.
    return { items, totalCount, isLoading, params, dispatchParams }
}
