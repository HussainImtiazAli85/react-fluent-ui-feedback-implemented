import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { NewHire } from '../types/database';
import { Stack, Text, Persona, PersonaSize, Icon, Link, useTheme, mergeStyleSets, IStackTokens, ITheme } from '@fluentui/react';

const getStyles = (theme: ITheme) => mergeStyleSets({
  container: {
    backgroundColor: theme.palette.white,
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    height: '100%',
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px',
    width: '100%',
  },
  card: {
    padding: '20px',
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
    width: '24px',
    height: '24px',
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
    gap: '4px',
    padding: '4px 10px',
    backgroundColor: '#e7f3ff',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600,
  },
});

const headerTokens: IStackTokens = { childrenGap: 4 };
const cardTokens: IStackTokens = { childrenGap: 12 };
const infoTokens: IStackTokens = { childrenGap: 2 };

// const dummyHires: NewHire[] = [
//   {
//     id: 'dummy-1',
//     name: 'Sarah Johnson',
//     position: 'Senior Product Designer',
//     department: 'Product & Design',
//     start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
//     bio: 'Passionate about creating intuitive user experiences and design systems that scale.',
//     created_at: new Date().toISOString(),
//   },
//   {
//     id: 'dummy-2',
//     name: 'Michael Chen',
//     position: 'Full Stack Developer',
//     department: 'Engineering',
//     start_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
//     bio: 'Experienced in building scalable web applications with modern frameworks and cloud technologies.',
//     created_at: new Date().toISOString(),
//   },
//   {
//     id: 'dummy-3',
//     name: 'Emma Rodriguez',
//     position: 'Marketing Manager',
//     department: 'Marketing & Communications',
//     start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
//     bio: 'Driving brand growth through data-driven strategies and creative storytelling.',
//     created_at: new Date().toISOString(),
//   },
// ];

export default function NewHires() {
  const { t } = useTranslation();
  const [hires, setHires] = useState<NewHire[]>([]);
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from('new_hires').select('*').order('start_date', { ascending: false }).limit(2).then(({ data }) => {
      if (!data || data.length === 0) {
        setHires([].slice(0, 4));
      } else {
        setHires(data);
      }
    });
  }, []);

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} className={styles.container}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack tokens={headerTokens}>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, fontSize: '24px' } }}>
            {t('newHires.title')}
          </Text>
          <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
            {t('newHires.subtitle')}
          </Text>
        </Stack>
        <Link
          onClick={() => navigate('/team')}
          styles={{
            root: {
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            },
          }}
        className="view-all-link"
        >
          {t('newHires.viewAll')} <Icon iconName="ChevronRight" styles={{ root: { fontSize: '12px' } }} />
        </Link>
      </Stack>

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
                  e.currentTarget.style.borderColor = theme.palette.neutralQuaternaryAlt;
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
                        background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
                        fontSize: '28px',
                        fontWeight: 600,
                      },
                    },
                  }}
                />
                <div className={styles.badge}>
                  <Icon iconName="FavoriteStar" styles={{ root: { color: '#ffd700', fontSize: 12 } }} />
                </div>
              </div>

              <Stack horizontalAlign="center" tokens={infoTokens}>
                <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  {hire.name}
                </Text>
                <Text variant="small" styles={{ root: { fontWeight: 500, color: theme.palette.themePrimary } }}>
                  {hire.position}
                </Text>
                <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary, fontSize: '11px' } }}>
                  {hire.department}
                </Text>
              </Stack>

              <div
                className={styles.joinedBadge}
                style={{ color: theme.palette.themePrimary }}
              >
                <Icon iconName="Calendar" styles={{ root: { fontSize: 11 } }} />
                {t('newHires.joined')} {formatJoinDate(hire.start_date)}
              </div>

              <Text
                variant="small"
                styles={{
                  root: {
                    color: theme.palette.neutralSecondary,
                    fontSize: '11px',
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
                  <Icon iconName="Info" styles={{ root: { fontSize: 12, color: theme.palette.neutralSecondary } }} />
                  <Text variant="tiny" styles={{ root: { color: theme.palette.neutralSecondary, fontSize: '10px' } }}>
                    Sample Profile
                  </Text>
                </Stack>
              )}
            </Stack>
            );
          })}
      </div>
    </Stack>
  );
}
