"use client";

import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { OrdersResponse } from "@/types";
import { Button, LoadingSpinner } from "@/components";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Order } from "@/interfaces/order";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMineOnly, setShowMineOnly] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { data: session } = useSession();

  async function loadOrders() {
    setLoading(true);
    try {
      let response: OrdersResponse;

      if (showMineOnly && session?.user?.id) {
        response = await apiService.getUserOrders(session.user.id);
      } else {
        response = await apiService.getAllOrders();
      }

      if (Array.isArray(response)) {
        setOrders(response);
      } else if (response.data && Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
      toast.error("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, [showMineOnly, session]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📦 Orders</h1>
        {session?.user && (
          <Button onClick={() => setShowMineOnly(!showMineOnly)}>
            {showMineOnly ? "Show All Orders" : "Show My Orders"}
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order._id;
            return (
              <div
                key={order._id}
                className="border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center p-5 cursor-pointer" onClick={() => toggleExpand(order._id)}>
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      Order #{order._id.slice(-6)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-gray-700 font-medium">
                      ${order.totalOrderPrice}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-gray-100 bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-700 mt-3 mb-2">
                      Order Items
                    </h3>
                    <ul className="space-y-3">
                      {order.cartItems.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            {typeof item.product === "object" && item.product.imageCover && (
                              <img
                                src={item.product.imageCover}
                                alt={item.product.title}
                                className="w-14 h-14 object-cover rounded-md border"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-800">
                                {item.product.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.count}
                              </p>
                            </div>
                          </div>
                          <span className="text-gray-700 font-semibold">
                            ${item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
