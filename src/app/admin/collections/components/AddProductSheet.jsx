'use client';
import { useState, useEffect } from 'react';
import { useServices } from '@/hooks/useServices';
import { useCollections } from '@/hooks/useCollections';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import ProductCardColl from './ProductCartColl';

export default function AddProductSheet({ collection, onClose }) {
    const { servicesQuery } = useServices();
    const { setProducts } = useCollections();
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');

    // Flatten variants with reference to product and variant
    const options =
        servicesQuery.data?.flatMap((svc) =>
            svc.variants.map((v) => ({
                productId: svc._id,
                variantId: v._id,
                variantName: v.name,
                product: svc,
                variant: v,
            }))
        ) || [];

    // Set selected initially from collection
    useEffect(() => {
        const init = collection.products.map((p) => ({
            productId: p.productId,
            variantId: p.variantId,
            variantName: p.variantName,
        }));
        setSelected(init);
    }, [collection.products]);

    const toggle = (item) => {
        const exists = selected.find((s) => s.variantId === item.variantId);
        if (exists) {
            setSelected((prev) => prev.filter((s) => s.variantId !== item.variantId));
        } else {
            setSelected((prev) => [...prev, {
                productId: item.productId,
                variantId: item.variantId,
                variantName: item.variantName,
            }]);
        }
    };

    const handleSave = async () => {
        try {
            const data = {
                collectionId: collection._id,
                products: selected,
            }

            console.log(data)
            await setProducts.mutateAsync(data);
            onClose();
        } catch (error) {
            console.log(error)
        }
    };

    // Filter available variants
    const filteredAvailable = options
        .filter((o) => !selected.some((s) => s.variantId === o.variantId))
        .filter((o) =>
            o.product.name.toLowerCase().includes(search.toLowerCase()) ||
            o.variant.name.toLowerCase().includes(search.toLowerCase())
        );

    // Get full selected data with product + variant for display
    const selectedDetailed = selected.map((s) => {
        const match = options.find((o) => o.variantId === s.variantId);
        return {
            ...s,
            product: match?.product,
            variant: match?.variant,
        };
    });

    return (
        <Sheet open onOpenChange={(o) => !o && onClose()}>
            <SheetContent className="p-4 min-w-[80vw] max-h-screen overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">
                    Edit Products in &quot;{collection.name}&quot;
                </h3>

                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Selected Section */}
                    <div className="w-full lg:w-1/2 bg-gray-100 rounded-xl p-4">
                        <h4 className="font-medium mb-2">Selected Variants</h4>
                        {selectedDetailed.length === 0 ? (
                            <p className="text-sm text-gray-500">No variants selected</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
                                {selectedDetailed.map((item) => (
                                    <div key={item.variantId} onClick={() => toggle(item)}>
                                        <ProductCardColl product={item.product} variant={item.variant} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Available Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2 flex flex-col gap-2">
                            <h4 className="font-medium">Available Variants</h4>
                            <Input
                                placeholder="Search by product or variant name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {filteredAvailable.length === 0 ? (
                            <p className="text-sm text-gray-500 mt-4">No matching variants</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto mt-2">
                                {filteredAvailable.map((item) => (
                                    <div key={item.variantId} onClick={() => toggle(item)}>
                                        <ProductCardColl product={item.product} variant={item.variant} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 text-right">
                    <Button onClick={handleSave} disabled={setProducts.isPending}>
                        {setProducts.isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                        Update
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
