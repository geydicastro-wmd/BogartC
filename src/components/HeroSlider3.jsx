import { useEffect, useRef, useState, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import api from "../api/api";
import { useLanguage } from "../context/language-context";  

const AUTOPLAY_DELAY = 4000;

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [isHover, setIsHover] = useState(false);

  const startX = useRef(0);
  const isDragging = useRef(false);
  const { lang } = useLanguage();

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchSlides = async () => {
      try { 
        console.log("START FETCH");

        const res = await api.get("/sliders", {
          params: {
            brand: "BogartCasino",
            language: lang,
            order_by: "position"
          },
        });

        console.log("API SLIDERS:", res.data); // ✅ correct place

        const items = res.data?.items || [];

        const formatted = items
          .filter((item) => item.is_enabled && item.status === "active")
          .map((item) => ({
            bg: item.imageBackground?.[0]?.url,
          //  image: item.image?.[0]?.url,
            name: item.name,
            description: item.description,
            link: item.link,
            linkText: item.linkText,
          }));

        console.log("FORMATTED:", formatted); // ✅ THIS is the only place it works

        if (!formatted.length) return;

        const loopSlides = [
          formatted[formatted.length - 1],
          ...formatted,
          formatted[0],
        ];

        setSlides(loopSlides);
        setIndex(1);
      } catch (err) {
        console.error("Slider error:", err);
      }
    };

    fetchSlides();
  }, [lang]);

  const realLength = slides.length - 2;

  /* ================= NAVIGATION ================= */

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  /* ================= INFINITE LOOP FIX ================= */

  const onTransitionEnd = () => {
    if (index === slides.length - 1) {
      setTransition(false);
      setIndex(1);
    }
    if (index === 0) {
      setTransition(false);
      setIndex(slides.length - 2);
    }
  };

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransition(true)),
      );
    }
  }, [transition]);

  /* ================= AUTOPLAY ================= */

  useEffect(() => {
    if (isHover || slides.length === 0) return;
    const timer = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [next, isHover, slides.length]);

  /* ================= DRAG / SWIPE ================= */

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId); // ✅ ensures pointerup always fires
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const onPointerUp = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (dx > 80) prev();
    if (dx < -80) next();
    isDragging.current = false;
  };

  /* ================= RENDER ================= */

  return (
    <section className="hero-slider">
      <div
        className="slider-wrapper"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* ── Left arrow ── */}
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
                // ✅ Background image applied to the slide container
                style={{
                  backgroundImage: slide.bg ? `url(${slide.bg})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Character / product image sits inside the background 
                {slide.image && (
                  <img
                    className="slide-image"
                    src={slide.image}
                    alt={slide.name || "Slide"}
                    draggable={false}
                  />
                )}*/}

                {/* ✅ Overlay text + CTA button on the LEFT side */}
                <div className="slide-overlay">
                  {slide.name && <h2 className="slide-title">{slide.name}</h2>}
                  {slide.description && (
                    <p className="slide-description" style={{ whiteSpace: "pre-line" }}>{slide.description}</p>
                  )}
                  {slide.link && (
                    <a
                      className="slide-cta"
                      href={slide.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {slide.linkText || "Play Now"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right arrow ── */}
        <button className="nav next" onClick={next}>
          <FaArrowRight />
        </button>

        {/* ── Dots ── */}
        {realLength > 0 && (
          <div className="slider-dots">
            {Array.from({ length: realLength }).map((_, i) => (
              <span
                key={i}
                className={`dot ${index === i + 1 ? "active" : ""}`}
                onClick={() => {
                  setTransition(true);
                  setIndex(i + 1);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
