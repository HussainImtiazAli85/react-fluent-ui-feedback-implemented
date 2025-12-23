import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Text, Icon, IconButton, useTheme, mergeStyleSets, IStackTokens, Breadcrumb, IBreadcrumbItem, ITheme } from '@fluentui/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { NewsAnnouncement } from '../types/database';

const getStyles = (theme: ITheme) => mergeStyleSets({
  pageRoot: {
    backgroundColor: '#f3f2f1',
    minHeight: 'calc(100vh - 128px)',
    padding: '48px 24px',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  headerCard: {
    backgroundColor: theme.palette.white,
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    marginBottom: '24px',
  },
  contentCard: {
    backgroundColor: theme.palette.white,
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
  },
  iconContainer: {
    width: '64px',
    height: '64px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  typeBadge: {
    padding: '6px 14px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: theme.palette.neutralLighter,
    borderRadius: '8px',
  },
});

const headerTokens: IStackTokens = { childrenGap: 24 };
const contentTokens: IStackTokens = { childrenGap: 24 };

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { t, i18n } = useTranslation();
  const [announcement, setAnnouncement] = useState<NewsAnnouncement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncement();
  }, [id]);

  const fetchAnnouncement = async () => {
    try {
      const { data, error } = await supabase
        .from('news_announcements')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setAnnouncement(data);
    } catch (error) {
      console.error('Error fetching announcement:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className={styles.pageRoot}>
        <div className={styles.container}>
          <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: '80px 20px' } }}>
            <Text variant="xLarge">Loading...</Text>
          </Stack>
        </div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className={styles.pageRoot}>
        <div className={styles.container}>
          <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: '80px 20px' } }}>
            <Text variant="xLarge" styles={{ root: { fontWeight: 600, marginBottom: '16px' } }}>
              Announcement not found
            </Text>
            <IconButton
              iconProps={{ iconName: 'Back' }}
              text="Go Back"
              onClick={() => navigate(-1)}
            />
          </Stack>
        </div>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    const colors = {
      info: { bg: '#deecf9', icon: '#0078d4' },
      warning: { bg: '#fff4ce', icon: '#ffaa44' },
      success: { bg: '#dff6dd', icon: '#107c10' },
      urgent: { bg: '#fde7e9', icon: '#d13438' },
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  const colors = getTypeColor(announcement.category);

  const isAr = i18n.language === 'ar';
  const normalizeSeedKey = (value?: string | null) => (value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

  const seedEntries: Array<{ match: string; titleKey: string; contentKey: string; excerptKey: string }> = [
    {
      match: 'Welcome to Q4 2025',
      titleKey: 'news.demo.welcomeQ4.title',
      contentKey: 'news.demo.welcomeQ4.content',
      excerptKey: 'news.demo.welcomeQ4.excerpt',
    },
    {
      match: 'New Office Opening',
      titleKey: 'news.demo.newOffice.title',
      contentKey: 'news.demo.newOffice.content',
      excerptKey: 'news.demo.newOffice.excerpt',
    },
    {
      match: 'Employee Wellness Program',
      titleKey: 'news.demo.wellness.title',
      contentKey: 'news.demo.wellness.content',
      excerptKey: 'news.demo.wellness.excerpt',
    },
  ];

  const getSeedEntry = (title: string) => {
    const normalizedTitle = normalizeSeedKey(title);
    return seedEntries.find((e) => normalizeSeedKey(e.match) === normalizedTitle)
      || seedEntries.find((e) => normalizedTitle.includes(normalizeSeedKey(e.match)));
  };

  const seeded = isAr && !announcement.title_ar && !announcement.content_ar && !announcement.excerpt_ar
    ? getSeedEntry(announcement.title)
    : null;

  const title = seeded ? t(seeded.titleKey) : (isAr ? (announcement.title_ar || announcement.title) : announcement.title);
  const excerpt = seeded ? t(seeded.excerptKey) : (isAr ? (announcement.excerpt_ar || announcement.excerpt) : announcement.excerpt);
  const content = seeded ? t(seeded.contentKey) : (isAr ? (announcement.content_ar || announcement.content) : announcement.content);

  if (import.meta.env.DEV && isAr) {
    console.debug('[AnnouncementDetail] item localization', {
      title: announcement.title,
      title_ar: announcement.title_ar,
      usedSeedFallback: Boolean(seeded),
    });
  }

  const breadcrumbItems: IBreadcrumbItem[] = [
    { text: 'Home', key: 'home', onClick: () => navigate('/') },
    { text: 'Announcements', key: 'announcements', onClick: () => navigate('/announcements') },
    { text: title, key: 'current', isCurrentItem: true },
  ];

  return (
    <div className={styles.pageRoot}>
      <div className={styles.container}>
        <Stack tokens={{ childrenGap: 16 }} styles={{ root: { marginBottom: '24px' } }}>
          <IconButton
            iconProps={{ iconName: 'Back' }}
            text="Back"
            onClick={() => navigate(-1)}
            styles={{
              root: { width: 'fit-content' },
              rootHovered: { backgroundColor: theme.palette.neutralLighter },
            }}
          />
          <Breadcrumb items={breadcrumbItems} />
        </Stack>

        <div className={styles.headerCard}>
          <Stack horizontal tokens={headerTokens} verticalAlign="start">
            {/* News image section */}
            <div style={{ marginRight: 32, minWidth: 180, maxWidth: 220 }}>
              <img
                src={announcement.image_url || 'https://source.unsplash.com/400x240/?news,office'}
                alt="News"
                style={{
                  width: 200,
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
                  background: '#f3f2f1',
                  display: 'block',
                }}
              />
            </div>
            <Stack tokens={{ childrenGap: 12 }} styles={{ root: { flex: 1 } }}>
              <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center" wrap>
                <div
                  className={styles.typeBadge}
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.icon,
                  }}
                >
                  {announcement.category?.toUpperCase()}
                </div>
                <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  {formatTimeAgo(announcement.published_date)}
                </Text>
              </Stack>

              <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                {title}
              </Text>

              <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                {excerpt}
              </Text>

              <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
                <div className={styles.metaItem}>
                  <Icon iconName="Contact" styles={{ root: { fontSize: 14, color: theme.palette.themePrimary } }} />
                  <Text variant="small" styles={{ root: { fontWeight: 500 } }}>
                    {announcement.author}
                  </Text>
                </div>
                <div className={styles.metaItem}>
                  <Icon iconName="Org" styles={{ root: { fontSize: 14, color: theme.palette.themePrimary } }} />
                  <Text variant="small" styles={{ root: { fontWeight: 500 } }}>
                    {announcement.department}
                  </Text>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </div>

        <div className={styles.contentCard}>
          <Stack tokens={contentTokens}>
            <Stack tokens={{ childrenGap: 8 }}>
              <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                Details
              </Text>
              <div style={{ width: '60px', height: '4px', backgroundColor: theme.palette.themePrimary, borderRadius: '2px' }} />
            </Stack>

            <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary, lineHeight: '1.8', whiteSpace: 'pre-line' } }}>
              {content}
            </Text>

            <Stack
              horizontal
              tokens={{ childrenGap: 12 }}
              styles={{
                root: {
                  paddingTop: '24px',
                  borderTop: `1px solid ${theme.palette.neutralLighter}`,
                },
              }}
            >
              <IconButton
                iconProps={{ iconName: 'Share' }}
                text="Share"
                styles={{
                  root: {
                    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
                  },
                  rootHovered: {
                    backgroundColor: theme.palette.neutralLighter,
                  },
                }}
              />
              <IconButton
                iconProps={{ iconName: 'Flag' }}
                text="Report"
                styles={{
                  root: {
                    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
                  },
                  rootHovered: {
                    backgroundColor: theme.palette.neutralLighter,
                  },
                }}
              />
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
}
