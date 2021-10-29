import React from 'react';
import { Col, Row, Space } from 'antd';
import {IoCheckmarkDone} from 'react-icons/all';
import moment from 'moment';

const InitialRequestCard = (props) => {
  const dateToDisplay = moment(props.traveler.created).format('MMMM Do, yyyy');
  return (
    <>
      <h2>Initial Request</h2>
      <p className='traveler-info__column-title' style={{fontSize: '1.1rem', fontWeight: 500}}><IoCheckmarkDone style={{fontSize: '1.5rem'}} />{dateToDisplay}</p>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <p className="traveler-info__column-title">Travelers</p>
          <p className="traveler-info__column-content">
            {props.traveler.adults} Adults · {props.traveler.young} Teenagers ·{' '}
            {props.traveler.children} Children · {props.traveler.babies} Babies
          </p>
        </Col>
        <Col span={24}>
          <p className="traveler-info__column-title">Requested made through</p>
          <p className="traveler-info__column-content">Website</p>
        </Col>
        <Col span={24}>
          <p className="traveler-info__column-title">
            How far are you in the Trip Planning
          </p>
          <p className="traveler-info__column-content">
            {props.traveler.stage}
          </p>
        </Col>
        <Col span={24}>
          <p className="traveler-info__column-title">Kind of trip</p>
          {props.traveler.travelType.map((type) => (
            <p key={type} className="traveler-info__column-content">
              {type}
            </p>
          ))}
        </Col>
        <Col span={24}>
          <p className="traveler-info__column-title">Accommodation Type</p>
          <Space>
            {props.traveler.accommodationType.map((type) => (
              <p key={type} className="traveler-info__column-content">
                {type} ·
              </p>
            ))}
          </Space>
        </Col>
        <Col span={24}>
          <p className="traveler-info__column-title">
            Accompaniment
          </p>
          <p className="traveler-info__column-content">
            {props.traveler.accompaniment}
          </p>
        </Col>
        {props.traveler.description && <Col span={24}>
          <p className="traveler-info__column-title">
            What do you expect from your travel?
          </p>
          <p className="traveler-info__column-content">
            {props.traveler.description}
          </p>
        </Col>}
      </Row>
    </>
  );
};

export default InitialRequestCard;
