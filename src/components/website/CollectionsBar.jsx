// app/collections/[slug]/layout.jsx
import React from 'react';
import CollectionsBarClient from './CollectionsBarClient';
import { getCollections } from '@/lib/main/services';

export default async function CollectionsLayout({ children }) {
    const collections = await getCollections();

    return (
        <>
            <CollectionsBarClient
                collections={collections || []}
            />
            {children}
        </>
    );
}
