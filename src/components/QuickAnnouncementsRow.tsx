import QuickAnnouncements from './QuickAnnouncements';
import { mergeStyles, useTheme } from '@fluentui/react';

export default function QuickAnnouncementsRow() {
  const theme = useTheme();
  return (
    <div
      className={mergeStyles({
        width: '100%',
      //  background: theme.palette.white,
        //borderRadius: 12,
        //boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        //border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
        margin: '4px 0',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        minHeight: 120,
      })}
    >
      <div style={{ flex: 1, width: '100%' }}>
        <QuickAnnouncements />
      </div>
    </div>
  );
}