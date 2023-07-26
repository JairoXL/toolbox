'use client';
import Image from 'next/image'
import styles from './page.module.css'
import BaseData from './base-data';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <h1>Test project in React</h1>
        </div>
      </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <BaseData></BaseData>
    </main>
  )
}
