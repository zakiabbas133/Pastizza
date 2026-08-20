import { collection, getDocs, type DocumentData } from "firebase/firestore";

import { db } from "../firebase/firebase";

/**
 * Category stored in Firestore.
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

/**
 * Generic service response.
 */
export interface ServiceResponse<T = undefined> {
  success: boolean;
  data?: T;
  id?: string;
  message?: string;
  error?: string;
}

/**
 * Raw Firestore category data.
 */
interface FirestoreCategoryData extends DocumentData {
  name?: string;
  slug?: string;
  isActive?: boolean;
}

/**
 * Convert Firestore category data into a typed Category.
 */
const mapCategoryDocument = (
  documentId: string,
  data: FirestoreCategoryData,
): Category => {
  return {
    id: documentId,
    name: data.name ?? "",
    slug: data.slug ?? "",
    isActive: data.isActive ?? false,
  };
};

/**
 * Get all categories.
 */
export const getCategories = async (): Promise<ServiceResponse<Category[]>> => {
  try {
    const categoriesRef = collection(db, "categories");

    const snapshot = await getDocs(categoriesRef);

    const categories: Category[] = snapshot.docs.map((document) =>
      mapCategoryDocument(
        document.id,
        document.data() as FirestoreCategoryData,
      ),
    );

    return {
      success: true,
      data: categories,
    };
  } catch (error: unknown) {
    console.error("Error fetching categories:", error);

    return {
      success: false,
      data: [],
      error:
        error instanceof Error ? error.message : "Failed to fetch categories.",
    };
  }
};
