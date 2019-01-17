import React from 'react';

class EditPage extends React.PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px' }}>
        <a href="/edit-watch">Chỉnh sửa</a>
        <a href="/new-brand">Tạo mới thương hiệu</a>
        <a href="/new-watch">Thêm đồng hồ</a>
      </div>
    );
  }
}

export default EditPage;
