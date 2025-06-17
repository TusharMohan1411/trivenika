// Find related services based on blog tags
export const getRelatedServices = (blogTags, allServices, limit = 3) => {
    if (!blogTags || blogTags.length === 0 || !allServices || allServices.length === 0) {
        return [];
    }

    // Create a map of tags to services
    const tagMap = new Map();

    // Populate the tag map
    allServices.forEach(service => {
        if (service.tags && service.tags.length > 0) {
            service.tags.forEach(tag => {
                const normalizedTag = tag.toLowerCase().trim();
                if (!tagMap.has(normalizedTag)) {
                    tagMap.set(normalizedTag, []);
                }
                tagMap.get(normalizedTag).push(service);
            });
        }
    });

    // Find services with matching tags
    const relatedServices = new Map();

    blogTags.forEach(tag => {
        const normalizedTag = tag.toLowerCase().trim();
        if (tagMap.has(normalizedTag)) {
            tagMap.get(normalizedTag).forEach(service => {
                if (!relatedServices.has(service._id)) {
                    relatedServices.set(service._id, service);
                }
            });
        }
    });

    // Convert map to array and limit results
    return Array.from(relatedServices.values()).slice(0, limit);
};