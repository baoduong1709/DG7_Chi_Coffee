import { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext("");

export const OrderProvider = ({ children }) => {
    const [orderItems, setOrderItems] = useState(
        localStorage.getItem('orderItems') ? JSON.parse(localStorage.getItem('orderItems')) : [],
    );
    const addToOrder = (item) => {
        const isItemInOrder = orderItems.find((orderItem) => orderItem._id === item._id);
        if (isItemInOrder) {
            setOrderItems(
                orderItems.map((orderItem) =>
                    orderItem._id === item._id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem,
                ),
            );
        } else {
            setOrderItems([...orderItems, { ...item, quantity: 1 }]);
        }
    };
    const removeItemOrder = (item) => {
        const isItemInOrder = orderItems.find((orderItem) => orderItem._id === item._id);
        if (isItemInOrder.quantity === 1) {
            setOrderItems(orderItems.filter((orderItem) => orderItem._id !== item._id));
        } else {
            setOrderItems(
                orderItems.map((orderItem) =>
                    orderItem._id === item._id ? { ...orderItem, quantity: orderItem.quantity - 1 } : orderItem,
                ),
            );
        }
    };
    const clearItemOrder = (item) => {
        setOrderItems(orderItems.filter((orderItem) => orderItem._id !== item._id));
    };
    const clearOrder = () => {
        setOrderItems([]);
    };
    const getOrderTotal = () => {
        return orderItems.reduce((total, item) => total + item.new_price * item.quantity, 0);
    };
    useEffect(() => {
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
    }, [orderItems]);

    useEffect(() => {
        const orderItems = localStorage.getItem('orderItems');
        if (orderItems) {
            setOrderItems(JSON.parse(orderItems));
        }
    }, []);

    return (
        <OrderContext.Provider value={{ orderItems, addToOrder, removeItemOrder, clearItemOrder, clearOrder, getOrderTotal }}>
            {children}
        </OrderContext.Provider>
    );
};
