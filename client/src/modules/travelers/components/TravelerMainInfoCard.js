import { memo, useMemo } from 'react';
import auth from '../../auth/auth-helper';
import { Col, Row, Rate } from 'antd';
import {VscCircleFilled} from 'react-icons/vsc';
import moment from 'moment';
import { dateDiff } from '../../../utils/date-wrangler';

const TravelerMainInfoCard = (props) => {

  const pax = useMemo(() => props.traveler.adults + props.traveler.young + props.traveler.children + props.traveler.babies, [props.traveler.adults, props.traveler.young, props.traveler.children, props.traveler.babies]);

  const startDate = useMemo(() => props.traveler.range.length > 0 ? props.traveler.range[0] : props.traveler.estimatedDate[0] ,[props.traveler.range, props.traveler.estimatedDate]);

  const endDate = useMemo(() => props.traveler.range.length > 0 ? props.traveler.range[1] : '--' ,[props.traveler.range]);

  const travelDuration = useMemo(() => props.traveler.duration ? props.traveler.duration : dateDiff(props.traveler.range[0], props.traveler.range[1]), [props.traveler.range, props.traveler.duration]);

  return (
    <>
      <h2>Main Information</h2>
      <Row gutter={[24, 24]}>
        <Col span={8} >
          <p>Managed by</p>
          <p>{auth.isAuthenticated().user.name}</p>
        </Col>
        <Col span={8} >
          <p>Market</p>
          <p>{props.traveler.country}</p>
        </Col>
        <Col span={8} >
          <p>Destination</p>
          <p>Cuba</p>
        </Col>

        <Col span={8} >
          <p>Evaneos Rating</p>
          <Rate character={<VscCircleFilled style={{fontSize: '1.3rem'}} />} disabled value={props.traveler.rating} />
        </Col>
        <Col span={8} >
          <p>Number of PAX</p>
          <p>{pax}</p>
        </Col>
        <Col span={8} >
          <p>Dossier&apos;s Total Budget</p>
          {props.traveler.budget ? props.traveler.budget * pax : '-'}
        </Col>

        <Col span={8} >
          <p>Start of Services</p>
          <p>{moment(startDate).format('MMMM Do, yyyy')}</p>
        </Col>
        <Col span={8} >
          <p>End of Services</p>
          <p>{endDate !== '--' ? moment(endDate).format('MMMM Do, yyyy') : '--'}</p>
        </Col>
        <Col span={8} >
          <p>Length of trip</p>
          <p>{travelDuration}</p>
        </Col>
      </Row>
    </>
  );
};

export default memo(TravelerMainInfoCard);
