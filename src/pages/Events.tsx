import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Event } from '../types/database';
import { Stack, Text, Icon, Spinner, SpinnerSize, useTheme, mergeStyleSets, IStackTokens } from '@fluentui/react';

const getStyles = (theme: any) => mergeStyleSets({
  pageContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    width: '100%',
  },
  card: {
    position: 'relative',
    padding: '24px',
    backgroundColor: theme.palette.white,
    borderRadius: '8px',
    boxShadow: '0 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.18)',
    },
  },
  verticalAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
  },
  dateBox: {
    width: '70px',
    height: '70px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  footer: {
    paddingTop: '12px',
  },
});

const headerTokens: IStackTokens = { childrenGap: 8 };
const cardTokens: IStackTokens = { childrenGap: 16 };
const eventHeaderTokens: IStackTokens = { childrenGap: 16 };
const eventDetailsTokens: IStackTokens = { childrenGap: 8 };
const metaTokens: IStackTokens = { childrenGap: 6 };

const dummyEvents: Event[] = [
  {
    id: 'dummy-1',
    title: 'Community Workshop',
    description: 'Join us for an interactive workshop designed to foster collaboration and skill development.',
    event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Main Conference Hall',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-2',
    title: 'Networking Event',
    description: 'Connect with colleagues across departments and build meaningful professional relationships.',
    event_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Rooftop Lounge',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-3',
    title: 'Team Building Activity',
    description: 'Strengthen team bonds through engaging activities and collaborative challenges.',
    event_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Outdoor Recreation Area',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-4',
    title: 'Annual Company Meeting',
    description: 'Join us for our annual company meeting to review achievements and set goals for the year ahead.',
    event_date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Grand Auditorium',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-5',
    title: 'Professional Development Workshop',
    description: 'Enhance your skills with expert-led sessions on the latest industry trends and best practices.',
    event_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Training Center',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-6',
    title: 'Holiday Celebration',
    description: 'Celebrate the season with your colleagues at our annual holiday party with food, music, and fun.',
    event_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Downtown Event Space',
    created_at: new Date().toISOString(),
  },
];

