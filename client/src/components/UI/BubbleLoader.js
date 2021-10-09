import Loader from 'react-js-loader';

const BubbleLoader = () => {
  return (
    <div className='loader-backdrop'>
      <div className='loader__container'>
        <Loader  type="bubble-loop" bgColor={'#f6f6f6'} title='Loading' color={'#f6f6f6'} size={60} />
      </div>
    </div>
  );
};

export default BubbleLoader;
