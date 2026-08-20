import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FullscreenLoaderProps {
  open: boolean;
}

const FullscreenLoader = ({ open }: FullscreenLoaderProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    // Save current body styles
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    const previousUserSelect = document.body.style.userSelect;

    // Lock the page
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.style.userSelect = "none";

    // Prevent keyboard interaction with the underlying page
    const preventKeyboard = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    // Prevent scrolling using keyboard
    window.addEventListener("keydown", preventKeyboard, true);

    return () => {
      // Restore previous styles
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      document.body.style.userSelect = previousUserSelect;

      window.removeEventListener("keydown", preventKeyboard, true);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="alert"
          aria-busy="true"
          aria-live="assertive"
          onWheel={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onTouchMove={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100dvh",
            zIndex: 999999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            cursor: "wait",
            pointerEvents: "all",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "36px 36px",
              borderRadius: 20,
              background: 'var(--color-bg-muted)',
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              pointerEvents: "none",
            }}
          >
            {/* Spinner */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "4px solid var(--color-text)",
                borderTopColor: "var(--color-border)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenLoader;
