import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { QuickLink } from '../types/database';
import {
  Stack,
  Text,
  Icon,
  IconButton,
  mergeStyles,
} from '@fluentui/react';

const sectionStyles = mergeStyles({
  padding: '32px 0 0',
  backgroundColor: '#f3f2f1',
  position: 'relative',
});

const containerStyles = mergeStyles({
  maxWidth: '100%',
  margin: '0 auto',
});

const cardStyles = mergeStyles({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  cursor: 'pointer',
  border: '1px solid #edebe9',
  boxShadow: '0 1.6px 3.6px rgba(0, 0, 0, 0.13)',
  transition: 'all 0.2s ease',
  minWidth: '140px',
  ':hover': {
    boxShadow: '0 3.2px 7.2px rgba(0, 0, 0, 0.18)',
    transform: 'translateY(-2px)',
  },
});

const iconContainerStyles = mergeStyles({
  width: '48px',
  height: '48px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
  backgroundColor: '#deecf9',
  color: '#0078d4',
  transition: 'all 0.2s ease',
  '.card:hover &': {
    backgroundColor: '#0078d4',
    color: '#fff',
  },
});

const sliderStyles = mergeStyles({
  display: 'flex',
  gap: '21px',
  transition: 'transform 0.3s ease',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export default function QuickLinks() {
  const { t } = useTranslation();
  type LocalQuickLink = QuickLink & { titleKey?: string; descriptionKey?: string };
  const [links, setLinks] = useState<LocalQuickLink[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchQuickLinks();
  }, []);

  const fetchQuickLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('quick_links')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      const moreLinks = [
        { id: 'local-100', title: '', description: '', titleKey: 'quickLinks.employeeBenefits', descriptionKey: 'quickLinks.employeeBenefitsDesc', icon: 'Heart', url: '#', order_index: 100, created_at: new Date().toISOString() },
        { id: 'local-101', title: '', description: '', titleKey: 'quickLinks.timeOff', descriptionKey: 'quickLinks.timeOffDesc', icon: 'Calendar', url: '#', order_index: 101, created_at: new Date().toISOString() },
        { id: 'local-102', title: '', description: '', titleKey: 'quickLinks.payroll', descriptionKey: 'quickLinks.payrollDesc', icon: 'Money', url: '#', order_index: 102, created_at: new Date().toISOString() },
        { id: 'local-103', title: '', description: '', titleKey: 'quickLinks.performance', descriptionKey: 'quickLinks.performanceDesc', icon: 'Chart', url: '#', order_index: 103, created_at: new Date().toISOString() },
        { id: 'local-104', title: '', description: '', titleKey: 'quickLinks.learningResources', descriptionKey: 'quickLinks.learningResourcesDesc', icon: 'Education', url: '#', order_index: 104, created_at: new Date().toISOString() },
        { id: 'local-105', title: '', description: '', titleKey: 'quickLinks.itSupport', descriptionKey: 'quickLinks.itSupportDesc', icon: 'Settings', url: '#', order_index: 105, created_at: new Date().toISOString() },
      ];

      setLinks([...(data || []), ...moreLinks]);
    } catch (error) {
      console.error('Error fetching quick links:', error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector('.card');
      if (!card) return;
      const cardWidth = (card as HTMLElement).offsetWidth + 21; // 21px gap
      // Show 12 cards on desktop, 2 on mobile
      const cardsToShow = window.innerWidth < 768 ? 2 : 12;
      const scrollAmount = cardWidth * cardsToShow;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getIconName = (iconName: string): string => {
    const iconMap: Record<string, string> = {
      'users': 'People',
      'headphones': 'Headset',
      'calendar': 'Calendar',
      'heart': 'Heart',
      'graduation-cap': 'Education',
      'book-user': 'ContactCard',
      'file-text': 'TextDocument',
      'message-square': 'CommentSolid',
      'link': 'Link',
    };
    return iconMap[iconName] || 'Link';
  };

  if (loading) {
    return (
      <section className={sectionStyles}>
        <div className={containerStyles}>
          <Stack horizontalAlign="center">
            <Text variant="large">{t('common.loading')}</Text>
          </Stack>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <Stack tokens={{ childrenGap: 32 }}>
          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', minHeight: 80 }}>
            <IconButton
              className="quicklink-arrow quicklink-arrow-left"
              iconProps={{ iconName: 'ChevronLeft' }}
              onClick={() => scroll('left')}
              styles={{
                root: {
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  backgroundColor: '#fff',
                  border: '1px solid #edebe9',
                },
                rootHovered: {
                  backgroundColor: '#f3f2f1',
                },
              }}
            />
            <div ref={sliderRef} className={sliderStyles} style={{ flex: 1, margin: '0 40px' }}>
              {links.map((link) => {
                const label = link.titleKey ? t(link.titleKey) : link.title;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    className={`${cardStyles} card`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className={iconContainerStyles}>
                      <Icon iconName={getIconName(link.icon) || 'Link'} styles={{ root: { fontSize: 24 } }} />
                    </div>
                    <Text
                      variant="medium"
                      styles={{
                        root: {
                          fontWeight: 600,
                          color: '#323130',
                          marginBottom: '4px',
                          display: 'block',
                        },
                      }}
                    >
                      {label}
                    </Text>
                    {/* Description hidden as per request */}
                  </a>
                );
              })}
            </div>
            <IconButton
              className="quicklink-arrow quicklink-arrow-right"
              iconProps={{ iconName: 'ChevronRight' }}
              onClick={() => scroll('right')}
              styles={{
                root: {
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  backgroundColor: '#fff',
                  border: '1px solid #edebe9',
                },
                rootHovered: {
                  backgroundColor: '#f3f2f1',
                },
              }}
            />
          </div>
        </Stack>
      </div>
    </section>
  );
}
