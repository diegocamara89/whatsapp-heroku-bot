module.exports = {
  autoClose: 0,
  headless: true, // Ativa o modo headless
  useChrome: false, // Usa Chromium em vez de Chrome
  browserArgs: [
    '--disable-web-security',
    '--no-sandbox',
    '--aggressive-cache-discard',
    '--disable-cache',
    '--disable-application-cache',
    '--disable-offline-load-stale-cache',
    '--disk-cache-size=0',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-sync',
    '--disable-translate',
    '--hide-scrollbars',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-first-run',
    '--safebrowsing-disable-auto-update',
    '--ignore-certificate-errors',
    '--ignore-ssl-errors',
    '--ignore-certificate-errors-spki-list',
    '--single-process', // Reduz o uso de memória
    '--disable-dev-shm-usage', // Evita problemas em ambientes com memória limitada
  ],
};
