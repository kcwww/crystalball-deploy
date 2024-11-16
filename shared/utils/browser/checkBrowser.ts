'use client';

export const checkBrowser = () => {
  const browsers = [
    'edg',
    'samsungbrowser',
    'opr',
    'opera',
    'chrome',
    'firefox',
    'safari',
  ];

  if (typeof navigator !== 'undefined') {
    const userAgent = navigator.userAgent.toLowerCase();

    return browsers.some((browser) => userAgent.includes(browser));
  }
};
