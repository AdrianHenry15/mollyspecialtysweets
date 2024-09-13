import useOrderMethodStore from "@/stores/order-method-store";

export const OrderMethod = () => {
    const { deliveryDate, deliveryAddress, orderMethod, setDeliveryDate, setDeliveryAddress, setOrderMethod, clearOrderMethod } =
        useOrderMethodStore();

    const handleOrderMethodChange = (method: "pickup" | "delivery") => {
        setOrderMethod(method);
    };

    return (
        <div>
            {/* Example: Set Order Method */}
            <button onClick={() => handleOrderMethodChange("pickup")}>Pickup</button>
            <button onClick={() => handleOrderMethodChange("delivery")}>Delivery</button>

            {/* Set Delivery Date */}
            <input type="date" value={deliveryDate || ""} onChange={(e) => setDeliveryDate(e.target.value)} />

            {/* Set Delivery Address */}
            {orderMethod === "delivery" && (
                <input
                    type="text"
                    placeholder="Delivery Address"
                    value={deliveryAddress || ""}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                />
            )}

            {/* Show current order method */}
            <p>Order Method: {orderMethod}</p>

            {/* Clear Order Details */}
            <button onClick={clearOrderMethod}>Clear Order Method</button>
        </div>
    );
};
