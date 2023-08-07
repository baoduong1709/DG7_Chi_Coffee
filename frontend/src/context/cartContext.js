import { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(
        localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    );

    //thêm các sản phẩm vào giỏ hàng
    const addToCart = (item) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm vào giỏ hàng thành công',
            showConfirmButton: false,
            timer: 1000,
        });
        //kiểm tra xem đã có mặt hàng trong giỏ hàng chưa
        const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
        if (isItemInCart) {
            setCartItems(
                cartItems.map((cartItem) =>
                    //nếu mặt hàng đã có trong giỏ hàng thì tăng số lượng mặt hàng lên, nếu không có thì thêm mặt hàng mới
                    cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
                ),
            );
        } else {
            //nếu mặt hàng không có trong giỏ hàng thì thêm mặt hàng
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };
    const removeItemCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
        if (isItemInCart.quantity === 1) {
            //nếu mặt hàng bằng 1 thì sẽ xóa mặt hàng đó khỏi giỏ hàng
            setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
        } else {
            setCartItems(
                cartItems.map((cartItem) =>
                    //nếu mặt hàng đã có trong giỏ hàng thì sẽ giảm số lượng
                    cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
                ),
            );
        }
    };
    const clearItemCart = (item) => {
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id)); //xóa đi 1 mặt hàng
    };
    const clearCart = () => {
        setCartItems([]); //xóa tất cả mặt hàng ở trong giỏ hàng
    };
    const getCartTotal = () => {
        //tính tổng mặt hàng trong giỏ hàng
        return cartItems.reduce((total, item) => total + item.new_price * item.quantity, 0);
    };
    //dùng useEffect để duy trì trạng thái giỏ hàng
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    //
    useEffect(() => {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
            setCartItems(JSON.parse(cartItems));
        }
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeItemCart, clearItemCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
