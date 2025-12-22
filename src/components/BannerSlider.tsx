import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Stack,
  Text,
  PrimaryButton,
  IconButton,
  mergeStyles,
} from '@fluentui/react';

interface Slide {
  id: number;
  titleKey: string;
  descriptionKey: string;
  bgColor: string;
  image: string;
}

const slidesConfig: Slide[] = [
  {
    id: 1,
    titleKey: 'banner.slide1.title',
    descriptionKey: 'banner.slide1.description',
    bgColor: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 2,
    titleKey: 'banner.slide2.title',
    descriptionKey: 'banner.slide2.description',
    bgColor: 'linear-gradient(135deg, #8764b8 0%, #6b4d9c 100%)',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 3,
    titleKey: 'banner.slide3.title',
    descriptionKey: 'banner.slide3.description',
    bgColor: 'linear-gradient(135deg, #00a4ef 0%, #0086c7 100%)',
    image: 'https://images.pexels.com/photos/7974354/pexels-photo-7974354.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 4,
    titleKey: 'banner.slide4.title',
    descriptionKey: 'banner.slide4.description',
    bgColor: 'linear-gradient(135deg, #005a9e 0%, #004578 100%)',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1920'
  }
];

const bannerStyles = mergeStyles({
  position: 'relative',
  width: '100%',
  height: '350px',
  overflow: 'hidden',
  '@media (min-width: 768px)': {
    height: '420px',
  },
});

const slideContainerStyles = mergeStyles({
  position: 'absolute',
  inset: 0,
  transition: 'opacity 1s ease-in-out',
});

const overlayStyles = mergeStyles({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
});

const contentStyles = mergeStyles({
  position: 'relative',
  height: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 24px',
  display: 'flex',
  alignItems: 'center',
});

const textContainerStyles = mergeStyles({
  maxWidth: '600px',
  color: '#fff',
});

const navigationButtonStyles = {
  root: {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
  },
};

const dotsContainerStyles = mergeStyles({
  position: 'absolute',
  bottom: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '8px',
  zIndex: 20,
});

const dotStyles = (isActive: boolean) => mergeStyles({
  height: '12px',
  width: isActive ? '32px' : '12px',
  borderRadius: '6px',
  backgroundColor: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
});

export default function BannerSlider() {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesConfig.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesConfig.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesConfig.length) % slidesConfig.length);
    setAutoPlay(false);
  };

  return (
    <div
      className={bannerStyles}
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {slidesConfig.map((slide, index) => (
        <div
          key={slide.id}
          className={slideContainerStyles}
          style={{
            opacity: index === currentSlide ? 1 : 0,
            pointerEvents: index === currentSlide ? 'auto' : 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: slide.bgColor,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.8,
            }}
          />
          <div className={overlayStyles} />

          <div className={contentStyles}>
            <Stack tokens={{ childrenGap: 24 }} className={textContainerStyles}>
              <Text
                variant="xxLargePlus"
                styles={{
                  root: {
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '42px',
                    lineHeight: '52px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordWrap: 'break-word',
                  },
                }}
              >
                {t(slide.titleKey)}
              </Text>
              <Text
                variant="large"
                styles={{
                  root: {
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '18px',
                    lineHeight: '28px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordWrap: 'break-word',
                  },
                }}
              >
                {t(slide.descriptionKey)}
              </Text>
              <div>
                <PrimaryButton
                  text={t('banner.explore')}
                  styles={{
                    root: {
                      backgroundColor: '#fff',
                      color: '#0078d4',
                      border: 'none',
                      padding: '12px 24px',
                      height: 'auto',
                    },
                    rootHovered: {
                      backgroundColor: '#f3f2f1',
                      color: '#0078d4',
                    },
                  }}
                />
              </div>
            </Stack>
          </div>
        </div>
      ))}

      <IconButton
        className="banner-slider-arrow banner-slider-arrow-left"
        iconProps={{ iconName: 'ChevronLeft' }}
        onClick={prevSlide}
        ariaLabel="Previous slide"
        styles={{
          ...navigationButtonStyles,
          root: {
            ...navigationButtonStyles.root,
            ...(isRTL ? { right: '24px' } : { left: '24px' }),
          },
        }}
      />

      <IconButton
        className="banner-slider-arrow banner-slider-arrow-right"
        iconProps={{ iconName: 'ChevronRight' }}
        onClick={nextSlide}
        ariaLabel="Next slide"
        styles={{
          ...navigationButtonStyles,
          root: {
            ...navigationButtonStyles.root,
            ...(isRTL ? { left: '24px' } : { right: '24px' }),
          },
        }}
      />

      <div className={dotsContainerStyles}>
        {slidesConfig.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={dotStyles(index === currentSlide)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
