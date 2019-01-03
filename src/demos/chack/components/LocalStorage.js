import { useEffect } from "react";

const LocalStorage = ({ item, itemKey, onLoaded }) => {
  useEffect(
    () => {
      if (item != null) {
        window.localStorage.setItem(itemKey, JSON.stringify(item));
      }
    },
    [item]
  );

  useEffect(() => {
    setTimeout(() => {
      onLoaded(JSON.parse(window.localStorage.getItem(itemKey)));
    });
  }, []);

  return null;
};

const useLocalStorageSync = (state, setState, storageKey) => {
  useEffect(() => {
    setTimeout(() => {
      setState(JSON.parse(window.localStorage.getItem(storageKey)));
    });
  }, []);

  useEffect(
    () => {
      if (state != null) {
        window.localStorage.setItem(storageKey, JSON.stringify(state));
      }
    },
    [state]
  );
};

export { useLocalStorageSync };
export default LocalStorage;
