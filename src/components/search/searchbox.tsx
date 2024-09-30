import React, { useState, useCallback } from 'react';
import { AutoComplete, Input, Alert, notification } from 'antd';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { fetchKeywordSuggestions } from '@/app/api/api';

interface SearchBoxProps {
  placeholder?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = "Search..." }) => {
  const [options, setOptions] = useState<{ value: string; label: JSX.Element }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = useCallback(
    async (value: string) => {
      if (value.trim()) {
        try {
          const newSuggestions = await fetchKeywordSuggestions(value);
          const suggestionOptions = newSuggestions.map((suggestion: string | number | bigint | boolean | React.ReactElement<never, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined) => {
              return ({
                  value: suggestion,
                  label: <div>{suggestion}</div>,
              });
          });
          setOptions(suggestionOptions);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
            notification.error({
              message: 'Error',
              description: error.message,
            });
          }
        }
      } else {
        setOptions([]);
      }
    },
    []
  );

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

  const handleSelect = (value: string) => {
    router.push(`/search/${encodeURIComponent(value)}`);
  };

  return (
    <>
      <AutoComplete
        style={{ width: '100%', maxWidth: '600px', marginTop: '40px' }}
        options={options}
        autoFocus={true}

        onSelect={handleSelect}
        onSearch={debouncedHandleSearch}
      >
        <Input.Search size="large" placeholder={placeholder} enterButton allowClear />
      </AutoComplete>
      {error && <Alert message={error} type="error" showIcon className="mt-4" />}
    </>
  );
};
