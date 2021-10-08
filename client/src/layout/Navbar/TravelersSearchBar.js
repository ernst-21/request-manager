import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const TravelersSearchBar = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  };
  return (
    <AutoComplete
      className='travelers-search'
      value={value}
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      placeholder="Search"
    />
  );
};

export default TravelersSearchBar;
