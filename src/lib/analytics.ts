const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

type GtagFn = (...args: unknown[]) => void;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: GtagFn;
};

function ensureGtag(win: AnalyticsWindow) {
  win.dataLayer = win.dataLayer ?? [];
  win.gtag = win.gtag ?? ((...args: unknown[]) => {
    win.dataLayer?.push(args);
  });
}

export function initAnalytics() {
  if (!measurementId || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const win = window as AnalyticsWindow;
  ensureGtag(win);

  const externalScript = document.createElement('script');
  externalScript.async = true;
  externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(externalScript);

  win.gtag?.('js', new Date());
  win.gtag?.('config', measurementId, {
    send_page_view: true,
  });
}
