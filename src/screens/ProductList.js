import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { products } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { getToken, saveToken } from "../services/authService";
import { NativeModules } from "react-native";
const { DeviceModule } = NativeModules;



export default function ProductList() {
    const [page, setPage] = useState(1);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [token, setToken] = useState("");

    const addToCart = useCartStore((state) => state.addToCart);

    const PAGE_SIZE = 20;
    const ITEM_HEIGHT = 120;

    useEffect(() => {
        loadMore();
        loadToken();
    }, []);

    const loadMore = () => {
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const newItems = products.slice(start, end);

        if (newItems.length > 0) {
            setVisibleProducts((prev) => [...prev, ...newItems]);
            setPage((prev) => prev + 1);
        }
    };

    const loadToken = async () => {
        const storedToken = await getToken();
        console.log("storedTokenstoredToken", storedToken)
        if (storedToken) setToken(storedToken);
    };

    const handleSaveToken = async () => {
        const dummyToken = "my-secure-token-1234";
        await saveToken(dummyToken);
        setToken(dummyToken);
    };

    const renderItem = ({ item }) => (
        <View style={{ padding: 20, borderBottomWidth: 1 }}>
            <Text style={{ padding: 10, fontSize: 18 }}>Name: {item.name}</Text>
            <Text style={{ padding: 10, fontSize: 18 }}>Price: ₹{item.price}</Text>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => addToCart(item)}
            >
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <FlatList
            data={visibleProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListHeaderComponent={() => (
                <View style={{ padding: 20, backgroundColor: "#f9f9f9" }}>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                        Stored Token: {token || "No token saved yet"}
                    </Text>
                    {token &&
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.7}
                            onPress={() => handleSaveToken()}
                        >
                            <Text style={styles.buttonText}>Save Dummy Token</Text>
                        </TouchableOpacity>
                    }
                </View>
            )}
            getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
            })}
            windowSize={7}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={PAGE_SIZE}
            maxToRenderPerBatch={PAGE_SIZE}
            removeClippedSubviews
        />
    );
}

const styles = StyleSheet.create({
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
