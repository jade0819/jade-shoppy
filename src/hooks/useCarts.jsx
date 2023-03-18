import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addOrUpdateToCart, removeFromCart } from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["carts"], (uid) => getCart(uid), {
    staleTime: 1000 * 60,
  });

  const addCart = useMutation(
    ({ uid, product, quantity }) =>
      addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 }),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts"]),
    }
  );

  return { cartQuery, addCart };
}
