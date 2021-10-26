import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Button } from 'antd';
import TodoTabs from './TodoTabs';
import ClientTabs from './ClientTabs';

const navigationForDates = ['/users/todo/today', '/users/todo/tomorrow', '/users/todo/nextFive'];

const NavigationTabs = () => {
  const siteLocation = useLocation().pathname;
  const routeWithParams = siteLocation !== '/users' && (!navigationForDates.includes(siteLocation));
  const [value, setValue] = useState('');
  const [dateValue, setDateValue] = useState('today');
  const [customerTabValue, setCustomerTabValue] = useState('discussion');
  const history = useHistory();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (siteLocation === '/users') {
      setValue('pipeline');
    } else {
      setValue('todo');
    }
  }, [siteLocation]);

  const goBack = () => {
    queryClient.removeQueries('user');
    history.push('/users');
  };

  return (
    <div className='navigation-tabs'>
      {!routeWithParams && <TodoTabs
        value={value}
        dateValue={dateValue}
        setValue={setValue}
        setDateValue={setDateValue}
        history={history}
        navigationForDates={navigationForDates}
        siteLocation={siteLocation}
      />}
      {routeWithParams && <div className='navigation-tabs__back-btn__customer-tabs'>
        <Button className='navigation-tabs__back-btn' type='text' onClick={goBack}><BiArrowBack
          className='navigation-tabs__arrow-btn' /> Back</Button>
        <ClientTabs
          customerTabValue={customerTabValue}
          setCustomerTabValue={setCustomerTabValue}
        />
      </div>
      }
    </div>
  );
};

export default NavigationTabs;
