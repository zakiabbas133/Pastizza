import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type DocumentData,
  type FieldValue,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

type FirestoreTimestamp = Date | FieldValue;

export interface DishImage {
  id: string;
  src: string;
  name: string;
}

export interface Dish {
  id: string;
  name: string;
  category: string;
  price: string | number;
  description: string;
  images: DishImage[];
  tags: string[];
  ingredients: string[];
  allergens: string[];
  hotDeal?: boolean;
  dealPrice?: string | number;
  dealItems?: string[];
  featured?: boolean;
  chefRecommendation?: string;
}

export interface ServiceResponse<T = undefined> {
  success: boolean;
  data?: T;
  id?: string;
  message?: string;
  error?: string;
}

interface FirestoreDishData extends DocumentData {
  name?: string;
  category?: string;

  price?: number | string;
  dealPrice?: number | string | null;

  hotDeal?: boolean;
  featured?: boolean;

  shortDescription?: string;
  description?: string;

  ingredients?: string[];
  allergens?: string[];
  images?: string[];
  tags?: string[];

  dealItems?: string[];

  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

/**
 * Maps a Firestore dish document into a strongly typed Dish.
 */
const mapDishDocument = (documentId: string, data: FirestoreDishData): Dish => {
  return {
    id: documentId,

    name: data.name ?? "",
    category: data.category ?? "",

    price: data.price ?? "",
    dealPrice: data.dealPrice ?? null,

    hotDeal: data.hotDeal ?? false,
    featured: data.featured ?? false,

    shortDescription: data.shortDescription ?? "",
    description: data.description ?? "",

    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],

    allergens: Array.isArray(data.allergens) ? data.allergens : [],

    images: Array.isArray(data.images) ? data.images : [],

    tags: Array.isArray(data.tags) ? data.tags : [],

    dealItems: Array.isArray(data.dealItems) ? data.dealItems : [],

    ...(data.createdAt !== undefined && {
      createdAt: data.createdAt,
    }),

    ...(data.updatedAt !== undefined && {
      updatedAt: data.updatedAt,
    }),
  };
};

export const getDishes = async (): Promise<ServiceResponse<Dish[]>> => {
  try {
    const dishesRef = collection(db, "dishes");

    const snapshot = await getDocs(dishesRef);

    const dishes: Dish[] = snapshot.docs.map((document) =>
      mapDishDocument(document.id, document.data() as FirestoreDishData),
    );

    return {
      success: true,
      data: dishes,
    };
  } catch (error: unknown) {
    console.error("Error fetching dishes:", error);

    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Failed to fetch dishes.",
    };
  }
};

export const getMenuItemById = async (
  dishId: string,
): Promise<ServiceResponse<Dish | null>> => {
  try {
    if (!dishId.trim()) {
      return {
        success: false,
        data: null,
        error: "Dish ID is required.",
      };
    }

    const dishRef = doc(db, "dishes", dishId);

    const snapshot = await getDoc(dishRef);

    if (!snapshot.exists()) {
      return {
        success: false,
        data: null,
        error: "Dish not found.",
      };
    }

    const dish: Dish = mapDishDocument(
      snapshot.id,
      snapshot.data() as FirestoreDishData,
    );

    return {
      success: true,
      data: dish,
    };
  } catch (error: unknown) {
    console.error("Error fetching dish:", error);

    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to fetch dish.",
    };
  }
};

export const getMenuItemsByCategory = async (
  category: string,
): Promise<ServiceResponse<Dish[]>> => {
  try {
    if (!category.trim()) {
      return {
        success: false,
        data: [],
        error: "Category is required.",
      };
    }

    const dishesRef = collection(db, "dishes");

    const categoryQuery = query(dishesRef, where("category", "==", category));

    const snapshot = await getDocs(categoryQuery);

    const dishes: Dish[] = snapshot.docs.map((document) =>
      mapDishDocument(document.id, document.data() as FirestoreDishData),
    );

    return {
      success: true,
      data: dishes,
    };
  } catch (error: unknown) {
    console.error("Error fetching dishes by category:", error);

    return {
      success: false,
      data: [],
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch dishes by category.",
    };
  }
};
