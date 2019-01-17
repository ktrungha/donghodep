import React from 'react';
import Watch from '../models/Watch';
import Brand from '../models/Brand';
import Axios from 'axios';
import styled from 'styled-components';
import colors from '../styles/colors';
import EditWatch from '../components/EditWatch';

const WatchDiv = styled.div`
  :hover {
    background-color: ${colors.red};
    color: white;
  }
`;

interface State {
  watches: Watch[];
  search: string;
  watch?: Watch;
}

interface Props {
  brands: Brand[];
}

class EditWatchPage extends React.PureComponent<Props, State> {
  static async getInitialProps() {
    const response = await Axios.get('http://localhost:8001/brands?_sort=name');
    const brands = response.data;

    return { brands };
  }

  constructor(props: Props) {
    super(props);

    this.state = { search: '', watches: [] };
  }

  render() {
    const { search, watches, watch } = this.state;
    const { brands } = this.props;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px' }}>
          <a href="/edit-watch">Chỉnh sửa</a>
          <a href="/new-brand">Tạo mới thương hiệu</a>
          <a href="/new-watch">Thêm đồng hồ</a>
        </div>
        <div style={{ display: 'flex', padding: '0 20px' }}>
          <div>
            <div>
              <input onChange={({ target }) => this.setState({ search: target.value })} />
              <button
                onClick={async () => {
                  const response = await Axios.get(
                    encodeURI(`/api/watches?search_like=${search}&_sort=time&_order=desc`),
                  );
                  this.setState({ watches: response.data });
                }}
              >
                Tìm Kiếm
              </button>
            </div>
            <div style={{ height: 'calc(100vh - 110px)', overflowY: 'scroll' }}>
              {watches.map((watch) => (
                <WatchDiv
                  key={watch.id}
                  style={{ display: 'flex', alignItems: 'center' }}
                  onClick={() => this.setState({ watch })}
                >
                  <img
                    src={watch.image}
                    style={{
                      width: '100px',
                      height: '70px',
                      objectFit: 'cover',
                      marginRight: '10px',
                    }}
                  />
                  <span>
                    {watch.id}: {watch.brand} {watch.name}
                  </span>
                </WatchDiv>
              ))}
            </div>
          </div>
          {watch && <EditWatch watch={watch} key={watch.id} brands={brands} />}
        </div>
      </div>
    );
  }
}

export default EditWatchPage;
