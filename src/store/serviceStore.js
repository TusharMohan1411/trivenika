import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useServiceStore = create(
    persist(
        (set) => ({
            selectedService: null,
            setSelectedService: (service) => set({ selectedService: service }),
            clearSelectedService: () => set({ selectedService: null }),
        }),
        {
            name: 'selected-service-storage',
            partialize: (state) => ({ selectedService: state.selectedService }),
        }
    )
);
