"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/hooks/auth";
import { getUserOrders } from "@/services/order";
import { Order } from "@/types/order";
import OrderCard from "@/components/OrderCard";
import { Package, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ORDERS_PER_PAGE = 6;

export default function OrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Calculate pagination data
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const endIndex = startIndex + ORDERS_PER_PAGE;
    return orders.slice(startIndex, endIndex);
  }, [orders, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

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
        
        // Handle different response formats
        let ordersData: Order[] = [];
        
        if (response && response.data && Array.isArray(response.data)) {
          ordersData = response.data;
        } else if (Array.isArray(response)) {
          ordersData = response;
        }
        
        // Sort orders by date (newest first) - only if we have orders
        if (ordersData && ordersData.length > 0) {
          ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        
        setOrders(ordersData);
        setCurrentPage(1); // Reset to first page when data loads
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
            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paginatedOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Page Info - Mobile */}
            <div className="sm:hidden text-sm text-text-secondary">
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border transition-all flex items-center gap-1 ${
                  currentPage === 1
                    ? "border-border text-text-light cursor-not-allowed"
                    : "border-border hover:border-primary hover:text-primary bg-surface"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-text-secondary">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page as number)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-surface border border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border transition-all flex items-center gap-1 ${
                  currentPage === totalPages
                    ? "border-border text-text-light cursor-not-allowed"
                    : "border-border hover:border-primary hover:text-primary bg-surface"
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
