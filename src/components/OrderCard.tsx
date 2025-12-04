"use client";

import { Order } from "@/types/order";
import { useState } from "react";
import { ChevronDown, ChevronUp, Package, MapPin, CreditCard, Calendar } from "lucide-react";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) return "bg-success text-white";
    if (isPaid) return "bg-info text-white";
    return "bg-warning text-text-inverse";
  };

  const getStatusText = (isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) return "Delivered";
    if (isPaid) return "Paid";
    return "Pending";
  };

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-text-secondary mb-1">Order ID</p>
            <p className="font-semibold text-text-primary">#{order.id || order._id}</p>
          </div>
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
              order.isPaid ?? false,
              order.isDelivered ?? false
            )}`}
          >
            {getStatusText(order.isPaid ?? false, order.isDelivered ?? false)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-text-secondary" />
            <span className="text-text-secondary">{order.createdAt ? formatDate(order.createdAt) : "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="w-4 h-4 text-text-secondary" />
            <span className="text-text-secondary capitalize">{order.paymentMethodType || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-6 bg-background-light">
        <div className="flex justify-between items-center mb-4">
          <span className="text-text-secondary">Total Amount</span>
          <span className="text-2xl font-bold text-primary">${(order.totalOrderPrice ?? 0).toFixed(2)}</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Subtotal</span>
            <span className="text-text-primary">
              ${((order.totalOrderPrice ?? 0) - (order.taxPrice ?? 0) - (order.shippingPrice ?? 0)).toFixed(2)}
            </span>
          </div>
          {(order.taxPrice ?? 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-text-secondary">Tax</span>
              <span className="text-text-primary">${(order.taxPrice ?? 0).toFixed(2)}</span>
            </div>
          )}
          {(order.shippingPrice ?? 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-text-primary">${(order.shippingPrice ?? 0).toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Shipping Address */}
      {order.shippingAddress && (
        <div className="p-6 border-t border-border">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-secondary mt-0.5" />
            <div>
              <p className="font-medium text-text-primary mb-1">Shipping Address</p>
              <p className="text-sm text-text-secondary">{order.shippingAddress.details || "N/A"}</p>
              <p className="text-sm text-text-secondary">{order.shippingAddress.city || "N/A"}</p>
              <p className="text-sm text-text-secondary">{order.shippingAddress.phone || "N/A"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Items Section */}
      <div className="border-t border-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 flex justify-between items-center hover:bg-background-light transition-colors"
        >
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-secondary" />
            <span className="font-medium text-text-primary">
              {order.cartItems?.length || 0} {(order.cartItems?.length || 0) === 1 ? "Item" : "Items"}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-text-secondary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-secondary" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 space-y-3 animate-slide-up">
            {order.cartItems && Array.isArray(order.cartItems) && order.cartItems.length > 0 ? (
              order.cartItems.map((item) => {
                // Handle product as either a string ID or a full product object
                const productName = typeof item.product === 'object' && item.product !== null 
                  ? item.product.title 
                  : `Product ID: ${item.product}`;
                
                return (
                  <div
                    key={item._id}
                    className="flex justify-between items-center p-4 bg-background-light rounded-lg"
                  >
                    <div>
                      <p className="text-sm text-text-primary font-medium">{productName}</p>
                      <p className="text-xs text-text-light mt-1">Quantity: {item.count}</p>
                    </div>
                    <span className="font-semibold text-text-primary">${(item.price ?? 0).toFixed(2)}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-text-secondary text-center py-4">No items found in this order.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
