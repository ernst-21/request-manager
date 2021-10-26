import React, { useState, useCallback } from 'react';
import { useMutation } from 'react-query';
import { searchUser } from '../../modules/agent/api-agent';
import { AutoComplete } from 'antd';
import { Redirect, useHistory } from 'react-router-dom';

const { Option } = AutoComplete;

const TravelersSearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState([]);
  const [travelerOptions, setTravelerOptions] = useState([]);
  const history = useHistory();

  const { mutate: searchMutation, isError } = useMutation((name) => searchUser(name).then(data => data), {
    onSuccess: data => setTravelerOptions(data)
  });

  const onChange = useCallback((value) => {
    let res = [];

    setSearchText(value);
    if (!value) {
      res = [];
    } else {
      searchMutation({
        name: value
      });
      res = travelerOptions.map(traveler => traveler.name + ' ' + traveler.lastName);
    }

    setResult(res);
  }, [searchMutation, travelerOptions]);

  const onSelect = (data) => {
    const selectedTraveler = travelerOptions.filter(traveler => traveler.name + ' ' + traveler.lastName === data);

    if (!selectedTraveler[0]) {
      setSearchText('');
      return;
    }
    history.push('/users/' + selectedTraveler[0]._id);
    setSearchText('');
    setTravelerOptions([]);
  };

  if (isError) {
    return <Redirect to="/info-network-error" />;
  }

  return (
    <AutoComplete
      allowClear={true}
      value={searchText}
      className='travelers-search'
      onSelect={onSelect}
      onChange={onChange}
      placeholder="Search"
      notFoundContent="No users were found"
    >
      {result.map((traveler) => (
        <Option key={traveler} value={traveler}>
          {traveler}
        </Option>
      ))}
    </AutoComplete>
  );
};

export default TravelersSearchBar;
