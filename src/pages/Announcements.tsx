import { useNavigate } from 'react-router-dom';
import { Stack, Text, Icon, useTheme, mergeStyleSets, IStackTokens, SearchBox } from '@fluentui/react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { NewsAnnouncement } from '../types/database';

const getStyles = (theme: any) => mergeStyleSets({
  pageRoot: {
    backgroundColor: '#f3f2f1',
    minHeight: 'calc(100vh - 128px)',
    padding: '48px 24px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  headerSection: {
    backgroundColor: theme.palette.white,
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    marginBottom: '32px',
  },
  filterBar: {
    backgroundColor: theme.palette.white,
    padding: '20px 28px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    marginBottom: '24px',
  },
  card: {
    padding: '24px',
    backgroundColor: theme.palette.white,
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      transform: 'translateX(4px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  iconContainer: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  typeBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
});

const headerTokens: IStackTokens = { childrenGap: 8 };
const listTokens: IStackTokens = { childrenGap: 16 };
const cardTokens: IStackTokens = { childrenGap: 16 };

export default function Announcements() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [announcements, setAnnouncements] = useState<NewsAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('news_announcements')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const getTypeColor = (type: string) => {
    const colors = {
      info: { bg: '#deecf9', icon: '#0078d4' },
      warning: { bg: '#fff4ce', icon: '#ffaa44' },
      success: { bg: '#dff6dd', icon: '#107c10' },
      urgent: { bg: '#fde7e9', icon: '#d13438' },
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  const getIconName = (category: string) => {
    const icons: Record<string, string> = {
      warning: 'Warning',
      urgent: 'Shield',
      success: 'CheckMark',
      info: 'Info',
    };
    return icons[category?.toLowerCase()] || 'Info';
  };

  if (loading) {
    return (
      <div className={styles.pageRoot}>
        <div className={styles.container}>
          <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: '80px 20px' } }}>
            <Text variant="xLarge">Loading announcements...</Text>
          </Stack>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <Stack tokens={headerTokens}>
            <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
              Announcements
            </Text>
            <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
              Stay updated with the latest company news and announcements
            </Text>
          </Stack>
        </div>

        <div className={styles.filterBar}>
          <Stack horizontal verticalAlign="center" horizontalAlign="space-between" wrap>
            <SearchBox
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(_, newValue) => setSearchQuery(newValue || '')}
              styles={{ root: { width: 320 } }}
            />
            <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
              {filteredAnnouncements.length} {filteredAnnouncements.length === 1 ? 'announcement' : 'announcements'} found
            </Text>
          </Stack>
        </div>

        <Stack tokens={listTokens}>
          {filteredAnnouncements.map((announcement) => {
            const colors = getTypeColor(announcement.category);
            return (
              <div
                key={announcement.id}
                className={styles.card}
                onClick={() => navigate(`/announcement/${announcement.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.icon;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.palette.neutralQuaternaryAlt;
                }}
              >
                <Stack horizontal tokens={cardTokens} verticalAlign="start">
                  <div
                    className={styles.iconContainer}
                    style={{ backgroundColor: colors.bg }}
                  >
                    <Icon iconName={getIconName(announcement.category)} styles={{ root: { fontSize: 24, color: colors.icon } }} />
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

                    <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                      {announcement.title}
                    </Text>

                    <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary, lineHeight: '1.6' } }}>
                      {announcement.excerpt}
                    </Text>
                  </Stack>

                  <Icon
                    iconName="ChevronRight"
                    styles={{
                      root: {
                        fontSize: 16,
                        color: theme.palette.themePrimary,
                        flexShrink: 0,
                      },
                    }}
                  />
                </Stack>
              </div>
            );
          })}
        </Stack>

        {filteredAnnouncements.length === 0 && (
          <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: '80px 20px', backgroundColor: theme.palette.white, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' } }}>
            <Icon iconName="SearchIssue" styles={{ root: { fontSize: 64, color: theme.palette.neutralTertiary, marginBottom: '16px' } }} />
            <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, marginBottom: '8px' } }}>
              No announcements found
            </Text>
            <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
              Try adjusting your search query
            </Text>
          </Stack>
        )}
      </div>
    </div>
  );
}
