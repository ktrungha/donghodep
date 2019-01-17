import React from 'react';
import EditWatch from '../components/EditWatch';
import Watch from '../models/Watch';
import Axios from 'axios';
import Brand from '../models/Brand';

interface State {
  watch: Watch;
}

interface Props {
  brands: Brand[];
}

class NewWatchPage extends React.PureComponent<Props, State> {
  static async getInitialProps() {
    const response = await Axios.get('http://localhost:8001/brands?_sort=name');
    const brands = response.data;

    return { brands };
  }

  state = {
    watch: { brand: '', name: '', image: '', otherImages: [] as string[], type: 'male' } as Watch,
  };

  render() {
    const { brands } = this.props;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px' }}>
          <a href="/edit-watch">Chỉnh sửa</a>
          <a href="/new-brand">Tạo mới thương hiệu</a>
          <a href="/new-watch">Thêm đồng hồ</a>
        </div>
        <div style={{ padding: '20px' }}>
          <EditWatch watch={this.state.watch} brands={brands} />
        </div>
      </div>
    );
  }
}

export default NewWatchPage;
