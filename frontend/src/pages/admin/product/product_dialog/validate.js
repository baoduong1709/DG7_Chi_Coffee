export const onSubmitValidate = (item) => {
    if(!item.product_name)
        return {state: false, message: "Chưa nhập tên sản phẩm"};
    else if(!item.id_product_type)
        return {state: false, message: "Chưa chọn loại hàng"};
    else if(!item.new_price)
        return {state: false, message: "Chưa nhập giá mới"};
    else if(!item.product_image)
        return {state: false, message: "Chưa thêm hình ảnh"};
    else if(item.product_status === null || item.product_status === undefined)
        return {state: false, message: "Chưa chọn trạng thái mặt hàng"};
    else {
        return {state: true, message: null}
    };
}