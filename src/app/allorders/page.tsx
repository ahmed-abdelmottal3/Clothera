"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { getUserOrders } from "@/services/order";
import { Order } from "@/types/order";
import OrderCard from "@/components/OrderCard";
import { Package, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function OrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated && !authLoading) {
        router.push("/sign-in");
        return;
      }

      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);
        
        // Get user ID from token
        const token = Cookies.get("token");
        if (!token) {
          router.push("/sign-in");
          return;
        }

        // Decode token to get user ID (simple JWT decode)
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.userId || payload.id || payload.sub;

        const response = await getUserOrders(userId);
        console.log("Full API Response:", response);
        console.log("Response type:", typeof response);
        
        // Handle different response formats
        let ordersData: Order[] = [];
        
        if (response && response.data && Array.isArray(response.data)) {
          // Standard format: { data: Order[] }
          ordersData = response.data;
        } else if (Array.isArray(response)) {
          // Direct array format
          ordersData = response;
        } else if (response && typeof response === 'object') {
          // Check for nested data structures
          console.log("Response keys:", Object.keys(response));
        }
        
        console.log("Orders to set:", ordersData);
        setOrders(ordersData);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-text-secondary">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <Package className="w-16 h-16 text-error mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-text-primary mb-2">Error Loading Orders</h2>
              <p className="text-text-secondary mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-text-primary mb-8">My Orders</h1>
          <div className="flex flex-col items-center justify-center py-20">
            <Package className="w-24 h-24 text-text-light mb-6" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">No Orders Yet</h2>
            <p className="text-text-secondary mb-6">Start shopping to see your orders here!</p>
            <button
              onClick={() => router.push("/products")}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">My Orders</h1>
          <p className="text-text-secondary">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
