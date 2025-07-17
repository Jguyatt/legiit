# Meta Conversion Tracking Guide

## Overview
This guide explains how to use Meta conversion tracking in your Rankly360 application to monitor user interactions and conversions.

## Setup

### 1. Environment Variables
Add these to your `.env` file:
```
META_API_KEY=your_meta_api_key_here
REACT_APP_META_PIXEL_ID=your_pixel_id_here
```

### 2. Meta Pixel ID
You need to get your Meta Pixel ID from Facebook Business Manager:
1. Go to Facebook Business Manager
2. Navigate to Events Manager
3. Create a new pixel or use existing one
4. Copy the Pixel ID and add it to your environment variables

## Available Tracking Functions

### Basic Tracking
```javascript
import { trackPageView, trackLead, trackContact } from '../utils/metaPixel';

// Track page views
trackPageView('Home Page');

// Track leads (form submissions)
trackLead({
  formName: 'Contact Form',
  value: 0,
  currency: 'USD'
});

// Track contact events
trackContact({
  method: 'phone_call',
  value: 0,
  currency: 'USD'
});
```

### Custom Events
```javascript
import { trackCustomEvent } from '../utils/metaPixel';

// Track custom events
trackCustomEvent('ButtonClick', {
  button_name: 'Get Started',
  button_location: 'hero_section'
});
```

### Button Tracking
```javascript
import { trackButtonClick } from '../utils/metaPixel';

// Track button clicks
trackButtonClick('View Packages', {
  button_location: 'navigation',
  content_category: 'cta'
});
```

### Video Tracking
```javascript
import { trackVideoView } from '../utils/metaPixel';

// Track video views
trackVideoView('Overview Video', {
  video_name: 'Rankly360 Overview',
  content_category: 'video'
});
```

### Package Tracking
```javascript
import { trackPackageView } from '../utils/metaPixel';

// Track package views
trackPackageView('Local SEO Package', {
  value: 997,
  currency: 'USD',
  content_type: 'product'
});
```

## Implementation Examples

### 1. Hero Section (Already Implemented)
- Tracks "Get Started" button clicks
- Tracks "Overview Video" views

### 2. Chat Widget (Already Implemented)
- Tracks chat widget opens
- Tracks chat message sends

### 3. Form Submissions
```javascript
const handleFormSubmit = (formData) => {
  // Track lead generation
  trackLead({
    formName: 'Contact Form',
    value: 0,
    currency: 'USD'
  });
  
  // Submit form data
  submitForm(formData);
};
```

### 4. Package Page Views
```javascript
const handlePackageClick = (packageName, price) => {
  trackPackageView(packageName, {
    value: price,
    currency: 'USD',
    content_type: 'product'
  });
};
```

## React Hook Usage

```javascript
import { useMetaPixel } from '../utils/metaPixel';

const MyComponent = () => {
  const { trackPageView, trackButtonClick } = useMetaPixel();

  useEffect(() => {
    trackPageView('Service Page');
  }, []);

  const handleClick = () => {
    trackButtonClick('Service CTA');
  };

  return (
    <button onClick={handleClick}>
      Get Service
    </button>
  );
};
```

## Events to Track

### High-Value Events
1. **Lead Generation** - Contact form submissions
2. **Package Views** - When users view pricing
3. **Video Views** - Overview video engagement
4. **Chat Interactions** - Support engagement

### Engagement Events
1. **Button Clicks** - CTA interactions
2. **Page Views** - Content consumption
3. **Scroll Depth** - Content engagement
4. **Time on Page** - User engagement

## Testing

### 1. Browser Console
Check browser console for tracking logs:
```
Meta: PageView tracked for Home
Meta: Button click tracked for Get Started
Meta: Video view tracked for Overview Video
```

### 2. Facebook Events Manager
1. Go to Facebook Business Manager
2. Navigate to Events Manager
3. Check "Test Events" tab
4. Verify events are being received

### 3. Facebook Pixel Helper (Chrome Extension)
1. Install Facebook Pixel Helper
2. Visit your website
3. Check for pixel events in the extension

## Best Practices

### 1. Privacy Compliance
- Always inform users about tracking
- Provide opt-out options
- Follow GDPR/CCPA guidelines

### 2. Event Naming
- Use consistent naming conventions
- Include relevant parameters
- Avoid personally identifiable information

### 3. Value Tracking
- Track monetary values for conversions
- Use consistent currency
- Include relevant product information

### 4. Error Handling
- Wrap tracking calls in try-catch blocks
- Log errors for debugging
- Don't let tracking errors break user experience

## Troubleshooting

### Common Issues
1. **Pixel not loading** - Check pixel ID in environment variables
2. **Events not firing** - Check browser console for errors
3. **Events not appearing in Facebook** - Check pixel helper extension
4. **Duplicate events** - Ensure single event tracking per action

### Debug Mode
Enable debug logging by checking browser console for tracking messages.

## Next Steps

1. **Add Pixel ID** - Get your Meta Pixel ID and add it to environment variables
2. **Test Events** - Verify tracking is working in development
3. **Deploy** - Push changes to production
4. **Monitor** - Check Facebook Events Manager for data
5. **Optimize** - Use data to improve conversion rates 