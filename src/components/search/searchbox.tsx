import React, {useEffect, useState, useRef, useCallback} from 'react';
import { AutoComplete, Input, Alert, notification } from 'antd';
import { fetchKeywordSuggestions } from '@/app/api/api';

interface SearchBoxProps {
    placeholder?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = "Search..." }) => {
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>(''); // 追踪搜索框中的值
    const [isComposing, setIsComposing] = useState<boolean>(false); // 追踪输入法状态
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 保存定时器 ID

    const precheckRequest = async () => {
            try {
                await fetchKeywordSuggestions('ping'); // 试探性调用
                // 可以在此处理成功的预检请求
            } catch (error) {
                // 如果需要，可以在此处理错误
                console.error('Precheck request failed:', error);
            }
        };



    useEffect(() => {
        precheckRequest().then(r => r);
    }, []);

    // 自定义防抖函数
    const debouncedSearch = useCallback((value: string) => {
        // 先清除上一个定时器
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // 设置新的定时器
        searchTimeoutRef.current = setTimeout(async () => {
            if (value.trim()) {
                try {
                    const newSuggestions = await fetchKeywordSuggestions(value);
                    const suggestionOptions = newSuggestions.map((suggestion: string) => ({
                        value: suggestion,
                        label: <div>{suggestion}</div>,
                    }));
                    setOptions(suggestionOptions);
                    setError(null);  // 清除旧错误
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
        }, 2000); // 2000 毫秒的防抖时间
    }, []);

    // 处理用户输入变化
    const handleInputChange = (value: string) => {
        setSearchValue(value); // 更新搜索框的值
        if (!isComposing) {
            debouncedSearch(value); // 仅在输入法完成后执行搜索建议
        }
    };

    // 输入法开始
    const handleCompositionStart = () => {
        setIsComposing(true); // 输入法开始，防止搜索中途触发
    };

    // 输入法结束
    const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
        setIsComposing(false); // 输入法结束，允许搜索
        debouncedSearch(e.currentTarget.value); // 输入法结束后立即触发搜索
    };

    // 处理选择建议后的动作
    const handleSelect = (value: string) => {
        window.open(`/search/${encodeURIComponent(value)}`);
    };

    // 点击搜索按钮或按回车触发的搜索功能
    const handleSearchButtonClick = (value: string) => {
        if (value.trim()) {
            window.open(`/search/${encodeURIComponent(value)}`); // 跳转到搜索结果页面
        }
    };


    return (
        <>
            <AutoComplete
                style={{ width: '100%', maxWidth: '600px', marginTop: '40px' }}
                options={options}
                autoFocus={true}
                onSelect={handleSelect}
                value={searchValue} // 绑定搜索框的值
                onChange={handleInputChange} // 当输入变化时更新状态
                // onClick={() => precheckRequest()} // 点击搜索框时进行预检
            >
                <Input.Search
                    size="large"
                    placeholder={placeholder}
                    enterButton
                    allowClear
                    value={searchValue} // 绑定输入框的值
                    onChange={(e) => handleInputChange(e.target.value)} // 处理用户输入
                    onSearch={handleSearchButtonClick} // 点击搜索按钮或按回车触发搜索
                    onCompositionStart={handleCompositionStart} // 监听输入法开始
                    onCompositionEnd={handleCompositionEnd} // 监听输入法结束
                />
            </AutoComplete>
            {error && <Alert message={error} type="error" showIcon className="mt-4" />}
        </>
    );
};
