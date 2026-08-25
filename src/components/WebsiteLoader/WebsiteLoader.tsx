import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./WebsiteLoader.css";

const WebsiteLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    const waitForRender = () => {
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });
    };

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const image = new Image();

        const finish = () => {
          image.onload = null;
          image.onerror = null;

          resolve();
        };

        image.onload = async () => {
          try {
            // Wait until the browser has decoded the image.
            if ("decode" in image) {
              await image.decode().catch(() => {});
            }
          } finally {
            finish();
          }
        };

        image.onerror = () => {
          finish();
        };

        image.src = src;

        if (image.complete) {
          if (image.naturalWidth > 0) {
            image
              .decode?.()
              .catch(() => {})
              .finally(finish);
          } else {
            finish();
          }
        }
      });
    };

    const getImageUrls = () => {
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>(
          "body img:not(.website-loader img)",
        ),
      );

      const urls = images
        .map((image) => {
          return image.currentSrc || image.src;
        })
        .filter(Boolean);

      return [...new Set(urls)];
    };

    const collectImages = async () => {
      let previousCount = -1;
      let stableChecks = 0;

      while (stableChecks < 3) {
        if (cancelled) return [];

        await waitForRender();

        const urls = getImageUrls();

        if (urls.length === previousCount) {
          stableChecks++;
        } else {
          stableChecks = 0;
          previousCount = urls.length;
        }

        await new Promise<void>((resolve) => {
          setTimeout(resolve, 100);
        });
      }

      return getImageUrls();
    };

    const preloadImages = async () => {
      const imageUrls = await collectImages();

      if (cancelled) return;

      if (imageUrls.length === 0) {
        setProgress(100);

        await waitForRender();

        if (!cancelled) {
          setIsLoading(false);
        }

        return;
      }

      let completed = 0;

      setProgress(0);

      await Promise.all(
        imageUrls.map(async (src) => {
          if (cancelled) return;

          await loadImage(src);

          if (cancelled) return;

          completed++;

          const percentage = Math.round((completed / imageUrls.length) * 100);

          setProgress(percentage);
        }),
      );

      if (cancelled) return;

      setProgress(100);

      await waitForRender();

      if (cancelled) return;

      hideTimer = setTimeout(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      }, 300);
    };

    preloadImages();

    return () => {
      cancelled = true;

      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="website-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6,
              ease: "easeInOut",
            },
          }}
        >
          <div className="loader-glow" />

          <div className="loader-content">
            <motion.div
              className="loader-icon"
              animate={{
                rotate: [0, -5, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img className="logoMark" src="/logo4.png" alt="Pastizza" />
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="bold-heading"
            >
              Pastizza
            </motion.h1>

            <div className="loader-progress">
              <motion.div
                className="loader-progress__bar"
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
              />
            </div>

            <span className="loader-progress__text">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebsiteLoader;
