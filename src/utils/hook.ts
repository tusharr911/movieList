import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useDebounceHook<type>(
  textToBeDebounced: type,
  debounceTime = 1000
): type {
  const [debouncedtext, setDebouncedtext] = useState(textToBeDebounced);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedtext(textToBeDebounced);
    }, debounceTime);

    return () => clearTimeout(timerId);
  }, [textToBeDebounced, debounceTime]);

  return debouncedtext;
}

export function useSetLocalStorage(email: string) {
  useEffect(() => {
    if (email) {
      const DataObject = {
        authenticated: true,
        watchList: [],
      };
      localStorage.setItem(email, JSON.stringify(DataObject));
    }
  }, [email]);
}

// export function useGetLocalStorage() {
//   useEffect(() => {
//     localStorage.getItem();
//   }, []);
// }