export default function Events() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })
      .then(({ data }) => {
        if (!data || data.length === 0) {
          setEvents(dummyEvents);
        } else {
          setEvents(data);
        }
        setLoading(false);
      });
  }, []);

  const formatEventDate = (dateString: string) => {
    if (!dateString) {
      return { day: '--', month: 'N/A', time: 'TBD' };
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return { day: '--', month: 'N/A', time: 'TBD' };
    }

    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    };
  };

  return (
    <div className={styles.pageContainer}>
      <Stack tokens={headerTokens} styles={{ root: { marginBottom: '32px' } }}>
        <Text
          variant="xxLarge"
          styles={{
            root: {
              fontWeight: 600,
              color: theme.palette.neutralPrimary,
            },
          }}
        >
          {t('events.title')}
        </Text>
        <Text
          variant="medium"
          styles={{
            root: {
              color: theme.palette.neutralSecondary,
            },
          }}
        >
          {t('events.subtitle')}
        </Text>
      </Stack>

      {loading ? (
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          styles={{ root: { padding: '60px 0' } }}
        >
          <Spinner size={SpinnerSize.large} label={t('common.loading')} />
        </Stack>
      ) : (
        <div className={styles.gridContainer}>
          {events.map((event) => {
            const isDummy = event.id.startsWith('dummy-');
            const dateInfo = formatEventDate(event.event_date);
            return (
              <Stack
                key={event.id}
                tokens={cardTokens}
                className={styles.card}
                onClick={() => !isDummy && navigate(`/event/${event.id}`)}
                onMouseEnter={(e) => {
                  if (!isDummy) {
                    e.currentTarget.style.borderColor = theme.palette.themePrimary;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.palette.neutralQuaternaryAlt;
                }}
                style={{
                  cursor: isDummy ? 'default' : 'pointer',
                  opacity: isDummy ? 0.85 : 1,
                }}
              >
                <div
                  className={styles.verticalAccent}
                  style={{ background: theme.palette.themePrimary }}
                />
                <Stack horizontal tokens={eventHeaderTokens} verticalAlign="start">
                  <div
                    className={styles.dateBox}
                    style={{
                      backgroundColor: theme.palette.themePrimary,
                      color: theme.palette.white,
                    }}
                  >
                    <Text
                      styles={{
                        root: {
                          fontSize: '26px',
                          fontWeight: 700,
                          color: theme.palette.white,
                        },
                      }}
                    >
                      {dateInfo.day}
                    </Text>
                    <Text
                      styles={{
                        root: {
                          fontSize: '12px',
                          fontWeight: 600,
                          opacity: 0.9,
                          marginTop: '4px',
                          color: theme.palette.white,
                        },
                      }}
                    >
                      {dateInfo.month}
                    </Text>
                  </div>
                  <Stack tokens={eventDetailsTokens} styles={{ root: { flex: 1 } }}>
                    <Text
                      variant="large"
                      styles={{
                        root: {
                          fontWeight: 600,
                          color: theme.palette.neutralPrimary,
                        },
                      }}
                    >
                      {event.title}
                    </Text>
                    <Stack tokens={metaTokens}>
                      <Stack
                        horizontal
                        tokens={{ childrenGap: 6 }}
                        verticalAlign="center"
                      >
                        <Icon
                          iconName="Clock"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: theme.palette.neutralSecondary,
                            },
                          }}
                        />
                        <Text
                          variant="small"
                          styles={{
                            root: {
                              color: theme.palette.neutralSecondary,
                              fontSize: '13px',
                            },
                          }}
                        >
                          {dateInfo.time}
                        </Text>
                      </Stack>
                      <Stack
                        horizontal
                        tokens={{ childrenGap: 6 }}
                        verticalAlign="center"
                      >
                        <Icon
                          iconName="POI"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: theme.palette.neutralSecondary,
                            },
                          }}
                        />
                        <Text
                          variant="small"
                          styles={{
                            root: {
                              color: theme.palette.neutralSecondary,
                              fontSize: '13px',
                            },
                          }}
                        >
                          {event.location}
                        </Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>

                <Stack tokens={{ childrenGap: 8 }}>
                  <Text
                    variant="small"
                    styles={{ root: { color: theme.palette.neutralSecondary } }}
                  >
                    {event.description}
                  </Text>
                  {isDummy && (
                    <Stack
                      horizontal
                      tokens={{ childrenGap: 6 }}
                      verticalAlign="center"
                      styles={{
                        root: {
                          padding: '6px 10px',
                          backgroundColor: theme.palette.neutralLighter,
                          borderRadius: '4px',
                          width: 'fit-content',
                        },
                      }}
                    >
                      <Icon
                        iconName="Info"
                        styles={{
                          root: {
                            fontSize: 12,
                            color: theme.palette.neutralSecondary,
                          },
                        }}
                      />
                      <Text
                        variant="tiny"
                        styles={{
                          root: {
                            color: theme.palette.neutralSecondary,
                            fontSize: '10px',
                          },
                        }}
                      >
                        Placeholder Event
                      </Text>
                    </Stack>
                  )}
                </Stack>

                <Stack
                  horizontal
                  horizontalAlign="end"
                  verticalAlign="center"
                  className={styles.footer}
                  styles={{
                    root: { borderTop: `1px solid ${theme.palette.neutralLighter}` },
                  }}
                >
                  {!isDummy ? (
                    <Text
                      variant="small"
                      styles={{
                        root: {
                          color: theme.palette.themePrimary,
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        },
                      }}
                    >
                      {t('events.learnMore')}{' '}
                      <Icon
                        iconName="ChevronRight"
                        styles={{ root: { fontSize: '10px' } }}
                      />
                    </Text>
                  ) : (
                    <Text
                      variant="small"
                      styles={{
                        root: {
                          color: theme.palette.neutralTertiary,
                          fontWeight: 500,
                          fontStyle: 'italic',
                        },
                      }}
                    >
                      Coming soon
                    </Text>
                  )}
                </Stack>
              </Stack>
            );
          })}
        </div>
      )}
    </div>
  );
}
