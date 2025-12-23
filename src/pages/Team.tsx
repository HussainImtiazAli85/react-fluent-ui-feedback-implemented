import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { NewHire } from '../types/database';
import { Stack, Text, Persona, PersonaSize, Icon, Spinner, SpinnerSize, useTheme, mergeStyleSets, IStackTokens, ITheme } from '@fluentui/react';

const getStyles = (theme: ITheme) => mergeStyleSets({
  pageContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '20px',
    width: '100%',
  },
  card: {
    padding: '24px',
    backgroundColor: theme.palette.white,
    borderRadius: '8px',
    boxShadow: '0 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    textAlign: 'center',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.18)',
    },
  },
  avatarWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  badge: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '28px',
    height: '28px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  joinedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#e7f3ff',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
  },
});

const headerTokens: IStackTokens = { childrenGap: 8 };
const cardTokens: IStackTokens = { childrenGap: 14 };
const infoTokens: IStackTokens = { childrenGap: 4 };

const dummyHires: NewHire[] = [
  {
    id: 'dummy-1',
    name: 'Sarah Johnson',
    position: 'Senior Product Designer',
    department: 'Product & Design',
    start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    photo_url: '',
    bio: 'Passionate about creating intuitive user experiences and design systems that scale.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-2',
    name: 'Michael Chen',
    position: 'Full Stack Developer',
    department: 'Engineering',
    start_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    photo_url: '',
    bio: 'Experienced in building scalable web applications with modern frameworks and cloud technologies.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-3',
    name: 'Emma Rodriguez',
    position: 'Marketing Manager',
    department: 'Marketing & Communications',
    start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    photo_url: '',
    bio: 'Driving brand growth through data-driven strategies and creative storytelling.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-4',
    name: 'James Wilson',
    position: 'DevOps Engineer',
    department: 'Engineering',
    start_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    photo_url: '',
    bio: 'Specializing in cloud infrastructure and continuous deployment pipelines.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-5',
    name: 'Olivia Brown',
    position: 'HR Business Partner',
    department: 'Human Resources',
    start_date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    photo_url: '',
    bio: 'Committed to building inclusive workplace cultures and supporting employee growth.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-6',
    name: 'Liam Martinez',
    position: 'Sales Executive',
    department: 'Sales',
    start_date: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    photo_url: '',
    bio: 'Building strong client relationships and driving revenue growth.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-7',
    name: 'Sophia Davis',
    position: 'UX Researcher',
    department: 'Product & Design',
    start_date: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    photo_url: '',
    bio: 'Uncovering user insights that drive product innovation.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'dummy-8',
    name: 'Noah Anderson',
    position: 'Financial Analyst',
    department: 'Finance',
    start_date: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
    photo_url: '',
    bio: 'Providing strategic financial insights for business growth.',
    created_at: new Date().toISOString(),
  },
];

export default function Team() {
  const { t } = useTranslation();
  const [hires, setHires] = useState<NewHire[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    supabase
      .from('new_hires')
      .select('*')
      .order('start_date', { ascending: false })
      .then(({ data }) => {
        if (!data || data.length === 0) {
          setHires(dummyHires);
        } else {
          setHires(data);
        }
        setLoading(false);
      });
  }, []);

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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
          {t('newHires.title')}
        </Text>
        <Text
          variant="medium"
          styles={{
            root: {
              color: theme.palette.neutralSecondary,
            },
          }}
        >
          {t('newHires.subtitle')}
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
          {hires.map((hire) => {
            const isDummy = hire.id.startsWith('dummy-');
            return (
              <Stack
                key={hire.id}
                horizontalAlign="center"
                tokens={cardTokens}
                className={styles.card}
                onClick={() => !isDummy && navigate(`/employee/${hire.id}`)}
                onMouseEnter={(e) => {
                  if (!isDummy) {
                    e.currentTarget.style.borderColor = theme.palette.themePrimary;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.palette.neutralQuaternaryAlt;
                }}
                style={{
                  cursor: isDummy ? 'default' : 'pointer',
                  opacity: isDummy ? 0.85 : 1,
                }}
              >
                <div className={styles.avatarWrapper}>
                  <Persona
                    text={hire.name}
                    size={PersonaSize.size72}
                    hidePersonaDetails
                    styles={{
                      root: {
                        '& .ms-Persona-initials': {
                          background:
                            'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
                          fontSize: '28px',
                          fontWeight: 600,
                        },
                      },
                    }}
                  />
                  <div className={styles.badge}>
                    <Icon
                      iconName="Sparkle"
                      styles={{ root: { color: '#ffd700', fontSize: 14 } }}
                    />
                  </div>
                </div>

                <Stack horizontalAlign="center" tokens={infoTokens}>
                  <Text
                    variant="medium"
                    styles={{
                      root: {
                        fontWeight: 600,
                        color: theme.palette.neutralPrimary,
                      },
                    }}
                  >
                    {hire.name}
                  </Text>
                  <Text
                    variant="small"
                    styles={{
                      root: {
                        fontWeight: 500,
                        color: theme.palette.themePrimary,
                      },
                    }}
                  >
                    {hire.position}
                  </Text>
                  <Text
                    variant="small"
                    styles={{
                      root: {
                        color: theme.palette.neutralSecondary,
                        fontSize: '12px',
                      },
                    }}
                  >
                    {hire.department}
                  </Text>
                </Stack>

                <div
                  className={styles.joinedBadge}
                  style={{ color: theme.palette.themePrimary }}
                >
                  <Icon
                    iconName="Calendar"
                    styles={{ root: { fontSize: 12 } }}
                  />
                  {t('newHires.joined')} {formatJoinDate(hire.start_date)}
                </div>

                <Text
                  variant="small"
                  styles={{
                    root: {
                      color: theme.palette.neutralSecondary,
                      fontSize: '12px',
                      lineHeight: '18px',
                    },
                  }}
                >
                  {hire.bio || t('newHires.welcome')}
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
                        marginTop: '4px',
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
                      Sample Profile
                    </Text>
                  </Stack>
                )}
              </Stack>
            );
          })}
        </div>
      )}
    </div>
  );
}
