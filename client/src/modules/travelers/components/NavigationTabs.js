import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Radio, Button } from 'antd';

const navigationForDates = ['/users/todo/today', '/users/todo/tomorrow', '/users/todo/nextFive'];

const NavigationTabs = () => {
  const siteLocation = useLocation().pathname;
  const routeWithoutParams = siteLocation !== '/users' && (!navigationForDates.includes(siteLocation));
  const [value, setValue] = useState('');
  const [dateValue, setDateValue] = useState('today');
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

  const dateOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'Next 5 days', value: 'nextFive' },
  ];

  const onRadioChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === 'pipeline') {
      return history.push('/users');
    } else {
      return history.push('/users/todo/today');
    }
  };

  const onRadioTimeChange = (e) => {
    setDateValue(e.target.value);
    history.push('/users/todo/' + e.target.value);
  };

  const goBack = () => {
    history.goBack();
  };


  return (
    <div className='navigation-tabs'>
      {!routeWithoutParams && <div className='navigation-tabs__radio-container'>
        <Radio.Group
          className='navigation-tabs__main-radio-btn'
          value={value}
          defaultValue={value}
          onChange={onRadioChange}
          optionType="button"
          buttonStyle="solid"
          options={options}
        />
        {navigationForDates.includes(siteLocation) && <Radio.Group
          className='navigation-tabs__second-radio-btn'
          value={dateValue}
          defaultValue={dateValue}
          onChange={onRadioTimeChange}
          optionType="button"
          buttonStyle="outline"
          options={dateOptions}
        />}
      </div> }
      {routeWithoutParams &&
      <Button className='navigation-tabs__back-btn' type='text' onClick={goBack}><BiArrowBack
        className='navigation-tabs__arrow-btn' /> Back</Button>}
    </div>
  );
};

export default NavigationTabs;
