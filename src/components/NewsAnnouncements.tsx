import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { NewsAnnouncement } from '../types/database';
import { Stack, Text, Icon, mergeStyles, useTheme } from '@fluentui/react';

const sectionStyles = mergeStyles({
  padding: '32px 24px',
  backgroundColor: '#f3f2f1',
});

const containerStyles = mergeStyles({
  maxWidth: '1440px',
  margin: '0 auto',
});

const cardStyles = mergeStyles({
  position: 'relative',
  padding: '0',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  border: '1px solid #edebe9',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  //minWidth: '380px',
  //maxWidth: '380px',
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  },
});

const imageStyles = mergeStyles({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  position: 'relative',
  overflow: 'hidden',
});

const imagePlaceholderStyles = mergeStyles({
  width: '100%',
  height: '200px',
  background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '48px',
  position: 'relative',
  overflow: 'hidden',
});

const badgeStyles = mergeStyles({
  position: 'absolute',
  top: '16px',
  left: '16px',
  padding: '6px 12px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: 600,
  color: '#0078d4',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export default function NewsAnnouncements() {
  const [news, setNews] = useState<NewsAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news_announcements')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(3);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      announcement: '#0078d4',
      update: '#107c10',
      event: '#8764b8',
      alert: '#d13438',
    };
    return colors[category?.toLowerCase()] || '#0078d4';
  };

  const getNewsImage = (index: number) => {
    const images = [
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    ];
    return images[index % images.length];
  };

  if (loading) return <Stack horizontalAlign="center" styles={{ root: { padding: '48px' } }}><Text>{t('common.loading')}</Text></Stack>;

  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <Stack tokens={{ childrenGap: 32 }}>
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <Stack tokens={{ childrenGap: 8 }}>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 700, color: theme.palette.neutralPrimary } }}>
                {t('news.title')}
              </Text>
              <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                Stay updated with the latest company news and announcements
              </Text>
            </Stack>
            <a
              href="#"
              className="view-all-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/announcements');
              }}
              style={{
                color: theme.palette.themePrimary,
                textDecoration: 'none',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              {t('news.viewAll')} <Icon iconName="ChevronRight" />
            </a>
          </Stack>

          <div style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#0078d4 #f3f2f1',
          }}>
            {news.map((item, index) => (
              <div
                key={item.id}
                className={cardStyles}
                onClick={() => navigate(`/announcement/${item.id}`)}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={getNewsImage(index)}
                    alt={item.title}
                    className={imageStyles}
                  />
                  <div className={badgeStyles} style={{ color: getCategoryColor(item.category) }}>
                    <Icon iconName="Tag" styles={{ root: { fontSize: 12 } }} />
                    {item.category?.charAt(0).toUpperCase() + item.category?.slice(1) || 'Announcement'}
                  </div>
                </div>

                <Stack tokens={{ childrenGap: 16 }} styles={{ root: { padding: '24px', height: 'calc(100% - 200px)' } }}>
                  <Stack tokens={{ childrenGap: 12 }} styles={{ root: { flex: 1 } }}>
                    <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                      <Icon iconName="Calendar" styles={{ root: { fontSize: 14, color: theme.palette.neutralSecondary } }} />
                      <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                        {formatDate(item.published_date)}
                      </Text>
                    </Stack>

                    <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, lineHeight: 1.3, wordWrap: 'break-word' } }}>
                      {item.title}
                    </Text>

                    <Text
                      variant="medium"
                      styles={{
                        root: {
                          color: theme.palette.neutralSecondary,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          wordWrap: 'break-word',
                          maxHeight: '4.5em',
                        }
                      }}
                    >
                      {item.content.substring(0, 150)}...
                    </Text>
                  </Stack>

                  <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { marginTop: 'auto' } }}>
                    <Text variant="small" styles={{ root: { color: theme.palette.themePrimary, fontWeight: 600 } }}>
                      Read More →
                    </Text>
                    <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                      <Icon iconName="View" styles={{ root: { fontSize: 14, color: theme.palette.neutralTertiary } }} />
                      <Text variant="tiny" styles={{ root: { color: theme.palette.neutralTertiary } }}>
                        {Math.floor(Math.random() * 500) + 100} views
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </div>
            ))}
          </div>
        </Stack>
      </div>
    </section>
  );
}
