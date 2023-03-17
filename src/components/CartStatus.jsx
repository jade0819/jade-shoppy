import React from "react";
import { getCart } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts"], () => getCart(uid));

  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-4xl" />
      {products && (
        <p className="absolute -top-1 -right-3 w-6 h-6 text-center bg-brand text-white font-bold rounded-full">
          {products.length}
        </p>
      )}
    </div>
  );
}
