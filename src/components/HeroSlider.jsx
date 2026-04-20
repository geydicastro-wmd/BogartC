import { useEffect, useRef, useState, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContent } from "../content/context/content-context";

const AUTOPLAY_DELAY = 4000;

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const indexRef = useRef(1);
  const slidesLenRef = useRef(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const { sliders } = useContent();

  const isInteractiveTarget = (target) =>
    target instanceof Element && Boolean(target.closest("a, button"));

  const normalizeInternalLink = (link) => {
    if (!link) return null;
    if (/^https?:\/\//i.test(link)) return null;
    return link.startsWith("/") ? link : `/${link}`;
  };

  useEffect(() => {
    const formatted = sliders
      .filter((item) => item.is_enabled && item.status === "active")
      .map((item) => ({
        bg: item.imageBackground?.[0]?.url,
        name: item.name,
        description: item.description,
        link: item.link,
        ctaText: item.imageAltText,
        linkText: item.linkText,
      }));

    if (!formatted.length) {
      slidesLenRef.current = 0;
      setSlides([]);
      setIndex(1);
      indexRef.current = 1;
      return;
    }

    const loopSlides = [
      formatted[formatted.length - 1],
      ...formatted,
      formatted[0],
    ];

    slidesLenRef.current = loopSlides.length;
    setSlides(loopSlides);
    setIndex(1);
    indexRef.current = 1;
  }, [sliders]);

  const realLength = slides.length - 2;

  const next = useCallback(() => {
    setIndex((i) => {
      const n = i + 1;
      indexRef.current = n;
      return n;
    });
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => {
      const n = i - 1;
      indexRef.current = n;
      return n;
    });
  }, []);

  const onTransitionEnd = useCallback(() => {
    const currentIndex = indexRef.current;
    const len = slidesLenRef.current;
    if (len === 0) return;

    if (currentIndex >= len - 1) {
      setTransition(false);
      setIndex(1);
      indexRef.current = 1;
    } else if (currentIndex <= 0) {
      setTransition(false);
      setIndex(len - 2);
      indexRef.current = len - 2;
    }
  }, []);

  useEffect(() => {
    if (!transition) {
      const id = requestAnimationFrame(() => setTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [transition]);

  useEffect(() => {
    if (isHover || slides.length === 0) return;

    let timerId = null;

    const start = () => {
      timerId = setInterval(next, AUTOPLAY_DELAY);
    };

    const stop = () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [next, isHover, slides.length]);

  const onPointerDown = (e) => {
    if (isInteractiveTarget(e.target)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const onPointerUp = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (dx > 80) prev();
    if (dx < -80) next();
    isDragging.current = false;
  };

  return (
    <section className="hero-slider">
      <div
        className="slider-wrapper"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <button className="nav prev" onClick={prev}>
          <FaArrowLeft />
        </button>

        <div className="slider-viewport">
          <div
            className={`slider-track ${transition ? "transition" : ""}`}
            style={{
              transform:
                window.innerWidth <= 768
                  ? `translateX(-${index * 100}vw)`
                  : `translateX(calc(-${index * 50}vw + 25vw))`,
            }}
            onTransitionEnd={onTransitionEnd}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`slide ${i === index ? "active" : ""}`}
                style={{
                  backgroundImage: slide.bg ? `url(${slide.bg})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="slide-overlay">
                  {slide.name && <h2 className="slide-title">{slide.name}</h2>}
                  {slide.description && (
                    <p
                      className="slide-description"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {slide.description}
                    </p>
                  )}
                  {slide.link &&
                    (() => {
                      const internalLink = normalizeInternalLink(slide.link);

                      if (internalLink) {
                        return (
                          <Link className="slide-cta" to={internalLink}>
                            {slide.ctaText || slide.linkText || "Play Now"}
                          </Link>
                        );
                      }

                      return (
                        <a
                          className="slide-cta"
                          href={slide.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {slide.ctaText || slide.linkText || "Play Now"}
                        </a>
                      );
                    })()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="nav next" onClick={next}>
          <FaArrowRight />
        </button>

        {realLength > 0 && (
          <div className="slider-dots">
            {Array.from({ length: realLength }).map((_, i) => (
              <span
                key={i}
                className={`dot ${index === i + 1 ? "active" : ""}`}
                onClick={() => {
                  setTransition(true);
                  setIndex(i + 1);
                  indexRef.current = i + 1;
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
