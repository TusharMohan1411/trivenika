import LabTestingSection from '@/app/(main website)/products/[slug]/components/LabTestingSection'
import MultipleUses from '@/app/(main website)/products/[slug]/components/MultipleUses'
import ProductHeroSection from '@/app/(main website)/products/[slug]/components/productHeroSection'
import TestimonialSlider from '@/app/(main website)/products/[slug]/components/TestimonialSlider'
import WhyToBuySection from '@/app/(main website)/products/[slug]/components/WhyToBuySection'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'

function ProductPreviewDialog({ service, open, onOpenChange }) {
    if (!service) return null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:min-w-screen sm:min-h-screen max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className={'text-primary font-bold'}>Product Preview</DialogTitle>
                </DialogHeader>
                <section className="flex gap-4 lg:gap-10 flex-col lg:flex-row relative">
                    <div className="flex-1 h-full flex flex-col">
                        <div className='mb-4 space-y-0'>
                            <ProductHeroSection product={service} preview={true} />
                            <WhyToBuySection whyToBuy={service?.whyToBuy} productName={service?.name} />
                            <LabTestingSection labTestingImage={service?.labTestingReport} />
                            <TestimonialSlider />
                            <MultipleUses multipleUseHeading={service?.multipleUseHeading} multipleUsePoints={service?.multipleUsePoints} />
                        </div>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    )
}

export default ProductPreviewDialog