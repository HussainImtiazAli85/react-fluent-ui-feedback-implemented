# Bidirectional (RTL/LTR) Slider Implementation Guide

This document provides a comprehensive guide to the RTL (Right-to-Left) implementation for slider components in the intranet portal, supporting both English (LTR) and Arabic (RTL) layouts.

## Overview

The application now fully supports bidirectional text layouts with automatic detection and adaptation based on the selected language. All slider components (Events, BannerSlider, NewHires) have been enhanced to work seamlessly in both LTR and RTL modes.

## Architecture

### 1. Language Detection and Direction Setting

The application automatically detects the language and sets the HTML `dir` attribute:

```typescript
// src/App.tsx (lines 25-28)
useEffect(() => {
  document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = i18n.language;
}, [i18n.language]);
```

**Key Points:**
- The `dir` attribute is set on `document.documentElement` (the `<html>` tag)
- This provides global RTL context for all CSS and layout calculations
- Browser automatically mirrors certain UI elements (chevron icons, scrollbars)

### 2. RTL Detection in Components

Each slider component detects the current text direction:

```typescript
import { useTranslation } from 'react-i18next';

export default function SliderComponent() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Use isRTL flag for conditional logic
}
```

## Implementation Details

### Events Slider (Transform-Based)

The Events component uses CSS transforms to slide between event cards.

**RTL Transform Logic:**

```typescript
// src/components/Events.tsx (lines 134, 277-278)
const isRTL = i18n.language === 'ar';

// In the slider div style
<div
  style={{
    transform: `translateX(${isRTL ? '' : '-'}${currentIndex * (100 / itemsPerSlide)}%)`
  }}
>
```

**How It Works:**
- **LTR Mode**: Negative transform moves slider to the left: `-100%`, `-200%`, etc.
- **RTL Mode**: Positive transform moves slider to the right: `100%`, `200%`, etc.
- The direction naturally inverts for RTL layouts
- Navigation arrows automatically handle disabled states at boundaries

**Navigation States:**
```typescript
const isAtStart = currentIndex === 0;
const isAtEnd = currentIndex >= maxIndex;

// Previous arrow disabled at start
<IconButton disabled={isAtStart || events.length <= itemsPerSlide} />

// Next arrow disabled at end
<IconButton disabled={isAtEnd || events.length <= itemsPerSlide} />
```

### BannerSlider (Crossfade-Based)

The BannerSlider uses opacity transitions, so slides don't physically move. However, navigation arrows need position adjustments.

**RTL Arrow Positioning:**

```typescript
// src/components/BannerSlider.tsx (lines 126, 258, 271)
const isRTL = i18n.language === 'ar';

// Left arrow positioning
<IconButton
  styles={{
    root: {
      ...(isRTL ? { right: '24px' } : { left: '24px' }),
    }
  }}
/>

// Right arrow positioning
<IconButton
  styles={{
    root: {
      ...(isRTL ? { left: '24px' } : { right: '24px' }),
    }
  }}
/>
```

**How It Works:**
- In LTR: Left arrow on left side, right arrow on right side
- In RTL: Positions swap - left arrow on right side, right arrow on left side
- Maintains intuitive navigation in both directions

### NewHires Slider (Scroll-Based)

The NewHires component uses native browser scrolling with `scrollBy()`.

**RTL Scroll Logic:**

```typescript
// src/components/NewHires.tsx (lines 129, 172-181)
const isRTL = i18n.language === 'ar';

const scroll = (direction: 'left' | 'right') => {
  if (sliderRef.current) {
    const scrollAmount = 300;
    const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount;
    sliderRef.current.scrollBy({
      left: isRTL ? -scrollDirection : scrollDirection,
      behavior: 'smooth',
    });
  }
};
```

**RTL Scroll Position Detection:**

