// components/checkout/PaymentMethod.jsx
'use client';
import { FormField } from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function PaymentMethod({ control }) {
    return (
        <FormField control={control} name="paymentMethod" render={({ field }) => (
            <div className="border-t pt-6 space-y-4">
                <Label>Payment Method</Label>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                    {/* COD and Online options markup */}
                </RadioGroup>
            </div>
        )} />
    );
}
