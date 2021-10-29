import { memo, useMemo } from 'react';
import auth from '../../../auth/auth-helper';
import { Col, Row, Rate } from 'antd';
import {VscCircleFilled} from 'react-icons/vsc';
import moment from 'moment';
import { dateDiff } from '../../../../utils/date-wrangler';

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
          <p className='traveler-info__column-title'>Managed by</p>
          <p className='traveler-info__column-content'>{auth.isAuthenticated().user.name}</p>
        </Col>
        <Col span={8} >
          <p className='traveler-info__column-title'>Market</p>
          <p className='traveler-info__column-content'>{props.traveler.country}</p>
        </Col>
        <Col span={8} >
          <p className='traveler-info__column-title'>Destination</p>
          <p className='traveler-info__column-content'>Cuba</p>
        </Col>

        <Col span={8} >
          <p className='traveler-info__column-title'>Evaneos Rating</p>
          <Rate character={<VscCircleFilled style={{fontSize: '1.3rem'}} />} disabled value={props.traveler.rating} />
        </Col>
        <Col span={8} >
          <p className='traveler-info__column-title'>Number of PAX</p>
          <p className='traveler-info__column-content'>{pax}</p>
        </Col>
        <Col span={8} >
          <p className='traveler-info__column-title'>Dossier&apos;s Total Budget</p>
          <p className='traveler-info__column-content'>${props.traveler.budget ? props.traveler.budget * pax : '-'}</p>
        </Col>

        <Col span={8} >
          <p className='traveler-info__column-title'>Start of Services</p>
          <p className='traveler-info__column-content'>{moment(startDate).format('MMMM Do, yyyy')}</p>
        </Col>
        <Col span={8} >
          <p className='traveler-info__column-title'>End of Services</p>
          <p className='traveler-info__column-content'>{endDate !== '--' ? moment(endDate).format('MMMM Do, yyyy') : '--'}</p>
        </Col>
        <Col span={8} >
          <p className='traveler-info__column-title'>Length of trip</p>
          <p className='traveler-info__column-content'>{travelDuration}</p>
        </Col>
      </Row>
    </>
  );
};

export default memo(TravelerMainInfoCard);
