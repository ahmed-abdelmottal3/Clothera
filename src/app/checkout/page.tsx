"use client";

import { useEffect, useState } from "react";
import { useCartContext } from "@/context/CartContext";
import { createCashOrder, createCheckoutSession } from "@/services/order";
import { ShippingAddress } from "@/types/order";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import { getAddresses } from "@/services/profile";
import { Address } from "@/types/profile";
import { Loader2, ShoppingBag, CreditCard, Banknote, MapPin, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, isLoading: cartLoading } = useCartContext();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("card");
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [useNewAddress, setUseNewAddress] = useState(false);
  
  const [formData, setFormData] = useState<ShippingAddress>({
    details: "",
    phone: "",
    city: "",
  });

  // Fetch saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isAuthenticated) return;
      
      setIsLoadingAddresses(true);
      try {
        const addresses = await getAddresses();
        setSavedAddresses(addresses);
        // Auto-select first address if available
        if (addresses.length > 0) {
          setSelectedAddressId(addresses[0]._id);
          setFormData({
            details: addresses[0].details,
            phone: addresses[0].phone,
            city: addresses[0].city,
          });
        } else {
          setUseNewAddress(true);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
        setUseNewAddress(true);
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (!cartLoading && (!cart || !cart.products || cart.products.length === 0)) {
      toast.error("Your cart is empty");
      router.push("/cart");
    }
  }, [cart, cartLoading, router]);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddressId(address._id);
    setUseNewAddress(false);
    setFormData({
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
  };

  const handleUseNewAddress = () => {
    setSelectedAddressId(null);
    setUseNewAddress(true);
    setFormData({
      details: "",
      phone: "",
      city: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart || !cart._id) {
      toast.error("Cart not found");
      return;
    }

    // Validate form
    if (!formData.details || !formData.phone || !formData.city) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      if (paymentMethod === "cash") {
        // Create cash order
        await createCashOrder(cart._id, { shippingAddress: formData });
        router.push("/allorders");
      } else {
        // Create checkout session for card payment
        const response = await createCheckoutSession(cart._id);
        if (response.session && response.session.url) {
          window.location.href = response.session.url;
        } else {
          toast.error("Failed to create checkout session");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 px-4 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 space-y-6">
              {/* Saved Addresses Section */}
              <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  Shipping Address
                </h2>
                
                {isLoadingAddresses ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  </div>
                ) : savedAddresses.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    <p className="text-sm text-text-secondary">Select a saved address or add a new one</p>
                    
                    {/* Saved Address Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {savedAddresses.map((address) => (
                        <button
                          key={address._id}
                          type="button"
                          onClick={() => handleSelectAddress(address)}
                          className={`p-4 border-2 rounded-xl text-left transition-all ${
                            selectedAddressId === address._id && !useNewAddress
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-text-primary">{address.name}</p>
                              <p className="text-sm text-text-secondary mt-1">{address.details}</p>
                              <p className="text-sm text-text-secondary">{address.city}</p>
                              <p className="text-sm text-text-secondary">{address.phone}</p>
                            </div>
                            {selectedAddressId === address._id && !useNewAddress && (
                              <div className="p-1 bg-primary rounded-full">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                      
                      {/* Add New Address Button */}
                      <button
                        type="button"
                        onClick={handleUseNewAddress}
                        className={`p-4 border-2 rounded-xl text-left transition-all border-dashed ${
                          useNewAddress
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${useNewAddress ? "bg-primary" : "bg-surface border border-border"}`}>
                            <MapPin className={`w-4 h-4 ${useNewAddress ? "text-white" : "text-text-secondary"}`} />
                          </div>
                          <span className="font-medium text-text-primary">Use New Address</span>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* Address Form (show when using new address or no saved addresses) */}
                {(useNewAddress || savedAddresses.length === 0) && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="details" className="block text-sm font-medium text-text-primary mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                        placeholder="123 Main St, Apt 4B"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-text-primary mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Payment Method</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <CreditCard className="w-8 h-8 text-primary" />
                    <span className="font-medium text-text-primary">Card Payment</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === "cash"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Banknote className="w-8 h-8 text-primary" />
                    <span className="font-medium text-text-primary">Cash on Delivery</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {paymentMethod === "card" ? "Proceed to Payment" : "Place Order"}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-semibold text-text-primary mb-4 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.products.map((item) => (
                  <div key={item._id} className="flex gap-3 pb-3 border-b border-border">
                    {item.product?.imageCover ? (
                      <Image
                        src={item.product.imageCover}
                        alt={item.product?.title || "Product"}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-text-secondary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-text-primary truncate">
                        {item.product?.title || "Unknown Product"}
                      </h3>
                      <p className="text-xs text-text-secondary">Qty: {item.count}</p>
                      <p className="text-sm font-semibold text-primary">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-text-primary font-medium">${cart.totalCartPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Shipping</span>
                  <span className="text-text-primary font-medium">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span className="text-text-primary">Total</span>
                  <span className="text-primary">${cart.totalCartPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
