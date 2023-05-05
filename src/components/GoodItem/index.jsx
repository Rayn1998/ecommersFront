import goodImage from '../../assets/images/test_image.jpg';

const GoodItem = () => {
  return (
    <div className="good-item">
      <img className='good-item__image' src={goodImage} alt='Picture' />
      <div className='good-item__base'>
        <p className='good-item__price'>500</p>
      </div>
    </div>
  );
}

export default GoodItem;
