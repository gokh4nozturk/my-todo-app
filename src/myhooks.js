import { useState, memo } from 'react';

export function useToggle(initialValue = false) {
  const [isOpen, setOpen] = useState(initialValue);

  function onOpen() {
    !isOpen && setOpen(true); //condition check with react
  }
  function onClose() {
    isOpen && setOpen(false); //React ile kısa yol
  }
  function onToggle() {
    setOpen(!isOpen);
  }

  return [isOpen, { onOpen, onClose, onToggle }];
}

const initialValueFetch = {
  data: null,
  status: null,
  error: null,
};

export function useFetchData() {
  const [fetchData, setFetchData] = useState(initialValueFetch);

  function onLoading() {
    setFetchData({
      ...initialValueFetch,
      status: 'loading...',
    });
  }

  function onError(error) {
    setFetchData({
      ...initialValueFetch,
      status: 'error',
      error: error,
    });
  }

  function onSuccess(data) {
    setFetchData({
      ...initialValueFetch,
      status: 'success',
      data: data,
    });
  }
  return [fetchData, { onLoading, onError, onSuccess }];
}
