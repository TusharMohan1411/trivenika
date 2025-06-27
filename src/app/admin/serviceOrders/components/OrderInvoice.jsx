// app/components/OrderInvoice.jsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    heading: { fontSize: 18, marginBottom: 10 },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between' },
    text: { fontSize: 12 },
});

export function OrderInvoice({ order }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src="/logo.png" style={{ width: 100 }} />
                <View style={styles.section}>
                    <Text style={styles.heading}>🧾 Invoice</Text>
                    <Text style={styles.text}>Order ID: {order._id}</Text>
                    <Text style={styles.text}>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Customer</Text>
                    <Text style={styles.text}>{order.shippingDetails.fullName}</Text>
                    <Text style={styles.text}>{order.shippingDetails.address}, {order.shippingDetails.state} - {order.shippingDetails.pin}</Text>
                    <Text style={styles.text}>Phone: {order.shippingDetails.contact}</Text>
                    <Text style={styles.text}>Email: {order.shippingDetails.email}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Items</Text>
                    {order.cart.map((item, i) => (
                        <View key={i} style={styles.tableRow}>
                            <Text style={styles.text}>{i + 1}. {item.serviceName} ({item.variantName})</Text>
                            <Text style={styles.text}>Qty: {item.quantity} × ₹{item.price}</Text>
                        </View>
                    ))}
                    <Text style={{ marginTop: 10, fontSize: 12 }}>Total: ₹{order.totalAmount}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Payment</Text>
                    <Text style={styles.text}>Method: {order.paymentMethod}</Text>
                    <Text style={styles.text}>Status: {order.paymentStatus}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Status</Text>
                    {order.status.map((s, i) => (
                        <Text key={i} style={styles.text}>
                            - {s.currentStatus} ({new Date(s.date).toLocaleDateString()}) — {s.message}
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
}
