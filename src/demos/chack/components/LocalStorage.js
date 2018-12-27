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

export default LocalStorage
