import React, { Component } from 'react'
import { Select } from 'antd'
import { httpPost } from '../../tools/request';
const { Option } = Select;

export class SearchSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: null
        }
    }
    componentDidMount() {
        this.fetch(this.props.url, null, data => this.setState({ data }));
    }
    fetch = (url, value, callback) => {
        console.log("fetch....:" + url);
        httpPost(url, { Key: value }).then(res => {
            let data = [];
            if (res.Data && res.Data.length > 0) {
                res.Data.map(item => data.push({ value: item.Value, text: item.Meaning }))
            }
            callback(data);
        });
    }
    handleSearch = value => {
        if (value) {
            const url = this.props.url;
            console.log("handleSearch,value=" + value + ",url=" + url)
            this.fetch(url, value, data => this.setState({ data }));
        }
    };
    handleChange = value => {
        this.setState({ value });
    };
    handleSelect = value => {
        this.props.onSelect(value);
    }
    render() {
        const options = this.state.data.map(d => <Option key={d.value} value={d.value}>{d.value}({d.text})</Option>);
        return (
            <Select
                showSearch
                placeholder="Select a person"
                onChange={this.handleChange}
                //onFocus={onFocus}
                //onBlur={onBlur}
                onSearch={this.handleSearch}
                onSelect={this.handleSelect}
            >
                {options}
            </Select>
        )
    }
}
export default SearchSelect
