import React, { useCallback, useState } from 'react';
import { fetchKeywordSuggestions } from '@/app/api/api';
import { Alert, notification, AutoComplete, Input } from 'antd';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

export function Index() {
  const [options, setOptions] = useState<{ value: string; label: JSX.Element }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = useCallback(
    async (value: string) => {
      if (value.trim()) {
        try {
          const newSuggestions = await fetchKeywordSuggestions(value);
          const suggestionOptions = newSuggestions.map((suggestion: string | number | bigint | boolean | React.ReactElement<never, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined) => ({
            value: suggestion,
            label: <div>{suggestion}</div>,
          }));
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

  const debouncedHandleSearch = useCallback(
    debounce(handleSearch, 300),
    []
  );

  const handleSelect = (value: string) => {
    router.push(`/search/${encodeURIComponent(value)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-gray-950 text-gray-50 py-12 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Welcome to Anime Hub</h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl text-center">
            Discover the latest and greatest anime series, movies, and more.
          </p>

          <AutoComplete
            style={{ width: '100%', maxWidth: '600px', marginTop: '40px' }}
            options={options}
            onSelect={handleSelect}
            onSearch={debouncedHandleSearch}
          >
            <Input.Search
              size="large"
              placeholder="Search for anime..."
              enterButton
              allowClear
            />
          </AutoComplete>

          {error && <Alert message={error} type="error" showIcon className="mt-4" />}
        </section>
      </main>
    </div>
  );
}
