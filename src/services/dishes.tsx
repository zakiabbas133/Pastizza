import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type DocumentData,
  type Timestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* =========================================================
   Types
========================================================= */

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
  dealPrice?: string | number | null;

  shortDescription: string;
  description: string;

  images: DishImage[];

  tags: string[];
  ingredients: string[];
  allergens: string[];

  dealItems: string[];

  hotDeal: boolean;
  featured: boolean;

  chefRecommendation: string;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ServiceResponse<T = undefined> {
  success: boolean;
  data?: T;
  id?: string;
  message?: string;
  error?: string;
}

/**
 * Firestore can contain image URLs as strings from older documents,
 * or image objects from newer documents.
 */
interface FirestoreDishImage {
  id?: string;
  src?: string;
  name?: string;
}

interface FirestoreDishData extends DocumentData {
  name?: unknown;
  category?: unknown;

  price?: unknown;
  dealPrice?: unknown;

  hotDeal?: unknown;
  featured?: unknown;

  shortDescription?: unknown;
  description?: unknown;

  ingredients?: unknown;
  allergens?: unknown;

  images?: unknown;
  tags?: unknown;

  dealItems?: unknown;

  chefRecommendation?: unknown;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

/* =========================================================
   Helpers
========================================================= */

/**
 * Converts unknown Firestore value into a safe string.
 */
const toStringValue = (value: unknown, fallback = ""): string => {
  return typeof value === "string" ? value : fallback;
};

/**
 * Converts unknown Firestore value into a safe price.
 */
const toPriceValue = (
  value: unknown,
  fallback: string | number = "",
): string | number => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return fallback;
};

/**
 * Converts an unknown Firestore array into string[].
 */
const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
};

/**
 * Converts Firestore image data into DishImage[].
 *
 * Supports both:
 *
 * ["https://example.com/image.jpg"]
 *
 * and:
 *
 * [
 *   {
 *     id: "image-1",
 *     src: "https://example.com/image.jpg",
 *     name: "Dish image"
 *   }
 * ]
 */
const toDishImages = (value: unknown): DishImage[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((image, index): DishImage | null => {
      /* ---------------------------------------------
         Old format:
         images: ["url1", "url2"]
      --------------------------------------------- */
      if (typeof image === "string") {
        const src = image.trim();

        if (!src) {
          return null;
        }

        return {
          id: `image-${index}`,
          src,
          name: `Dish image ${index + 1}`,
        };
      }

      /* ---------------------------------------------
         New format:
         images: [
           {
             id,
             src,
             name
           }
         ]
      --------------------------------------------- */
      if (typeof image === "object" && image !== null) {
        const imageData = image as FirestoreDishImage;

        const src =
          typeof imageData.src === "string" ? imageData.src.trim() : "";

        if (!src) {
          return null;
        }

        return {
          id:
            typeof imageData.id === "string" && imageData.id.trim()
              ? imageData.id
              : `image-${index}`,

          src,

          name:
            typeof imageData.name === "string" && imageData.name.trim()
              ? imageData.name
              : `Dish image ${index + 1}`,
        };
      }

      return null;
    })
    .filter((image): image is DishImage => image !== null);
};

/* =========================================================
   Mapper
========================================================= */

/**
 * Maps a Firestore dish document into the application's
 * strongly typed Dish model.
 */
const mapDishDocument = (documentId: string, data: FirestoreDishData): Dish => {
  return {
    id: documentId,

    name: toStringValue(data.name),

    category: toStringValue(data.category),

    price: toPriceValue(data.price),

    dealPrice:
      data.dealPrice === null ? null : toPriceValue(data.dealPrice),

    shortDescription: toStringValue(data.shortDescription),

    description: toStringValue(data.description),

    images: toDishImages(data.images),

    tags: toStringArray(data.tags),

    ingredients: toStringArray(data.ingredients),

    allergens: toStringArray(data.allergens),

    dealItems: toStringArray(data.dealItems),

    hotDeal: typeof data.hotDeal === "boolean" ? data.hotDeal : false,

    featured: typeof data.featured === "boolean" ? data.featured : false,

    chefRecommendation: toStringValue(data.chefRecommendation),

    ...(data.createdAt && {
      createdAt: data.createdAt,
    }),

    ...(data.updatedAt && {
      updatedAt: data.updatedAt,
    }),
  };
};

/* =========================================================
   Get all dishes
========================================================= */

export const getDishes = async (): Promise<ServiceResponse<Dish[]>> => {
  try {
    const dishesRef = collection(db, "dishes");

    const snapshot = await getDocs(dishesRef);

    const dishes: Dish[] = snapshot.docs.map((document) => {
      return mapDishDocument(document.id, document.data() as FirestoreDishData);
    });

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

/* =========================================================
   Get dish by ID
========================================================= */

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

    const dish = mapDishDocument(
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

/* =========================================================
   Get dishes by category
========================================================= */

export const getMenuItemsByCategory = async (
  category: string,
): Promise<ServiceResponse<Dish[]>> => {
  try {
    const normalizedCategory = category.trim();

    if (!normalizedCategory) {
      return {
        success: false,
        data: [],
        error: "Category is required.",
      };
    }

    const dishesRef = collection(db, "dishes");

    const categoryQuery = query(
      dishesRef,
      where("category", "==", normalizedCategory),
    );

    const snapshot = await getDocs(categoryQuery);

    const dishes: Dish[] = snapshot.docs.map((document) => {
      return mapDishDocument(document.id, document.data() as FirestoreDishData);
    });

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
