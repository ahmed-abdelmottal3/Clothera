import { useState, useMemo } from "react";
import { Product } from "@/types/product";

export function useProductFilter(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]); // Increased max range

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory
        ? product.category.name === selectedCategory
        : true;

      const matchesBrand = selectedBrand
        ? product.brand.name === selectedBrand
        : true;

      const price =
        typeof product.priceAfterDiscount === "number"
          ? product.priceAfterDiscount
          : product.price;

      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange]);

  const handleFilterChange = (key: string, value: string | number[]) => {
    switch (key) {
      case "category":
        setSelectedCategory(value as string);
        break;
      case "brand":
        setSelectedBrand(value as string);
        break;
      case "priceRange":
        setPriceRange(value as number[]);
        break;
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange([0, 50000]);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    selectedBrand,
    priceRange,
    filteredProducts,
    handleFilterChange,
    clearFilters,
  };
}
