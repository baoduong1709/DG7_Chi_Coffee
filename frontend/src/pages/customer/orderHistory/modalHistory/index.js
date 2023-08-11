import '~/assets/css/orderHistory.css';

function ModalHistory({ data, selectedOrder }) {
    const order = data.find((order) => order._id === selectedOrder?._id);
    //tìm đối tượng đơn hàng trong mảng data mà có _id giống với _id của đối tượng selectedOrder, sau đó lưu nó vào biến order.
    //Nếu không tìm thấy đơn hàng phù hợp (hoặc nếu selectedOrder là null hoặc không xác định), biến order sẽ có giá trị undefined.
    //Điều này giúp cho component kiểm tra xem có đơn hàng nào được chọn trước khi hiển thị nội dung của modal.
    //Nếu không có đơn hàng được chọn (order là undefined), component sẽ trả về null để ngăn việc hiển thị nội dung của modal.
    //Ngược lại, nó sẽ hiển thị modal với chi tiết của đơn hàng đã chọn.
    if (!order) {
        return null; // Thêm kiểm tra nếu không có mã đơn hàng nào được chọn
    }
    return (
        <div
            className="modal fade"
            id="modalHistory"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-2 text-uppercase text-danger fw-bold" id="exampleModalLabel">
                            Chi tiết đơn hàng
                        </h1>
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.product.map((product) => (
                                    <tr key={product.product_id}>
                                        <td>{product.product_name}</td>
                                        <td>{product.quanlity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalHistory;
