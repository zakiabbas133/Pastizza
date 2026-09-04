import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { FoodCard } from "../../components/FoodCard/FoodCard";
// import { categories } from "../../data/categories";
import { useGetMenuItemsQuery } from "../../services/menuApi";
import type { MenuCategory } from "../../types";
import styles from "./Menu.module.css";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { useGetCategoriesQuery } from "../../services/categoriesApi";

export function Menu() {
  const [params, setParams] = useSearchParams();
  const { data: menuItems = [], isLoading: menuItemsLoading } =
    useGetMenuItemsQuery();

  const { data: categories = [] } = useGetCategoriesQuery();

  const initialCat = (params.get("category") as MenuCategory | "all") || "all";
  const [category, setCategory] = useState<string | "all">(initialCat);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const c = params.get("category") as MenuCategory | "all" | null;
    if (c) setCategory(c);
  }, [params]);

  const filtered = useMemo(() => {
    let list = menuItems;
    if (category !== "all") {
      const categoryName = category.replace(/s$/, "");
      list = list.filter(
        (i) => i.categoryName.toLowerCase().replace(/s$/, "") === categoryName,
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [category, menuItems, query]);

  const pizzaItems = filtered.filter(
    (i) => i.categoryName.toLowerCase() === "pizza",
  );
  const otherItems = filtered.filter(
    (i) => i.categoryName.toLowerCase() !== "pizza",
  );

  function selectCategory(id: string | "all") {
    setCategory(id);
    if (id === "all") {
      setParams({});
    } else {
      setParams({ category: id });
    }
  }

  return (
    <div className="page">
      <section className={styles.hero}>
        <div className="container">
          <SectionHeader
            label="The full list"
            title="Menu"
            description="Wood-fired pizza, hand-cut pasta, smash burgers, and more — every item priced by size where it matters."
            video={false}
          />
        </div>
      </section>

      <section className={styles.filters}>
        <div className="container">
          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} aria-hidden />
            <input
              type="search"
              placeholder="Search dishes, ingredients, tags…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search menu"
              className={styles.search}
            />
            {query && (
              <button
                type="button"
                className={styles.clear}
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Categories">
            {[...(categories ?? [])]
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={category === c.id}
                  className={`${styles.tab} ${
                    category === c.label.toLocaleLowerCase()
                      ? styles.tabActive
                      : ""
                  }`}
                  onClick={() => selectCategory(c.label.toLowerCase())}
                >
                  {c.label}
                </button>
              ))}
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className="container">
          {menuItemsLoading ? (
            <div
              className={styles.menuLoading}
              role="status"
              aria-label="Loading menu items"
            >
              <div
                className={styles.menuLoadingIllustration}
                aria-hidden="true"
              >
                <svg viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="70"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeDasharray="4 8"
                    className={styles.menuLoadingRing}
                  />
                  <path
                    d="M39 58h62M45 48h50M49 68h42"
                    stroke="var(--color-primary)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity=".7"
                  />
                  <path
                    d="M53 78c5-15 29-15 34 0"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="44"
                    cy="35"
                    r="5"
                    fill="var(--color-primary)"
                    opacity=".5"
                  />
                  <circle
                    cx="98"
                    cy="82"
                    r="4"
                    fill="var(--color-primary)"
                    opacity=".5"
                  />
                </svg>
              </div>
              <h2 className={styles.menuLoadingTitle}>Preparing the menu</h2>
              <p className={styles.menuLoadingText}>
                Gathering something delicious for you...
              </p>
              <div className={styles.menuLoadingDots} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className={styles.menuSkeletonGrid} aria-hidden="true">
                {[1, 2, 3, 4].map((item) => (
                  <div className={styles.menuSkeletonCard} key={item} />
                ))}
              </div>
            </div>
          ) : menuItems.length === 0 ? (
            <motion.div
              className={styles.emptyMenu}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className={styles.emptyMenuIcon}
                aria-hidden="true"
                animate={{ y: [0, -7, 0], rotate: [0, 2, -2, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="60"
                    cy="60"
                    r="47"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="4 7"
                    opacity=".3"
                  />
                  <path
                    d="M35 43h50l-5 40H40Z"
                    fill="var(--color-primary)"
                    opacity=".72"
                  />
                  <path
                    d="M43 43c0-12 34-12 34 0M49 57h22M48 66h24"
                    fill="none"
                    stroke="var(--color-cream)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="m25 31 2 5 5 2-5 2-2 5-2-5-5-2 5-2ZM94 76l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"
                    fill="currentColor"
                    opacity=".55"
                  />
                </svg>
              </motion.div>
              <span className={styles.emptyMenuEyebrow}>
                The kitchen is getting ready
              </span>
              <h2>Our menu is coming soon</h2>
              <p>
                We&apos;re preparing a delicious selection for you. Check back
                soon and discover your next favourite dish.
              </p>
            </motion.div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty}>
              <h3>No dishes found</h3>
              <p>Try another category or search term.</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setQuery("");
                  selectCategory("all");
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${query}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {pizzaItems.length > 0 && (
                  <div className={styles.pizzaSection}>
                    <h3 className={styles.groupTitle}>Pizza — size pricing</h3>
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Small</th>
                            <th>Medium</th>
                            <th>Large</th>
                            <th>XL</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {pizzaItems.map((item) => {
                            const prices = Object.fromEntries(
                              item.variants.map((v) => [v.name, v.price]),
                            );

                            return (
                              <tr key={item.id}>
                                <td>
                                  <Link
                                    to={`/menu/${item.id}`}
                                    className={styles.itemCell}
                                  >
                                    <img
                                      src={item.image ?? "/logo4.png"}
                                      alt=""
                                      width={48}
                                      height={48}
                                      onError={(e) => {
                                        e.currentTarget.src = "/logo4.png";
                                      }}
                                    />
                                    <div>
                                      <strong>{item.name}</strong>
                                      <span>
                                        {item.description.slice(0, 60)}…
                                      </span>
                                    </div>
                                  </Link>
                                </td>
                                <td>Rs. {prices["Small"] ?? "—"}</td>
                                <td>Rs. {prices["Medium"] ?? "—"}</td>
                                <td>Rs. {prices["Large"] ?? "—"}</td>
                                <td>Rs. {prices["XL"] ?? "—"}</td>
                                <td>
                                  <Link
                                    to={`/menu/${item.id}`}
                                    className="btn btn-sm btn-primary"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className={styles.mobileCards}>
                      {pizzaItems.map((item, i) => (
                        <FoodCard key={item.id} item={item} index={i} />
                      ))}
                    </div>
                  </div>
                )}

                {otherItems.length > 0 && (
                  <div className={styles.otherGrid}>
                    {otherItems.map((item, i) => (
                      <FoodCard key={item.id} item={item} index={i} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
