import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { Resources } from "@/lib/permissions";
import { usePermissions } from "./usePermissions";

export const useCollections = () => {
  const queryClient = useQueryClient();
  const { checkView, checkAdd, checkEdit, checkDelete } = usePermissions();

  // Permissions
  const canView = checkView(Resources.COLLECTIONS);
  const canAdd = checkAdd(Resources.COLLECTIONS);
  const canEdit = checkEdit(Resources.COLLECTIONS);
  const canDelete = checkDelete(Resources.COLLECTIONS);

  // Get all collections
  const collectionsQuery = useQuery({
    queryKey: ["collections"],
    enabled: canView,
    queryFn: () => api.get("/collections").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    onError: (err) => {
      toast.error(err.message || "Failed to fetch collections");
    },
  });

  // Create collection
  const createCollection = useMutation({
    mutationFn: ({ data }) => api.post("/collections", data),
    enabled: canAdd,
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      toast.success("Collection created successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create collection");
    },
  });

  // Update collection
  const updateCollection = useMutation({
    mutationFn: ({ id, data }) => api.put(`/collections/${id}`, data),
    enabled: canEdit,
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      toast.success("Collection updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update collection");
    },
  });

  // Delete collection
  const deleteCollection = useMutation({
    mutationFn: (id) => api.delete(`/collections/${id}`),
    enabled: canDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      toast.success("Collection deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete collection");
    },
  });

  // Set products in a collection (overwrite)
  const setProducts = useMutation({
    mutationFn: ({ collectionId, products }) =>
      api.put("/collections/add-products", { collectionId, products }),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      toast.success("Collection products updated");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update products in collection");
    },
  });

  return {
    collectionsQuery,
    createCollection,
    updateCollection,
    deleteCollection,
    setProducts,
    permissions: {
      canView,
      canAdd,
      canEdit,
      canDelete,
    },
  };
};
