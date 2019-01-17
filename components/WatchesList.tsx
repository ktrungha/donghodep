import React from 'react';
import Watch from '../models/Watch';
import colors from '../styles/colors';
import styled from 'styled-components';
import { media } from '../styles';

interface Props {
  watches: Watch[];
}

const Img = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
  margin: auto;
`;

const BrandDiv = styled.div`
  padding: 20px 5px;
  height: 38px;
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
  ${media.mobile`
    padding: 10px;
    font-size: 1.1em;
  `}
`;

const Card = styled.div`
  width: 180px;
  border-radius: 10px;
  margin: 15px;
  overflow: hidden;
  box-shadow: 0 0 5px 2px ${colors.shadow};
  :hover {
    opacity: 0.85;
  }
  ${media.mobile`
    width: 42vw;
    min-width: 150px;
    margin: 10px;
  `}
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${media.mobile`
    padding: 5px;
  `}
`;

const WatchesList: React.SFC<Props> = (props) => {
  const { watches } = props;
  return (
    <>
      <Container>
        {watches.map((watch) => (
          <a
            key={watch.id}
            href={`/watch?id=${watch.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Card>
              <Img src={watch.image} />
              <div
                style={{
                  height: '8px',
                  backgroundColor: watch.type === 'male' ? colors.red : colors.pink,
                }}
              />
              <BrandDiv>{watch.brand}</BrandDiv>
            </Card>
          </a>
        ))}
      </Container>
    </>
  );
};

export default WatchesList;
