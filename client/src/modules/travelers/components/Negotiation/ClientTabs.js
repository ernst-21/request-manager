import { memo, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Radio } from 'antd';

const ClientTabs = (props) => {
  const siteLocation = useLocation().pathname;
  const [userId, setUserId] = useState('');
  const history = useHistory();

  useEffect(() => {
    const userIdArray = siteLocation.split('/');
    setUserId(userIdArray[2]);

  }, [siteLocation]);

  const customerTabs = [
    { label: 'Information', value: 'info' },
    { label: 'Discussion', value: 'discussion' }
  ];

  const onRadioChange = (e) => {
    props.setCustomerTabValue(e.target.value);
    if (e.target.value === 'info') {
      history.push('/users/' + userId);
    } else {
      history.push('/users/' + userId + '/' + e.target.value);
    }
  };

  return (
    <div className='navigation-tabs__radio-container'>
      <Radio.Group
        className='navigation-tabs__second-radio-btn'
        value={props.customerTabValue}
        initialValue='info'
        onChange={onRadioChange}
        optionType="button"
        buttonStyle="outline"
        options={customerTabs}
      />
    </div>
  );
};

export default memo(ClientTabs);
