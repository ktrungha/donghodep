import React from 'react';
import Watch from '../models/Watch';
import styled from 'styled-components';
import LoadingBox from './LoadingBox';
import { media } from '../styles';
import { Button } from '@material-ui/core';

const Image = styled.img`
  width: 100px;
  height: 80px;
  margin: 5px;
  object-fit: cover;
  :hover {
    cursor: pointer;
  }
`;

const MainImage = styled.img`
  border-radius: 10px;
  height: auto;
  width: 550px;
  object-fit: cover;
  ${media.mobile`
    margin: 0;
    width: 100vw;
    height: auto;
    border-radius: 0;
  `}
`;

interface Props {
  watch: Watch;
  commentLoaded: boolean;
}

class WatchDetails extends React.PureComponent<
  Props,
  { currentImage: string; showVideo: boolean }
> {
  constructor(props: Props) {
    super(props);

    this.state = { currentImage: props.watch.image, showVideo: false };
  }

  render() {
    const { watch, commentLoaded } = this.props;
    const { showVideo } = this.state;
    return (
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 500 }}>{watch.brand}</h2>

        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '400px',
            justifyContent: 'space-evenly',
            margin: '10px auto',
          }}
        >
          <Button
            variant={showVideo ? 'outlined' : 'contained'}
            onClick={() => this.setState({ showVideo: false })}
          >
            Ảnh
          </Button>
          <Button
            variant={showVideo ? 'contained' : 'outlined'}
            onClick={() => this.setState({ showVideo: true })}
          >
            Video
          </Button>
        </div>

        <div style={{ display: showVideo ? 'none' : 'block' }}>
          <MainImage src={this.state.currentImage} />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginBottom: '25px',
              justifyContent: 'center',
            }}
          >
            <Image src={watch.image} onClick={() => this.setState({ currentImage: watch.image })} />
            {watch.otherImages.map((image) => (
              <Image src={image} onClick={() => this.setState({ currentImage: image })} />
            ))}
          </div>
        </div>
        {watch.video && (
          <div style={{ display: showVideo ? 'block' : 'none' }}>
            <div
              className="fb-video"
              data-href={watch.video}
              data-width="500"
            />
          </div>
        )}
        <br />
        {!commentLoaded && <LoadingBox message="" />}
        <div className="fb-comments" data-numposts="10" data-order-by="reverse_time" />
      </div>
    );
  }
}

export default WatchDetails;
