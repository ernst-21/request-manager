import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Radio, Button } from 'antd';

const NavigationTabs = () => {
  const siteLocation = useLocation().pathname;
  const routeWithParams = siteLocation !== '/users' && siteLocation !== '/users/todo';
  const [value, setValue] = useState('');
  const history = useHistory();

  console.log(routeWithParams);

  useEffect(() => {
    if (siteLocation === '/users') {
      setValue('pipeline');
    } else {
      setValue('todo');
    }
  }, [siteLocation]);

  const options = [
    { label: 'Pipeline', value: 'pipeline' },
    { label: 'To Do', value: 'todo' }
  ];

  const onRadioChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === 'pipeline') {
      return history.push('/users');
    } else {
      return history.push('/users/todo');
    }
  };

  const goBack = () => {
    history.goBack();
  };


  return (
    <div className='navigation-tabs'>
      {!routeWithParams && <Radio.Group
        value={value}
        defaultValue={value}
        onChange={onRadioChange}
        optionType="button"
        buttonStyle="solid"
        options={options}
      />}
      {routeWithParams &&
      <Button type='text' onClick={goBack} style={{display: 'inline-flex', alignItems: 'center', fontSize: '1rem'}}><BiArrowBack style={{ fontSize: '1.7rem', marginRight: '3px' }} /> Back</Button>}
    </div>
  );
};

export default NavigationTabs;
