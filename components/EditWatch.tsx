import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import Watch from '../models/Watch';
import Axios from 'axios';
import Brand from '../models/Brand';

const Image = styled.img`
  width: 300px;
`;

const ImageContainer = styled.div`
  margin: 10px;
`;

interface Props {
  watch: Watch;
  brands: Brand[];
}

class EditWatch extends React.PureComponent<Props, { watch: Watch }> {
  constructor(props: Props) {
    super(props);

    this.state = { watch: props.watch };
  }

  componentDidMount() {
    this.setState({ watch: { ...this.props.watch } });
  }

  render() {
    const { watch } = this.state;
    const { brands } = this.props;
    return (
      <div style={{ flex: 1 }}>
        <div style={{ margin: '10px' }}>
          Thương Hiệu:&nbsp;
          <select
            value={watch.brand}
            onChange={({ target }) => this.setState({ watch: { ...watch, brand: target.value } })}
          >
            {brands.map((brand) => (
              <option key={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div style={{ margin: '10px' }}>
          Tên:&nbsp;
          <input
            value={watch.name}
            onChange={({ target }) => this.setState({ watch: { ...watch, name: target.value } })}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <ImageContainer>
            <Image style={{}} src={watch.image} />
            <br />
            <input
              value={watch.image}
              onChange={({ target }) => this.setState({ watch: { ...watch, image: target.value } })}
            />
          </ImageContainer>
          {watch.otherImages.map((image, index) => (
            <ImageContainer key={image}>
              <Image src={image} />
              <br />
              <input
                value={image}
                onChange={({ target }) => {
                  const val = watch.otherImages.slice();
                  val[index] = target.value;
                  this.setState({ watch: { ...watch, otherImages: val } });
                }}
              />
              <button
                onClick={() => {
                  const val = watch.otherImages.filter((_, i) => i !== index);
                  this.setState({ watch: { ...watch, otherImages: val } });
                }}
              >
                Xóa
              </button>
            </ImageContainer>
          ))}
          <button
            onClick={() =>
              this.setState({ watch: { ...watch, otherImages: watch.otherImages.concat('') } })
            }
          >
            Thêm ảnh
          </button>
        </div>
        <div style={{ margin: '10px' }}>
          <select
            value={watch.type}
            onChange={({ target }) => this.setState({ watch: { ...watch, type: target.value } })}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
        <div style={{ margin: '10px' }}>
          Video:&nbsp;
          <input
            value={watch.video || ''}
            onChange={({ target }) => this.setState({ watch: { ...watch, video: target.value } })}
          />
        </div>
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (watch.id === undefined) {
              Axios.post(
                '/api/watches',
                { ...watch, time: new Date().getTime(), search: `${watch.brand} ${watch.name}` },
                {
                  headers: { 'Content-Type': 'application/json' },
                },
              );
              window.location.reload();
            } else {
              Axios.put(
                `/api/watches/${watch.id}`,
                { ...watch, search: `${watch.brand} ${watch.name}` },
                {
                  headers: { 'Content-Type': 'application/json' },
                },
              );
            }
          }}
        >
          Lưu
        </Button>
      </div>
    );
  }
}

export default EditWatch;
