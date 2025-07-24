// app/admin/collections/components/AddProductSheet.jsx
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useServices } from '@/hooks/useServices';
import { useCollections } from '@/hooks/useCollections';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import ProductCardColl from './ProductCartColl';
import LoaderButton from '@/components/custom/LoaderButton';
// import ProductCardColl from './ProductCardColl';

export default function AddProductSheet({ collection, onClose }) {
    const { servicesQuery } = useServices();
    const { setProducts } = useCollections();
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');

    // Memoize options so its identity only changes when data changes
    const options = useMemo(() => {
        return servicesQuery.data?.flatMap((svc) =>
            svc.variants.map((v) => ({ product: svc, variant: v }))
        ) || [];
    }, [servicesQuery.data]);

    // Only re‑init when collection.products or options change meaningfully
    useEffect(() => {
        if (!options.length) return;
        const init = collection.products
            .map((p) => {
                const match = options.find((o) => o.variant.name.toLowerCase() === p.variantName.toLowerCase());
                return match ? { product: match.product, variant: match.variant } : null;
            })
            .filter(Boolean);
        setSelected(init);
    }, [collection.products, options]);

    const toggle = (item) => {
        setSelected((prev) =>
            prev.some((s) => s.variant.name === item.variantName)
                ? prev.filter((s) => s.variant.name.toLowerCase() !== item.variantName.toLowerCase())
                : [...prev, item]
        );
    };

    const handleSave = async () => {
        await setProducts.mutateAsync({
            collectionId: collection._id,
            products: selected.map((s) => ({
                productId: s.product._id,
                variantId: s.variant._id,
                variantName: s.variant.name,
            })),
        });
        onClose();
    };

    // Filter available variants
    const filteredAvailable = useMemo(() => {
        return options.filter(
            (o) =>
                !selected.some((s) => s.variant._id === o.variant._id) &&
                (o.product.name.toLowerCase().includes(search.toLowerCase()) ||
                    o.variant.name.toLowerCase().includes(search.toLowerCase()))
        );
    }, [options, selected, search]);

    return (
        <Sheet open onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="p-4 min-w-[80vw] max-h-screen overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">
                    Edit Products in “{collection.name}”
                </h3>
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Selected */}
                    <div className="w-full lg:w-1/2 bg-gray-100 rounded-xl p-4">
                        <h4 className="font-medium mb-2">Selected Variants</h4>
                        {selected.length === 0 ? (
                            <p className="text-sm text-gray-500">No variants selected</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
                                {selected.map((item, idx) => (
                                    <div key={idx} onClick={() => toggle(item)}>
                                        <ProductCardColl
                                            product={item.product}
                                            variant={item.variant}
                                            isSelected
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Available */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2">
                            <Input
                                placeholder="Search by product or variant"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        {filteredAvailable.length === 0 ? (
                            <p className="text-sm text-gray-500 mt-4">No matching variants</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
                                {filteredAvailable.map((item) => (
                                    <div key={item.variant._id} onClick={() => toggle(item)}>
                                        <ProductCardColl
                                            product={item.product}
                                            variant={item.variant}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <LoaderButton
                        onClick={handleSave}
                        loading={setProducts.isPending}>
                        Update
                    </LoaderButton>
                </div>
            </SheetContent>
        </Sheet>
    );
}
