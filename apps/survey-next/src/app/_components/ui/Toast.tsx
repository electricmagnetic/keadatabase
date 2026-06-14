"use client";

import { useEffect } from "react";

type ToastVariant = "error" | "success" | "info";

interface ToastProps {
  /** Message to display; the toast renders only while this is non-null */
  message: string | null;
  /** Visual style of the toast */
  variant?: ToastVariant;
  /** Called when the toast is dismissed (auto-timeout or close button) */
  onDismiss: () => void;
  /** Auto-dismiss delay in ms; pass 0 to disable auto-dismiss */
  duration?: number;
}

/**
 * Lightweight toast notification.
 *
 * Controlled via the `message` prop — render it whenever you have a
 * message and clear that state in `onDismiss`. Auto-dismisses after
 * `duration` ms unless disabled.
 */
export function Toast({
  message,
  variant = "error",
  onDismiss,
  duration = 6000,
}: ToastProps) {
  useEffect(() => {
    if (!message || duration <= 0) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div className="toast-region" aria-live="assertive">
      <div className={`toast toast--${variant}`} role="alert">
        <span className="toast__message">{message}</span>
        <button
          type="button"
          className="toast__close"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
