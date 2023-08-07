import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

export const onSubmitValidate = (item) => {  
    let today = dayjs();
    const phoneRegex = /^\d+$/;
    const gmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!item.name)
        return {state: false, message: "Chưa nhập tên"};
    else if(!item.username)
        return {state: false, message: "Chưa nhập tên đăng nhập"};
    else if(!item.ssn)
        return {state: false, message: "Chưa nhập căn cước công dân"};
    else if(!item.phone_number)
        return {state: false, message: "Chưa nhập số điện thoại"};
    else if(!phoneRegex.test(item.phone_number) || item.phone_number.length != 10)
        return {state: false, message: "Số điện thoại không hợp lệ"};
    else if(item.ssn.length != 12)
        return {state: false, message: "Căn cước công dân không hợp lệ"};
    else if(item.position === "")
        return {state: false, message: "Chưa thêm vị trí cho người được đăng kí"};
    else if(!gmail.test(item.gmail))
        return {state: false, message: "Địa chỉ email không hợp lệ"};
    else if(dayjs(item.date_of_birth, "DD/MM/YYYY").diff(today, 'year')*(-1) < 16)
        return {state: false, message: "Người được đăng kí chưa đủ tuổi lao động"};
    else {
        return {state: true, message: null}
    }
}