import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { FoodCard } from '../../components/FoodCard/FoodCard';
import { menuItems } from '../../data/menu';
import { categories } from '../../data/categories';
import type { MenuCategory } from '../../types';
import styles from './Menu.module.css';

export function Menu() {
  const [params, setParams] = useSearchParams();
  const initialCat = (params.get('category') as MenuCategory | 'all') || 'all';
  const [category, setCategory] = useState<MenuCategory | 'all'>(initialCat);
  const [query, setQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  useEffect(() => {
    const c = params.get('category') as MenuCategory | 'all' | null;
    if (c) setCategory(c);
  }, [params]);

  const filtered = useMemo(() => {
    let list = menuItems;
    if (category !== 'all') {
      list = list.filter((i) => i.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags?.some((t) => t.includes(q))
      );
    }
    if (tagFilter) {
      list = list.filter((i) => i.tags?.includes(tagFilter));
    }
    return list;
  }, [category, query, tagFilter]);

  const pizzaItems = filtered.filter((i) => i.category === 'pizza');
  const otherItems = filtered.filter((i) => i.category !== 'pizza');

  function selectCategory(id: MenuCategory | 'all') {
    setCategory(id);
    if (id === 'all') {
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
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Categories">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={category === c.id}
                className={`${styles.tab} ${category === c.id ? styles.tabActive : ''}`}
                onClick={() => selectCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className="container">
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <h3>No dishes found</h3>
              <p>Try another category or search term.</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setQuery('');
                  setTagFilter(null);
                  selectCategory('all');
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${query}-${tagFilter}`}
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
                              item.variants.map((v) => [v.name, v.price])
                            );
                            return (
                              <tr key={item.id}>
                                <td>
                                  <Link to={`/menu/${item.slug}`} className={styles.itemCell}>
                                    <img src={item.image} alt="" width={48} height={48} />
                                    <div>
                                      <strong>{item.name}</strong>
                                      <span>{item.description.slice(0, 60)}…</span>
                                    </div>
                                  </Link>
                                </td>
                                <td>Rs. {prices['Small'] ?? '—'}</td>
                                <td>Rs. {prices['Medium'] ?? '—'}</td>
                                <td>Rs. {prices['Large'] ?? '—'}</td>
                                <td>Rs. {prices['XL'] ?? '—'}</td>
                                <td>
                                  <Link to={`/menu/${item.slug}`} className="btn btn-sm btn-primary">
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
