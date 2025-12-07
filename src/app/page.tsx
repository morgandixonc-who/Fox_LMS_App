import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, Shield, TrendingUp, ChevronRight } from 'lucide-react';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div>
      <header style={{
        padding: '20px 40px',
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        borderBottom: '2px solid rgba(0,0,0,0.05)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Small Logo Icon */}
            <div style={{ width: '40px', height: '40px', position: 'relative' }}>
              <Image src="/assets/logoflat.png" alt="Logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <span style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--primary)', letterSpacing: '-0.5px' }}>FOX</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/login" className="btn btn-outline" style={{ height: '44px', padding: '0 24px', fontSize: '0.9rem' }}>
              Login
            </Link>
            <Link href="/signup" className="btn btn-primary" style={{ height: '44px', padding: '0 24px', fontSize: '0.9rem' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main style={{ marginTop: '80px' }}>
        <section className={styles.hero}>
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>

          <div className={styles.logoWrapper}>
            <Image
              src="/assets/logovertical.png"
              alt="Fox Training Logo"
              width={280}
              height={280}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <h1 className={styles.heroTitle}>
            Training that <span style={{ color: 'var(--primary)' }}>saves lives</span>.
          </h1>
          <p className={styles.heroSubtitle}>
            Gamified, AI-powered roleplay simulations for modern suicide prevention training. Build confidence in a safe space.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/dashboard" className="btn btn-primary" style={{ minWidth: '200px', fontSize: '1.1rem' }}>
              Start for Free
            </Link>
            <Link href="/about" className="btn btn-outline" style={{ minWidth: '200px', fontSize: '1.1rem' }}>
              Learn More
            </Link>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <MessageSquare size={40} strokeWidth={2.5} />
              </div>
              <h3 className={styles.featureTitle}>Realistic Roleplay</h3>
              <p className={styles.featureText}>
                Chat with advanced AI personas that simulate real patient scenarios, emotional fluctuations, and crisis points.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <TrendingUp size={40} strokeWidth={2.5} />
              </div>
              <h3 className={styles.featureTitle}>Skill Progression</h3>
              <p className={styles.featureText}>
                Level up your skills. Start with active listening and progress to complex risk assessments and interventions.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Shield size={40} strokeWidth={2.5} />
              </div>
              <h3 className={styles.featureTitle}>Zero-Risk Practice</h3>
              <p className={styles.featureText}>
                Make mistakes here so you don't make them there. A judgement-free zone to refine your life-saving techniques.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p style={{ fontWeight: 'bold', marginBottom: '10px', color: 'var(--text-color)' }}>FOX TRAINING APP</p>
          <p>&copy; {new Date().getFullYear()} Fox Training App</p>
        </div>
      </footer>
    </div>
  );
}
