import { memo } from 'react';
import { Row, Col } from 'antd';

const TravelerProfileCard = (props) => {
  return (
    <>
      <h2>Travelers Information</h2>
      <p className="traveler-info__column-title">Profile</p>
      <p className="traveler-info__column-content">
        {props.traveler.travelPartners}
      </p>
      <br/>
      <div>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <p className="traveler-info__column-title">First and last name</p>
            <p className="traveler-info__column-content">
              {props.traveler.name} {props.traveler.lastName}
            </p>
          </Col>
          <Col span={8}>
            <p className="traveler-info__column-title">Phone number</p>
            <p className="traveler-info__column-content">
              +{props.traveler.phone}
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default memo(TravelerProfileCard);
