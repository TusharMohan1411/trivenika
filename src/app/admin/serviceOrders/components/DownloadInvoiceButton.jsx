// app/components/DownloadInvoiceButton.jsx
'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { OrderInvoice } from './OrderInvoice';
import { Button } from '@/components/ui/button'; // your UI button component

export default function DownloadInvoiceButton({ order }) {
    return (
        <PDFDownloadLink
            document={<OrderInvoice order={order} />}
            fileName={`Invoice_${order._id}.pdf`}
        >
            {({ loading }) =>
                <Button disabled={loading}>
                    {loading ? 'Preparing PDF...' : 'Download Invoice'}
                </Button>
            }
        </PDFDownloadLink>
    );
}
