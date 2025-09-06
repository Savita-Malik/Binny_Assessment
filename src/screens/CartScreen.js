import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useCartStore } from "../store/cartStore";

export default function CartScreen() {
    const { cart, removeFromCart, clearCart } = useCartStore();

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.name}>
                {item.name} (x{item.qty})
            </Text>
            <Text style={styles.price}>₹{item.price * item.qty}</Text>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}   
                onPress={() => removeFromCart(item.id)}
            >
                <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {cart.length === 0 ? (
                <Text style={styles.empty}>Your cart is empty!</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                    <View style={styles.footer}>
                        <Text style={styles.total}>Total Number of Items: {totalItems}</Text>
                        <Text style={styles.total}>Total Amount: ₹{totalAmount}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.7}  
                            onPress={() => clearCart()}
                        >
                            <Text style={styles.buttonText}>Clear Cart</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    item: {
        padding: 15,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    name: { fontSize: 18, fontWeight: "bold" },
    price: { fontSize: 16, marginVertical: 5 },
    empty: { fontSize: 20, textAlign: "center", marginTop: 50 },
    footer: {
        padding: 15,
        borderTopWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
    },
    total: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
