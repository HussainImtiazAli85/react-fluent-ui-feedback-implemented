import { Stack, mergeStyles, mergeStyleSets, useTheme, IStackTokens } from '@fluentui/react';
import BannerSlider from '../components/BannerSlider';
import QuickLinks from '../components/QuickLinks';
import QuickAnnouncements from '../components/QuickAnnouncements';
import DashboardOverview from '../components/DashboardOverview';
import NewsAnnouncements from '../components/NewsAnnouncements';
import Events from '../components/Events';
import NewHires from '../components/NewHires';
import CEOMessage from '../components/CEOMessage';
import Documents from '../components/Documents';

const pageStyles = mergeStyleSets({
  root: {
    backgroundColor: '#f3f2f1',
    minHeight: '100vh',
    overflowX: 'hidden',
    width: '100%',
  },
  container: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '0 0',
    width: '100%',
    boxSizing: 'border-box',
  },
  sectionGray: {
    backgroundColor: '#f3f2f1',
    padding: '48px 0',
  },
  sectionWhite: {
    backgroundColor: '#fff',
    padding: '48px 0',
  },
});

const gridStyles = mergeStyles({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  '& > *': {
    minWidth: 0,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  '@media (max-width: 968px)': {
    gridTemplateColumns: '1fr',
  },
});

const containerTokens: IStackTokens = {
  childrenGap: 32,
};

export default function Home() {
  const theme = useTheme();

  return (
    <div className={pageStyles.root}>
      <BannerSlider />
      <QuickLinks />

      <div className={pageStyles.sectionGray}>
        <div className={pageStyles.container}>
          <div className={gridStyles}>
            <QuickAnnouncements />
            <Documents />
          </div>
        </div>
      </div>

      <div className={pageStyles.sectionWhite}>
        <div className={pageStyles.container}>
          <div className={gridStyles}>
            <DashboardOverview />
            <CEOMessage />
          </div>
        </div>
      </div>

      <NewsAnnouncements />

      <div className={pageStyles.sectionGray}>
        <div className={pageStyles.container}>
          <div className={gridStyles}>
            <Events />
            <NewHires />
          </div>
        </div>
      </div>
    </div>
  );
}
