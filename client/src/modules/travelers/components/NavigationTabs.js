import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Radio } from 'antd';

const NavigationTabs = () => {
  const siteLocation = useLocation().pathname;
  const [value, setValue] = useState('');
  const history = useHistory();

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

  return (
    <div className='navigation-tabs'>
      <Radio.Group
        value={value}
        defaultValue={value}
        onChange={onRadioChange}
        optionType="button"
        buttonStyle="solid"
        options={options}
      />
    </div>
  );
};

export default NavigationTabs;
