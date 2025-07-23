'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '@/schemas/checkout';
import PaymentMethod from './PaymentMethod';
import LoaderButton from '@/components/custom/LoaderButton';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

export default function ShippingForm({ ordering, setOrdering }) {
    const router = useRouter();
    const form = useForm({ resolver: zodResolver(checkoutSchema) });
    const cart = useCartStore((s) => s.cart);
    const clearCart = useCartStore((s) => s.clearCart);

    const onSubmit = async (data) => {
        // ... place order logic
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* map FormField components here for name, contact, address, state, pin */}
            <PaymentMethod control={form.control} />
            <LoaderButton type="submit" loading={ordering} className="w-full">Place Order</LoaderButton>
        </form>
    );
}