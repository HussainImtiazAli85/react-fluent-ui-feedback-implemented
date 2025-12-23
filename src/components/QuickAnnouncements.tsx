import { Stack, Text, Icon, mergeStyleSets, useTheme, IStackTokens, Link as FluentLink } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Announcement {
  id: number;
  titleKey: string;
  messageKey: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  icon: string;
  title?: string;
  message?: string;
  iconUnicode?: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    titleKey: 'quickAnnouncements.systemMaintenance',
    messageKey: 'quickAnnouncements.maintenanceMsg',
    time: '2 hours ago',
    type: 'warning',
    icon: 'Warning',
    // title and message removed to always use translation
  },
  {
    id: 2,
    titleKey: 'quickAnnouncements.newPolicy',
    messageKey: 'quickAnnouncements.policyMsg',
    time: '5 hours ago',
    type: 'info',
    icon: 'Info',
    // title and message removed to always use translation
  },
  {
    id: 3,
    titleKey: 'quickAnnouncements.holidaySchedule',
    messageKey: 'quickAnnouncements.holidayMsg',
    time: '1 day ago',
    type: 'success',
    icon: 'Calendar',
    // title and message removed to always use translation
  },
  {
    id: 4,
    titleKey: 'quickAnnouncements.securityAlert',
    messageKey: 'quickAnnouncements.securityMsg',
    time: '2 days ago',
    type: 'urgent',
    icon: 'Shield',
    // title and message removed to always use translation
  },
];

const getStyles = (theme: any) => mergeStyleSets({
  container: {
    //backgroundColor: theme.palette.white,
    //padding: '18px',
    //borderRadius: '12px',
    //boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    //border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    height: '100%',
    margin: 0,
    width: '100%',
  },
  scrollContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '12px',
    width: '100%',
    marginTop: '0 !important',
    padding: '4px 0',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'solid',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: 12,
    background: '#fff',
    transition: 'box-shadow 0.2s',
    margin: '4px 0',
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
});

const getTypeColor = (type: string) => {
  const colors = {
    info: { bg: '#deecf9', icon: '#0078d4' },
    warning: { bg: '#fff4ce', icon: '#ffaa44' },
    success: { bg: '#dff6dd', icon: '#107c10' },
    urgent: { bg: '#fde7e9', icon: '#d13438' },
  };
  return colors[type as keyof typeof colors] || colors.info;
};

// Ensure at least 5 cards are shown

const QuickAnnouncements = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);
  const headerTokens: IStackTokens = { childrenGap: 4 };

  // Show 3 cards on desktop
  const cardsToShow = 3;
  const filledAnnouncements = [...announcements.slice(0, cardsToShow)];
  while (filledAnnouncements.length < cardsToShow) {
    filledAnnouncements.push({
      id: 1000 + filledAnnouncements.length,
      titleKey: '',
      messageKey: '',
      time: '',
      type: 'info',
      icon: 'Info',
      title: '',
      message: '',
      iconUnicode: '',
      // Add any other required fields
    });
  }

  return (
    <Stack tokens={{ childrenGap: 20 }} className={styles.container}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack tokens={headerTokens}>
          {/* <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, fontSize: '24px' } }}>
            {t('quickAnnouncements.title')}
          </Text> */}
          {/* <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
            {t('quickAnnouncements.subtitle')}
          </Text> */}
        </Stack>
        {/* <Link to="/announcements" style={{ textDecoration: 'none' }} className="view-all-link">
          <FluentLink styles={{ root: { fontSize: '13px', fontWeight: 600 } }}>
            {t('quickAnnouncements.viewAll')} <Icon iconName="ChevronRight" styles={{ root: { fontSize: 10, marginLeft: '2px' } }} />
          </FluentLink>
        </Link> */}
      </Stack>

      <div className={styles.scrollContainer}>
        {filledAnnouncements.map((announcement) => {
          const colors = getTypeColor(announcement.type);
          const isPlaceholder = !announcement.titleKey && !announcement.messageKey;

          const placeholderLine = `${t('quickAnnouncements.placeholderMsg')} • ${t('quickAnnouncements.placeholderTime')}`;
          const liveTitle = announcement.title || t(announcement.titleKey || '');
          const liveMessage = announcement.message || t(announcement.messageKey || '');
          const liveTime = announcement.time ? ` • ${announcement.time}` : '';
          const liveLine = `${liveMessage}${liveTime}`;

          return (
            <div
              key={announcement.id}
              className={styles.card}
              style={{
                borderColor: colors.icon,
                opacity: 1,
                pointerEvents: isPlaceholder ? 'none' : 'auto',
                borderStyle: isPlaceholder ? 'solid' : 'solid',
                background: theme.palette.white,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {isPlaceholder ? (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div
                    className={styles.iconContainer}
                    style={{ backgroundColor: colors.bg, marginRight: 16 }}
                  >
                    <span style={{ fontFamily: 'Segoe MDL2 Assets', fontSize: 24, color: colors.icon, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon iconName="Info" styles={{ root: { fontSize: 18, color: colors.icon } }} />
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text
                      variant="medium"
                      styles={{
                        root: {
                          fontWeight: 600,
                          color: theme.palette.neutralPrimary,
                          marginBottom: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                    >
                      {t('quickAnnouncements.placeholderTitle')}
                    </Text>
                    <Text
                      variant="small"
                      styles={{
                        root: {
                          color: theme.palette.neutralSecondary,
                          fontSize: '13px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                    >
                      {placeholderLine}
                    </Text>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div
                    className={styles.iconContainer}
                    style={{ backgroundColor: colors.bg, marginRight: 16 }}
                  >
                    <span style={{ fontFamily: 'Segoe MDL2 Assets', fontSize: 24, color: colors.icon, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {announcement.iconUnicode && !isNaN(parseInt(announcement.iconUnicode.replace(/\\u|u/g, ''), 16))
                        ? String.fromCharCode(parseInt(announcement.iconUnicode.replace(/\\u|u/g, ''), 16))
                        : <Icon iconName={announcement.icon} styles={{ root: { fontSize: 18, color: colors.icon } }} />}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0, gap: 8, display: 'flex' }}>
                    <Text
                      variant="medium"
                      styles={{
                        root: {
                          fontWeight: 600,
                          color: theme.palette.neutralPrimary,
                          marginBottom: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                    >
                      {liveTitle}
                    </Text>
                    <Text
                      variant="small"
                      styles={{
                        root: {
                          color: theme.palette.neutralSecondary,
                          fontSize: '13px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                    >
                      {liveLine}
                    </Text>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Stack>
  );
};

export default QuickAnnouncements;
