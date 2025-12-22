import { Stack, Text, Icon, mergeStyles, useTheme } from '@fluentui/react';
import { useTranslation } from 'react-i18next';

const cardStyles = mergeStyles({
  padding: '24px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  border: '1px solid #edebe9',
  transition: 'all 0.2s ease',
  ':hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-2px)',
  },
});

const statCardStyles = (gradient: string) => mergeStyles({
  padding: '20px',
  borderRadius: '8px',
  background: gradient,
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    transform: 'scale(1.02)',
  },
  ':after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '150px',
    height: '150px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
  },
});

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: string;
  gradient: string;
  trend: 'up' | 'down';
}

const stats: Stat[] = [
  {
    title: 'Active Projects',
    value: '24',
    change: '+12%',
    icon: 'Projects',
    gradient: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
    trend: 'up',
  },
  {
    title: 'Team Members',
    value: '156',
    change: '+8%',
    icon: 'People',
    gradient: 'linear-gradient(135deg, #107c10 0%, #0d5f0d 100%)',
    trend: 'up',
  },
  {
    title: 'Pending Tasks',
    value: '42',
    change: '-15%',
    icon: 'TaskList',
    gradient: 'linear-gradient(135deg, #8764b8 0%, #6b4d9c 100%)',
    trend: 'down',
  },
  {
    title: 'Completed',
    value: '189',
    change: '+23%',
    icon: 'CheckMark',
    gradient: 'linear-gradient(135deg, #00a4ef 0%, #0086c7 100%)',
    trend: 'up',
  },
];

export default function DashboardOverview() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack tokens={{ childrenGap: 24 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack tokens={{ childrenGap: 8 }}>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, fontSize: '28px' } }}>
            {t('dashboardOverview.title')}
          </Text>
          {/* <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
            {t('dashboardOverview.subtitle')}
          </Text> */}
        </Stack>
        <a
          href="#"
          className='view-all-detail'
          style={{
            color: theme.palette.themePrimary,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {t('dashboardOverview.viewDetails')} <Icon iconName="ChevronRight" styles={{ root: { fontSize: '12px' } }} />
        </a>
      </Stack>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {stats.map((stat, index) => (
          <div key={index} className={statCardStyles(stat.gradient)}>
            <Stack tokens={{ childrenGap: 12 }} styles={{ root: { position: 'relative', zIndex: 1 } }}>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Icon iconName={stat.icon} styles={{ root: { fontSize: 28, color: '#fff' } }} />
                <Stack horizontal tokens={{ childrenGap: 4 }} verticalAlign="center">
                  <Icon
                    iconName={stat.trend === 'up' ? 'Up' : 'Down'}
                    styles={{ root: { fontSize: 14, color: '#fff' } }}
                  />
                  <Text variant="small" styles={{ root: { color: '#fff', fontWeight: 600 } }}>
                    {stat.change}
                  </Text>
                </Stack>
              </Stack>
              <Text variant="xxLarge" styles={{ root: { color: '#fff', fontWeight: 700, fontSize: '32px' } }}>
                {stat.value}
              </Text>
              <Text variant="medium" styles={{ root: { color: 'rgba(255, 255, 255, 0.9)' } }}>
                {t(`dashboardOverview.${stat.title.toLowerCase().replace(/\s+/g, '')}`)}
              </Text>
            </Stack>
          </div>
        ))}
      </div>
    </Stack>
  );
}