```typescript
// src/components/NewHires.tsx (lines 141-152)
const checkScrollPosition = useCallback(() => {
  if (sliderRef.current) {
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    if (isRTL) {
      // In RTL, scrollLeft is negative or counts from right
      setIsAtStart(Math.abs(scrollLeft) + clientWidth >= scrollWidth - 1);
      setIsAtEnd(scrollLeft >= -1);
    } else {
      // Standard LTR behavior
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  }
}, [isRTL]);
```

**How It Works:**
- **LTR Mode**: `scrollLeft` starts at 0 and increases as you scroll right
- **RTL Mode**: `scrollLeft` starts at 0 (or negative) and the logic inverts
- Scroll direction is inverted: clicking "right" scrolls to the "visual left" in RTL
- Browser handles the visual mirroring of content automatically

## Accessibility Features

All slider implementations include comprehensive accessibility features:

### ARIA Labels
```typescript
<IconButton
  ariaLabel="Previous events - Navigate to previous slide"
  title={isAtStart ? "Already at first slide" : "Previous events"}
/>
```

### Keyboard Navigation
- Arrow buttons are focusable and support Enter/Space key activation
- Disabled states properly set `disabled` attribute to prevent keyboard navigation
- Dot indicators support keyboard interaction with `tabIndex` and `onKeyPress`

### Visual Feedback
```typescript
styles={{
  rootDisabled: {
    backgroundColor: theme.palette.neutralLighter,
    opacity: 0.4,
    cursor: 'not-allowed',
  }
}}
```

## Testing RTL Functionality

### Manual Testing Steps

1. **Switch to Arabic Language:**
   - Click the language selector in the header
   - Select "العربية" (Arabic)
   - The entire layout should flip to RTL

2. **Test Events Slider:**
   - Navigate to the home page
   - Verify the Events slider shows events properly
   - Click the left arrow (should be on the right side in RTL)
   - Verify it moves to the next event
   - Check that arrows disable at boundaries

3. **Test Banner Slider:**
   - Observe the hero banner at the top
   - Verify navigation arrows are on the correct sides
   - Click arrows to navigate between slides
   - Verify auto-play works correctly

4. **Test NewHires Slider:**
   - Scroll through the new hires section
   - Verify horizontal scrolling works naturally
   - Check that scroll direction feels intuitive
   - Verify arrow disable states at scroll boundaries

### Automated Testing

For automated testing, you can check:

```typescript
// Test RTL detection
expect(document.documentElement.dir).toBe('rtl');

// Test transform direction
const slider = screen.getByTestId('events-slider');
expect(slider.style.transform).toContain('translateX(100%'); // Positive in RTL

// Test aria labels
const prevButton = screen.getByLabelText(/previous/i);
expect(prevButton).toBeDisabled(); // At start position
```

## CSS Considerations

### Automatic Mirroring
The browser automatically mirrors certain properties when `dir="rtl"` is set:
- `left` ↔ `right`
- `margin-left` ↔ `margin-right`
- `padding-left` ↔ `padding-right`
- Flex direction reverses
- Text alignment reverses

### Manual Control
For precise control, use logical properties:
```css
/* Instead of margin-left */
margin-inline-start: 10px;

/* Instead of padding-right */
padding-inline-end: 10px;

/* Instead of border-left */
border-inline-start: 1px solid black;
```

## Browser Compatibility

This implementation works across all modern browsers:
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

### Scrollbar Position
- In RTL mode, scrollbars automatically appear on the left side
- This is native browser behavior and requires no additional code

## Example: Standalone Bidirectional Slider

Here's a complete standalone example demonstrating the core concepts:

