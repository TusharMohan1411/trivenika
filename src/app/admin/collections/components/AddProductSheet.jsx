// app/admin/collections/components/AddProductSheet.jsx
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useServices } from '@/hooks/useServices';
import { useCollections } from '@/hooks/useCollections';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import ProductCardColl from './ProductCartColl';
import LoaderButton from '@/components/custom/LoaderButton';

export default function AddProductSheet({ collection, onClose }) {
    const { servicesQuery } = useServices();
    const { setProducts } = useCollections();
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');

    // Flatten to variant options: { product, variant }
    const options = useMemo(() => {
        return (
            servicesQuery.data?.flatMap((svc) =>
                (svc.variants || []).map((v) => ({ product: svc, variant: v }))
            ) || []
        );
    }, [servicesQuery.data]);

    // Initialize selected from collection.products (support variantId or variantName)
    useEffect(() => {
        if (!options.length || !collection?.products?.length) {
            setSelected([]);
            return;
        }

        const init = collection.products
            .map((p) => {
                const match = options.find((o) => {
                    // Prefer id match if available
                    if (p.variantId && o.variant._id === p.variantId) return true;
                    // fallback to name match (case-insensitive)
                    if (p.variantName && o.variant.name?.toLowerCase() === p.variantName?.toLowerCase()) return true;
                    return false;
                });
                return match || null;
            })
            .filter(Boolean);

        setSelected(init);
    }, [collection.products, options]);

    // Toggle by variant._id (add/remove)
    const toggle = (item) => {
        setSelected((prev) => {
            const exists = prev.some((s) => s.variant._id === item.variant._id);
            if (exists) {
                return prev.filter((s) => s.variant._id !== item.variant._id);
            }
            return [...prev, item];
        });
    };

    const handleSave = async () => {
        // prepare payload
        const payload = {
            collectionId: collection._id,
            products: selected.map((s) => ({
                productId: s.product._id,
                variantId: s.variant._id,
                variantName: s.variant.name,
            })),
        };
        await setProducts.mutateAsync(payload);
        onClose();
    };

    // Filter available variants (flat) - not-in-selected and match search
    const filteredAvailable = useMemo(() => {
        const q = search.trim().toLowerCase();
        return options.filter(
            (o) =>
                !selected.some((s) => s.variant._id === o.variant._id) &&
                (q === '' ||
                    o.product.name.toLowerCase().includes(q) ||
                    o.variant.name.toLowerCase().includes(q))
        );
    }, [options, selected, search]);

    // Group available variants by product for nicer UI
    const availableByProduct = useMemo(() => {
        const map = new Map();
        filteredAvailable.forEach((o) => {
            const pid = o.product._id;
            if (!map.has(pid)) {
                map.set(pid, { product: o.product, variants: [] });
            }
            map.get(pid).variants.push(o.variant);
        });
        return Array.from(map.values());
    }, [filteredAvailable]);

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto max-h-[70vh]">
                                {selected.map((item) => (
                                    <div
                                        key={item.variant._id}
                                        onClick={() => toggle(item)}
                                        className="cursor-pointer"
                                    >
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

                    {/* Available (grouped by product) */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2">
                            <Input
                                placeholder="Search by product or variant"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {availableByProduct.length === 0 ? (
                            <p className="text-sm text-gray-500 mt-4">No matching variants</p>
                        ) : (
                            <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                                {availableByProduct.map((group) => (
                                    <div key={group.product._id} className="p-2 rounded-lg border bg-gray-100">
                                        <h5 className="font-medium mb-2">{group.product.name}</h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                            {group.variants.map((variant) => {
                                                const item = { product: group.product, variant };
                                                return (
                                                    <div
                                                        key={variant._id}
                                                        onClick={() => toggle(item)}
                                                        className="cursor-pointer"
                                                    >
                                                        <ProductCardColl
                                                            product={group.product}
                                                            variant={variant}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <LoaderButton onClick={handleSave} loading={setProducts.isPending}>
                        Update
                    </LoaderButton>
                </div>
            </SheetContent>
        </Sheet>
    );
}
