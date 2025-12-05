"use client";

import { MapPin, Plus, Trash2, Loader2, Building2, Phone, User, Pencil, X, Save } from "lucide-react";
import { useAddresses } from "@/hooks/useProfile";

export function AddressManager() {
  const {
    addresses,
    isLoading,
    isAdding,
    deletingId,
    editingId,
    register,
    handleSubmit,
    errors,
    onDeleteAddress,
    startEditing,
    cancelEditing,
  } = useAddresses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add New Address Form */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          {editingId ? <Pencil className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
          {editingId ? "Edit Address" : "Add New Address"}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Address Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Home, Work, etc."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              {errors.name && (
                <p className="text-error text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                City
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                <input
                  {...register("city")}
                  type="text"
                  placeholder="Cairo, Alexandria, etc."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              {errors.city && (
                <p className="text-error text-xs mt-1">{errors.city.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                {...register("phone")}
                type="tel"
                placeholder="01XXXXXXXXX"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            {errors.phone && (
              <p className="text-error text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Address Details
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-text-light" />
              <textarea
                {...register("details")}
                rows={3}
                placeholder="Street name, building number, floor, apartment..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>
            {errors.details && (
              <p className="text-error text-xs mt-1">{errors.details.message}</p>
            )}
          </div>

          <div className="flex gap-3">
            {editingId && (
              <button
                type="button"
                onClick={cancelEditing}
                className="flex-1 py-3 bg-surface border border-border text-text-primary font-semibold rounded-xl hover:bg-accent transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isAdding}
              className="flex-1 py-3 bg-primary text-text-inverse font-semibold rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {editingId ? "Updating..." : "Adding Address..."}
                </>
              ) : (
                <>
                  {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingId ? "Update Address" : "Add Address"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Saved Addresses */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Saved Addresses ({addresses.length})
        </h3>

        {addresses.length === 0 ? (
          <div className="bg-surface rounded-2xl border border-border p-8 text-center">
            <MapPin className="w-12 h-12 text-text-light mx-auto mb-3" />
            <p className="text-text-secondary">No saved addresses yet</p>
            <p className="text-text-light text-sm mt-1">Add your first address above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="bg-surface rounded-2xl border border-border p-5 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{address.name}</h4>
                      <p className="text-xs text-text-light">{address.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEditing(address)}
                      disabled={deletingId === address._id}
                      className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                      title="Edit address"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteAddress(address._id)}
                      disabled={deletingId === address._id}
                      className="p-2 rounded-lg text-error hover:bg-error/10 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                      title="Delete address"
                    >
                      {deletingId === address._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-sm text-text-secondary mb-2">{address.details}</p>
                
                <div className="flex items-center gap-2 text-xs text-text-light">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{address.phone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
