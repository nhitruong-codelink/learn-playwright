export interface ProductImage {
    id: string;
    by_name: string;
    by_url: string;
    source_name: string;
    source_url: string;
    file_name: string;
    title: string;
}

export interface ProductCategory {
    id?: string;
    name: string;
    slug?: string;
}

export interface ProductBrand {
    id: string;
    name: string;
}

export interface Product {
    id?: string;
    name: string;
    description?: string;
    price?: number;
    is_location_offer?: boolean;
    is_rental?: boolean;
    co2_rating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | string; // Typed as an explicit rating or fallback string
    in_stock?: boolean;
    is_eco_friendly?: boolean;
    product_image?: ProductImage;
    category: ProductCategory;
    brand?: ProductBrand;
}

export interface ProductResponse {
    current_page: number;
    data: Product[];
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
}