```html
<!DOCTYPE html>
<html dir="ltr">
<head>
  <style>
    .slider-container {
      width: 600px;
      overflow: hidden;
      position: relative;
      margin: 20px auto;
    }

    .slider-track {
      display: flex;
      gap: 16px;
      transition: transform 0.5s ease;
    }

    .slider-item {
      min-width: 280px;
      height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      font-weight: bold;
    }

    .nav-buttons {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-top: 16px;
    }

    button {
      padding: 8px 16px;
      background: #0078d4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background: #106ebe;
    }

    .direction-toggle {
      text-align: center;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="direction-toggle">
    <button onclick="toggleDirection()">Toggle RTL/LTR</button>
    <span id="current-dir">Current: LTR</span>
  </div>

  <div class="slider-container">
    <div class="slider-track" id="slider-track">
      <div class="slider-item">Slide 1</div>
      <div class="slider-item">Slide 2</div>
      <div class="slider-item">Slide 3</div>
      <div class="slider-item">Slide 4</div>
    </div>
  </div>

  <div class="nav-buttons">
    <button id="prev-btn" onclick="navigate('prev')">← Previous</button>
    <button id="next-btn" onclick="navigate('next')">Next →</button>
  </div>

  <script>
    let currentIndex = 0;
    const totalSlides = 4;
    const itemsPerView = 2;
    const maxIndex = totalSlides - itemsPerView;

    function updateSlider() {
      const track = document.getElementById('slider-track');
      const isRTL = document.documentElement.dir === 'rtl';

      // Calculate transform based on direction
      const translateValue = currentIndex * (100 / itemsPerView);
      const direction = isRTL ? '' : '-';
      track.style.transform = `translateX(${direction}${translateValue}%)`;

      // Update button states
      document.getElementById('prev-btn').disabled = currentIndex === 0;
      document.getElementById('next-btn').disabled = currentIndex >= maxIndex;
    }

    function navigate(direction) {
      if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
      } else if (direction === 'next' && currentIndex < maxIndex) {
        currentIndex++;
      }
      updateSlider();
    }

    function toggleDirection() {
      const html = document.documentElement;
      const isRTL = html.dir === 'rtl';
      html.dir = isRTL ? 'ltr' : 'rtl';
      document.getElementById('current-dir').textContent = `Current: ${html.dir.toUpperCase()}`;
      updateSlider();
    }

    // Initialize
    updateSlider();
  </script>
</body>
</html>
```

## Best Practices

1. **Always Use Semantic Direction Detection:**
   ```typescript
   const isRTL = i18n.language === 'ar'; // ✓ Good
   const isRTL = document.dir === 'rtl'; // ✗ Can be unreliable
   ```

2. **Handle Boundary States:**
   - Always disable navigation at boundaries
   - Provide clear visual feedback
   - Update ARIA labels appropriately

3. **Test Both Directions:**
   - Never assume LTR behavior will work in RTL
   - Test all interactive elements in both modes
   - Verify visual alignment and spacing

4. **Use Logical CSS Properties:**
   - Prefer `inline-start/end` over `left/right`
   - Let the browser handle automatic mirroring
   - Only override when necessary

5. **Maintain Accessibility:**
   - Keep ARIA labels updated
   - Ensure keyboard navigation works
   - Test with screen readers in both directions

## Troubleshooting

### Issue: Slider moves in wrong direction
**Solution:** Check if transform sign is inverted for RTL:
```typescript
transform: `translateX(${isRTL ? '' : '-'}${value}%)`
```

### Issue: Arrows positioned incorrectly
**Solution:** Swap left/right positioning based on RTL:
```typescript
...(isRTL ? { right: '24px' } : { left: '24px' })
```

### Issue: Scroll detection wrong in RTL
**Solution:** Handle negative scrollLeft values:
```typescript
if (isRTL) {
  setIsAtStart(Math.abs(scrollLeft) + clientWidth >= scrollWidth - 1);
}
```

## Conclusion

This implementation provides complete bidirectional support for all slider components in the application. The solution is:

- **Automatic**: Detects language and adapts immediately
- **Accessible**: Full keyboard and screen reader support
- **Performant**: No additional rendering overhead
- **Maintainable**: Clear, documented code patterns
- **Cross-browser**: Works on all modern browsers

The key principle is to detect the text direction once and adjust transforms, positioning, and scroll behavior accordingly, while letting the browser handle automatic mirroring of standard CSS properties.
