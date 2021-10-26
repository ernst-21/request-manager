import {memo} from 'react';
import { Radio } from 'antd';

const TodoTabs = (props) => {

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
    props.setValue(e.target.value);
    if (e.target.value === 'pipeline') {
      return props.history.push('/users');
    } else {
      return props.history.push('/users/todo/today');
    }
  };

  const onRadioTimeChange = (e) => {
    props.setDateValue(e.target.value);
    props.history.push('/users/todo/' + e.target.value);
  };

  return (
    <>
      <div className='navigation-tabs__radio-container'>
        <Radio.Group
          className='navigation-tabs__main-radio-btn'
          value={props.value}
          defaultValue={props.value}
          onChange={onRadioChange}
          optionType="button"
          buttonStyle="solid"
          options={options}
        />
        {props.navigationForDates.includes(props.siteLocation) && <Radio.Group
          className='navigation-tabs__second-radio-btn'
          value={props.dateValue}
          defaultValue={props.dateValue}
          onChange={onRadioTimeChange}
          optionType="button"
          buttonStyle="outline"
          options={dateOptions}
        />}
      </div>
    </>
  );
};

export default memo(TodoTabs);
