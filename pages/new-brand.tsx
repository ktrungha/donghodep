import React from 'react';
import Brand from '../models/Brand';
import Axios from 'axios';

interface Props {
  brands: Brand[];
}

interface State {
  msg: string;
  str: string;
}

class NewBrandPage extends React.PureComponent<Props, State> {
  static async getInitialProps() {
    const response = await Axios.get('http://localhost:8001/brands?_sort=name');
    const brands = response.data;

    return { brands };
  }

  state = { msg: '', str: '' };

  render() {
    const { brands } = this.props;
    const { str } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px' }}>
          <a href="/edit-watch">Chỉnh sửa</a>
          <a href="/new-brand">Tạo mới thương hiệu</a>
          <a href="/new-watch">Thêm đồng hồ</a>
        </div>
        <div style={{ padding: '20px' }}>
          Tên thương hiệu:
          <input value={str} onChange={({ target }) => this.setState({ str: target.value })} />
          <button
            onClick={async () => {
              if (brands.find((brand) => brand.name === str.trim()) !== undefined) {
                this.setState({ msg: 'Thương hiệu đã có sẵn' });
              } else {
                const res = await Axios.post(
                  '/api/brands',
                  { name: str.trim() },
                  {
                    headers: { 'Content-Type': 'application/json' },
                  },
                );
                if (res.status === 201) {
                  this.setState({ msg: 'Đã thêm thương hiệu' });
                }
              }
            }}
          >
            Thêm
          </button>
          <div>{this.state.msg}</div>
        </div>
      </div>
    );
  }
}

export default NewBrandPage;
