import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className={styles.header}>
              <h2>Your Order</h2>
              <button type="button" onClick={closeCart} aria-label="Close cart">
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className={styles.empty}>
                <p>Your cart is empty.</p>
                <p className={styles.hint}>Add something delicious from the menu.</p>
                <button type="button" className="btn btn-primary" onClick={closeCart}>
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <ul className={styles.list}>
                  {items.map((item) => (
                    <li key={item.id} className={styles.item}>
                      <img src={item.image} alt="" width={64} height={64} />
                      <div className={styles.info}>
                        <h3>{item.name}</h3>
                        <span className={styles.variant}>{item.variant.name}</span>
                        <span className={styles.linePrice}>
                          Rs. {item.variant.price * item.quantity}
                        </span>
                      </div>
                      <div className={styles.controls}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.remove}
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className={styles.footer}>
                  <div className={styles.subtotal}>
                    <span>Subtotal</span>
                    <strong>Rs. {subtotal.toFixed(2)}</strong>
                  </div>
                  <p className={styles.note}>
                    This is a demo cart. No payment will be processed.
                  </p>
                  <button type="button" className="btn btn-primary" style={{ width: '100%' }}>
                    Place Order (Demo)
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    style={{ width: '100%', marginTop: 8 }}
                    onClick={clearCart}
                  >
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
