import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Text, Icon, IconButton, useTheme, mergeStyleSets, IStackTokens, Breadcrumb, IBreadcrumbItem, PrimaryButton, DefaultButton, ITheme } from '@fluentui/react';
import { supabase } from '../lib/supabase';
import { Event } from '../types/database';

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
    position: 'relative',
    backgroundColor: theme.palette.white,
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    marginBottom: '24px',
    overflow: 'hidden',
  },
  contentCard: {
    backgroundColor: theme.palette.white,
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
  },
  dateBox: {
    width: '100px',
    height: '100px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    backgroundColor: theme.palette.neutralLighter,
    borderRadius: '8px',
  },
  mapPreview: {
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    backgroundColor: '#e1e1e1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${theme.palette.neutralQuaternaryAlt}`,
  },
  attendeeAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    border: '2px solid white',
    marginLeft: '-8px',
    ':first-child': {
      marginLeft: 0,
    },
  },
});

const headerTokens: IStackTokens = { childrenGap: 24 };

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (id) {
      supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .maybeSingle()
        .then(({ data }) => setEvent(data));
    }
  }, [id]);

  if (!event) {
    return (
      <div className={styles.pageRoot}>
        <div className={styles.container}>
          <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: '80px 20px' } }}>
            <Icon iconName="EventDeclined" styles={{ root: { fontSize: 64, color: theme.palette.neutralTertiary, marginBottom: '16px' } }} />
            <Text variant="xLarge" styles={{ root: { fontWeight: 600, marginBottom: '16px', color: theme.palette.neutralPrimary } }}>
              Event not found
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

  const formatEventDate = (dateString: string) => {
    if (!dateString) {
      return { day: '--', month: 'N/A', year: '', time: 'TBD', fullDate: 'Date TBD' };
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return { day: '--', month: 'N/A', year: '', time: 'TBD', fullDate: 'Date TBD' };
    }

    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: date.getFullYear(),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      fullDate: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    };
  };

  const dateInfo = formatEventDate(event.event_date);

  const breadcrumbItems: IBreadcrumbItem[] = [
    { text: 'Home', key: 'home', onClick: () => navigate('/') },
    { text: 'Events', key: 'events' },
    { text: event.title, key: 'current', isCurrentItem: true },
  ];

  const mockAttendees = ['John D', 'Sarah M', 'Mike R', 'Emma W', 'Alex K'];

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
          <Stack tokens={headerTokens}>
            <Stack horizontal tokens={{ childrenGap: 32 }} verticalAlign="start">
              <div
                className={styles.dateBox}
                style={{
                  backgroundColor: theme.palette.themePrimary,
                  color: theme.palette.white,
                }}
              >
                <Text styles={{ root: { fontSize: '32px', fontWeight: 700, color: theme.palette.white, lineHeight: 1 } }}>
                  {dateInfo.day}
                </Text>
                <Text styles={{ root: { fontSize: '14px', fontWeight: 600, opacity: 0.9, marginTop: '8px', color: theme.palette.white } }}>
                  {dateInfo.month}
                </Text>
                <Text styles={{ root: { fontSize: '12px', fontWeight: 500, opacity: 0.8, marginTop: '4px', color: theme.palette.white } }}>
                  {dateInfo.year}
                </Text>
              </div>

              <Stack tokens={{ childrenGap: 16 }} styles={{ root: { flex: 1 } }}>
                <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  {event.title}
                </Text>

                <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary, lineHeight: '1.6' } }}>
                  {event.description}
                </Text>

                <Stack horizontal tokens={{ childrenGap: 12 }} wrap>
                  <PrimaryButton
                    iconProps={{ iconName: 'AddEvent' }}
                    text="RSVP"
                    onClick={() => alert('RSVP confirmed')}
                  />
                  <DefaultButton
                    iconProps={{ iconName: 'Calendar' }}
                    text="Add to Calendar"
                    onClick={() => alert('Added to calendar')}
                  />
                  <DefaultButton
                    iconProps={{ iconName: 'Share' }}
                    text="Share"
                    onClick={() => alert('Share event')}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>

        <Stack tokens={{ childrenGap: 24 }}>
          <div className={styles.contentCard}>
            <Stack tokens={{ childrenGap: 24 }}>
              <Stack tokens={{ childrenGap: 8 }}>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  Event Details
                </Text>
                <div style={{ width: '60px', height: '4px', backgroundColor: theme.palette.themePrimary, borderRadius: '2px' }} />
              </Stack>

              <Stack tokens={{ childrenGap: 16 }}>
                <div className={styles.metaItem}>
                  <Icon iconName="DateTime" styles={{ root: { fontSize: 20, color: theme.palette.themePrimary } }} />
                  <Stack tokens={{ childrenGap: 2 }}>
                    <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                      {dateInfo.fullDate}
                    </Text>
                    <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                      {dateInfo.time}
                    </Text>
                  </Stack>
                </div>

                <div className={styles.metaItem}>
                  <Icon iconName="POI" styles={{ root: { fontSize: 20, color: theme.palette.themePrimary } }} />
                  <Stack tokens={{ childrenGap: 2 }}>
                    <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                      {event.location}
                    </Text>
                    <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                      Click for directions
                    </Text>
                  </Stack>
                </div>

                <div className={styles.metaItem}>
                  <Icon iconName="People" styles={{ root: { fontSize: 20, color: theme.palette.themePrimary } }} />
                  <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center" styles={{ root: { flex: 1 } }}>
                    <Stack horizontal styles={{ root: { position: 'relative' } }}>
                      {mockAttendees.slice(0, 5).map((name, index) => (
                        <div key={index} className={styles.attendeeAvatar}>
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </Stack>
                    <Stack tokens={{ childrenGap: 2 }}>
                      <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                        {Math.floor(Math.random() * 50) + 20} people attending
                      </Text>
                      <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                        Including 5 from your team
                      </Text>
                    </Stack>
                  </Stack>
                </div>
              </Stack>
            </Stack>
          </div>

          <div className={styles.contentCard}>
            <Stack tokens={{ childrenGap: 24 }}>
              <Stack tokens={{ childrenGap: 8 }}>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  Location
                </Text>
                <div style={{ width: '60px', height: '4px', backgroundColor: theme.palette.themePrimary, borderRadius: '2px' }} />
              </Stack>

              <div className={styles.mapPreview}>
                <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }}>
                  <Icon iconName="MapPin" styles={{ root: { fontSize: 48, color: theme.palette.neutralTertiary } }} />
                  <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                    Map preview will be displayed here
                  </Text>
                </Stack>
              </div>

              <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  {event.location}
                </Text>
                <DefaultButton
                  iconProps={{ iconName: 'NavigateExternalInline' }}
                  text="Get Directions"
                  onClick={() => alert('Opening maps')}
                />
              </Stack>
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
}
