'use client';
import React from 'react'
import styles from './page.module.css'
import { store } from './store';
import { Provider } from 'react-redux'
import { DataList } from './components/DataList';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <h1>Test project in React</h1>
        </div>
      </div>
      <div className={styles.center}>
          <Provider store={store}>
              <DataList />
          </Provider>
      </div>
    </main>
  )
}
