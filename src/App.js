import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import {
  FaHeart,
  FaGlassCheers,
  FaMapMarkerAlt,
  FaCameraRetro,
  FaSnowflake,
} from "react-icons/fa";
import { GiDiamondRing } from "react-icons/gi";

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const scrollToSection = (index) => {
      if (index < sections.length) {
        sections[index].scrollIntoView({ behavior: "smooth" });
        if (index < sections.length - 1) {
          setTimeout(() => scrollToSection(index + 1), 8000);
        }
      }
    };
    const scrollTimer = setTimeout(() => scrollToSection(0), 1000);
    return () => clearTimeout(scrollTimer);
  }, []);

  // Date & Countdown
  const weddingDate = useMemo(() => new Date("2025-12-01T07:30:00"), []);
  const getTimeLeft = useCallback(() => {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) return {};
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [weddingDate]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [getTimeLeft]);

  // Scroll Reveal
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("active", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Floating Snowflakes
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        size: 16 + Math.random() * 14,
      })),
    []
  );

  const gallery = [
    "/images/couple-3.jpg",
    "/images/couple-3.jpg",
    "/images/couple-3.jpg",
    "/images/couple-3.jpg",
    "/images/couple-3.jpg",
    "/images/couple-3.jpg",
  ];

  // Snowflakes Effect
  useEffect(() => {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      const size = Math.random() * 6 + 4;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.top = `-10px`;
      snowflake.style.backgroundColor = `rgba(255, 255, 255, ${0.6 + Math.random() * 0.4})`;
      snowflake.style.borderRadius = '50%';
      const rotateDeg = Math.random() * 360;
      snowflake.style.transform = `rotate(${rotateDeg}deg)`;
      snowflake.style.animationDelay = `${Math.random() * 10}s`;
      snowflakesContainer.appendChild(snowflake);
      setTimeout(() => {
        if (snowflake.parentNode) {
          snowflake.parentNode.removeChild(snowflake);
        }
      }, 20000);
    };
    const interval = setInterval(createSnowflake, 200);
    return () => clearInterval(interval);
  }, []);

  // Twinkling Stars
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${1 + Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${1.5 + Math.random() * 3}s`;
      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <div className="App">
      {/* Sparkles & Particles */}
      <div className="sparkles"></div>
      <div className="snowflakes"></div>
      <div className="stars"></div>

      {/* Floating Snowflakes */}
      <div className="hearts">
        {snowflakes.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}px`,
            }}
          >
            <FaSnowflake />
          </span>
        ))}
      </div>

      {/* Welcome Section */}
      <section className="welcome">
        <h1 className="glow slide-in-left">
          <GiDiamondRing className="ring-icon" /> Dhivagar Weds Suriyabharathi{" "}
          <GiDiamondRing className="ring-icon" />
        </h1>
        <p className="intro slide-in-right delay-1">
          Join us as we celebrate the marriage of <br />
          <strong>Dhivagar & Suriyabharathi</strong>
        </p>
        <p className="slide-in-left delay-2">
          💒 <FaHeart /> Marriage Ceremony 💒 <br />
          <strong>1st December 2025 • 6:00 AM – 7:30 AM</strong>
        </p>
        <p className="slide-in-right delay-3">
          🎉 <FaGlassCheers /> Wedding Reception 🎉 <br />
          <strong>1st December 2025 • 6:30 PM – 9:30 PM</strong>
        </p>
        <p className="tagline slide-in-left delay-4">
          ❄️ Make the moment special with us ❄️
        </p>
      </section>

      {/* Countdown */}
      <section className="countdown reveal">
        <h2 className="animate-heading">⏳ Countdown to Our Big Day</h2>
        {timeLeft.days !== undefined ? (
          <div className="timer">
            <div>
              <span>{timeLeft.days}</span>Days
            </div>
            <div>
              <span>{timeLeft.hours}</span>Hours
            </div>
            <div>
              <span>{timeLeft.minutes}</span>Minutes
            </div>
            <div>
              <span>{timeLeft.seconds}</span>Seconds
            </div>
          </div>
        ) : (
          <p>🎉 It's our wedding day! 🎉</p>
        )}
      </section>


      {/* Couple Section */}
      <section className="couple reveal">
        <div className="left">
          <img src="/images/couple-1.jpg" alt="Dhivagar & Suriyabharathi" className="couple-img" />
        </div>
        <div className="right">
          <h4>
            Dhivagar <FaHeart /> Suriyabharathi
          </h4>
          <p>
            Two souls, one heart. Join us as we begin this beautiful journey
            together, surrounded by love, laughter, and blessings from our families
            and friends.
          </p>
        </div>
      </section>



      {/* Gallery */}
      <section className="gallery reveal">
        <h2 className="animate-heading">
          <FaCameraRetro /> Photo Shoot Moments
        </h2>
        <div className="images">
          {gallery.map((src, idx) => (
            <div className="heart-frame" key={idx}>
              <img src={src} alt={`pic${idx + 1}`} />
            </div>
          ))}
        </div>
      </section>
      <section className="venue reveal">
        <div className="left">
          <h2 className="animate-heading">
            <FaMapMarkerAlt /> Wedding Venues
          </h2>
          <div className="venue-details">
            <div className="venue-item">
              <h3>💒 Marriage Ceremony</h3>
              <p><strong>Sri Subramaniya Swamy Temple</strong></p>
              <p>Mailam, Tamil Nadu 604304</p>
              <p>📅 1st December 2025 • 🕕 6:00 AM - 7:30 AM</p>
              <button
                className="direction-btn"
                onClick={() => window.open('https://maps.app.goo.gl/6xf4iexFTyXdWnpr5', '_blank')}
              >
                📍 Get Directions
              </button>
            </div>
            <div className="venue-item">
              <h3>🎉 Reception</h3>
              <p><strong>Thangamayil Thirumana Mandapam</strong></p>
              <p>Mailam, Tamil Nadu 604304</p>
              <p>📅 1st December 2025 • 🕡 6:30 PM - 9:30 PM</p>
              <button
                className="direction-btn"
                onClick={() => window.open('https://maps.google.com/?q=Sri+Thangamail+Thirumana+Nilayam+Mailam', '_blank')}
              >
                📍 Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="thank-you-section reveal">
        <div className="thank-you-snowflakes">
          <span className="thank-you-snowflake">❄️</span>
          <span className="thank-you-snowflake">❄️</span>
        </div>
        <div className="thank-you-content">
          <h3>Thank You for Being Part of Our Special Day</h3>
          <p>Your presence is the greatest gift we could ask for</p>
          <div className="thank-you-icons">
            <FaHeart className="thank-you-icon" />
            <GiDiamondRing className="thank-you-icon" />
            <FaHeart className="thank-you-icon" />
          </div>
          <p className="thank-you-note">With love, Dhivagar & Suriyabharathi</p>
        </div>
      </section>

      {/* Actual Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              For inquiries or to create a website like this, contact:
            </p>
            <p className="footer-contact">
              📞 <a href="tel:+917010145439">WhatsApp: +91 7010145439</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
