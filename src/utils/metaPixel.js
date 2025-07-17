// Meta Pixel tracking utility for client-side conversion tracking

// Initialize Meta Pixel
export const initMetaPixel = (pixelId) => {
  if (!pixelId || pixelId === 'YOUR_PIXEL_ID') {
    console.warn('Meta Pixel ID not provided or using default value');
    return;
  }

  // Check if fbq is already loaded
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
    console.log('Meta Pixel initialized with ID:', pixelId);
    return;
  }

  // Load Meta Pixel script
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-unused-expressions
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    // Initialize pixel after script loads
    setTimeout(() => {
      if (window.fbq) {
        window.fbq('init', pixelId);
        window.fbq('track', 'PageView');
        console.log('Meta Pixel initialized with ID:', pixelId);
      }
    }, 1000);
  }
};

// Track page views
export const trackPageView = (pageName = '') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
    console.log('Meta: PageView tracked for', pageName || window.location.pathname);
  }
};

// Track leads (form submissions)
export const trackLead = (formData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: formData.formName || 'Contact Form',
      content_category: 'lead_generation',
      value: formData.value || 0,
      currency: 'USD'
    });
    console.log('Meta: Lead tracked');
  }
};

// Track contact events
export const trackContact = (contactData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: contactData.method || 'Contact',
      content_category: 'contact',
      value: contactData.value || 0,
      currency: 'USD'
    });
    console.log('Meta: Contact tracked');
  }
};

// Track custom events
export const trackCustomEvent = (eventName, customData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, customData);
    console.log(`Meta: ${eventName} tracked with data:`, customData);
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, buttonData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CustomEvent', {
      event_name: 'ButtonClick',
      button_name: buttonName,
      ...buttonData
    });
    console.log(`Meta: Button click tracked for ${buttonName}`);
  }
};

// Track video views
export const trackVideoView = (videoName, videoData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CustomEvent', {
      event_name: 'VideoView',
      video_name: videoName,
      ...videoData
    });
    console.log(`Meta: Video view tracked for ${videoName}`);
  }
};

// Track package views
export const trackPackageView = (packageName, packageData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: packageName,
      content_category: 'package',
      content_type: 'product',
      value: packageData.value || 0,
      currency: 'USD',
      ...packageData
    });
    console.log(`Meta: Package view tracked for ${packageName}`);
  }
};

// React Hook for easy integration
export const useMetaPixel = () => {
  return {
    trackPageView,
    trackLead,
    trackContact,
    trackCustomEvent,
    trackButtonClick,
    trackVideoView,
    trackPackageView,
  };
}; 