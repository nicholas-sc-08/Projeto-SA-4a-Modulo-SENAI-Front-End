"use client"

import React, { useState, useEffect } from 'react'
import styles from './Toast.module.css'

// Hook personalizado para usar o Toast
export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])

    // Remove automaticamente após 4 segundos
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 4000)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return { toasts, showToast, removeToast }
}

// Componente Toast
function Toast({ toasts, removeToast }) {
  if (toasts.length === 0) return null

  return (
    <div className={styles['toast-container']}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${styles['toast']} ${styles[`toast-${toast.type}`]}`}
        >
          <div className={styles['toast-icon']}>
            {toast.type === 'success' && '✓'}
            {toast.type === 'error' && '✕'}
            {toast.type === 'info' && 'ℹ'}
          </div>
          <span className={styles['toast-message']}>{toast.message}</span>
          <button
            className={styles['toast-close']}
            onClick={() => removeToast(toast.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast