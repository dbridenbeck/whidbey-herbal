import styled from 'styled-components';
import { device } from '../../utils/devices';

const reviewsList = [
  {
    text: '"These essential oils are the best ones I\'ve come across. The scents are purely intoxicating and so true. You can very easily tell that they are hand crafted in small batches. It\'s hard to chose a favorite, but I think mine is Douglas Fir. So happy to come across these amazing (and local!) essential oil makers."',
    name: 'Valerie Yoder',
  },
  {
    text: '"Authentic, crisp, and fresh, mountain air. The scent whisps you away into the mountains. Bring a compass with you when you indulge in the aroma."',
    name: 'James',
  },
  {
    text: '"I knew they were here before I opened my mailbox. Nothing was broken or had spilled out. I guess my nose can detect the faintest hint of western red cedar. This batch is the best! And thank y\'all for the lavender sample. :)"',
    name: '100pinkroses',
  },
];

const ReviewsWrapper = styled.div`
  display: block;
  width: 100%;
  margin: 25px auto 0px auto;
  padding: 0;
  h2 {
    margin: 0;
    padding: 0;
    color: #787878;
    font-size: 1.5em;
    font-weight: normal;
  }
  @media ${device.tablet} {
    margin: 25px auto 0 auto;
    width: 66%;
  }
  @media ${device.laptop} {
    margin: 90px auto 0 auto;
  }
`;

const ReviewContainer = styled.div`
  width: 100%;
  margin: 0 auto 30px auto;
  p {
    display: inline;
    font-style: italic;
    font-size: 0.75em;
    color: #787878;
    @media ${device.laptop} {
      font-size: 0.875em;
    }
  }
`;

const Reviews = () => {
  return (
    <ReviewsWrapper>
      <h2>Reviews</h2>
      {reviewsList.map((review) => (
        <ReviewContainer key={review.name}>
          <p> {review.text} </p>
          <p> {' - ' + review.name} </p>
        </ReviewContainer>
      ))}
    </ReviewsWrapper>
  );
};

export default Reviews;
