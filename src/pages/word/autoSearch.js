import React, { useState } from 'react'
import { Input, AutoComplete } from 'antd';
import { httpPost } from '../../tools/request';

const AutoSearch = (props) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const fetch = (url, value) => {
        console.log("fetch....:" + url);
        httpPost(url, { Key: value }).then(res => {
            let data = [];
            if (res.Data && res.Data.length > 0) {
                res.Data.map(item => data.push({ value: item.Value, text: item.Meaning }))
            }
            setOptions(data)
        });
    }
    const onSearch = v => {
        fetch(props.url, v);
    }
    const prefixChange = (data) => {
        setValue(data);
    }
    return (
        <AutoComplete
            value={value}
            options={options}
            onChange={prefixChange}
            onSearch={onSearch}
            onSelect={props.onSelect}
            placeholder={props.placeholder}>
            <Input />
        </AutoComplete>
    )
}

export default AutoSearch
