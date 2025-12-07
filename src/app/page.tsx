import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, Shield, TrendingUp, ChevronRight } from 'lucide-react';
import styles from './Home.module.css';
import { VoxelScene } from '@/components/voxels/VoxelPrimitives';
import { VoxelCloud, VoxelCross, VoxelHeart } from '@/components/voxels/VoxelShapes';

export default function Home() {
  return (
    <div>
      <header style={{
        padding: '20px 40px',
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'var(--bg-header)',
        zIndex: 100,
        borderBottom: '4px solid rgba(0,0,0,0.05)'
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

      <main style={{ marginTop: '0px' }}> {/* Removed top margin as Hero handles spacing */}
        <section className={styles.hero}>
          <div className={`${styles.speechBubble} ${styles.bubble1}`}>
            How are you feeling today?
          </div>
          <div className={`${styles.speechBubble} ${styles.bubble2}`}>
            I'm here to listen.
          </div>

          {/* Real Voxel Decorations using CSS 3D */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Left Cloud */}
            <div style={{ position: 'absolute', top: '20%', left: '5%', animation: 'float 8s ease-in-out infinite' }}>
              <VoxelScene>
                <VoxelCloud />
              </VoxelScene>
            </div>
            {/* Right Cloud */}
            <div style={{ position: 'absolute', top: '15%', right: '10%', animation: 'float 10s ease-in-out infinite reverse' }}>
              <VoxelScene>
                <VoxelCloud />
              </VoxelScene>
            </div>

            {/* Floating Heart */}
            <div style={{ position: 'absolute', top: '40%', right: '20%', animation: 'float 6s ease-in-out infinite' }}>
              <VoxelScene>
                <div style={{ animation: 'spin 10s linear infinite' }}>
                  <VoxelHeart />
                </div>
              </VoxelScene>
            </div>

            {/* Floating Cross */}
            <div style={{ position: 'absolute', top: '30%', left: '15%', animation: 'float 7s ease-in-out infinite' }}>
              <VoxelScene>
                <div style={{ animation: 'spin 12s linear infinite reverse' }}>
                  <VoxelCross />
                </div>
              </VoxelScene>
            </div>
          </div>

          <div className={styles.logoWrapper}>
            <Image
              src="/assets/voxel_therapy.png"
              alt="Voxel Therapy Scene"
              width={500}
              height={500}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <h1 className={styles.heroTitle}>
            Training that <span style={{ color: '#00a896' }}>saves lives</span>.
          </h1>
          <p className={styles.heroSubtitle}>
            Practice conversations in a safe, judgment-free voxel world.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/dashboard" className="btn btn-primary" style={{ minWidth: '220px', fontSize: '1.2rem', height: '60px' }}>
              Start for Free
            </Link>
            <Link href="/about" className="btn btn-outline" style={{ minWidth: '220px', fontSize: '1.2rem', height: '60px', color: 'var(--text-color)' }}>
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
