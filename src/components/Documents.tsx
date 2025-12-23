import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Document } from '../types/database';
import { Stack, Text, Icon, useTheme, mergeStyleSets, IStackTokens, Link as FluentLink, ITheme } from '@fluentui/react';

const getFileTypeFromUrl = (url?: string | null) => {
  const value = (url || '').trim();
  const ext = value.includes('.') ? value.split('.').pop()!.toLowerCase() : '';
  if (ext === 'pdf') return 'pdf';
  if (ext === 'doc' || ext === 'docx') return 'word';
  if (ext === 'xls' || ext === 'xlsx') return 'excel';
  if (ext === 'ppt' || ext === 'pptx') return 'powerpoint';
  if (ext === 'txt') return 'text';
  return 'document';
};

const getDocIcon = (fileType: string) => {
  const iconMap: Record<string, string> = {
    pdf: 'PDF',
    word: 'WordDocument',
    excel: 'ExcelDocument',
    powerpoint: 'PowerPointDocument',
    text: 'TextDocument',
  };
  return iconMap[fileType?.toLowerCase()] || 'Document';
};

const getStyles = (theme: ITheme) => mergeStyleSets({
  container: {
    backgroundColor: theme.palette.white,
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    height: '93%',
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '4px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#0078d4 #f3f2f1',
  },
  card: {
    position: 'relative',
    padding: '16px',
    backgroundColor: theme.palette.white,
    borderRadius: '8px',
    boxShadow: '0 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    overflow: 'hidden',
    ':hover': {
      transform: 'translateX(4px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80px',
    height: '80px',
    pointerEvents: 'none',
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  fileTypeBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
});

const headerTokens: IStackTokens = { childrenGap: 4 };
const cardTokens: IStackTokens = { childrenGap: 12 };
const contentTokens: IStackTokens = { childrenGap: 6 };
const badgeTokens: IStackTokens = { childrenGap: 8 };

export default function Documents() {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState<Document[]>([]);
  const theme = useTheme();
  const styles = getStyles(theme);

    useEffect(() => {
      supabase.from('documents').select('*').limit(3).then(({ data }) => setDocuments(data || []));
    }, []);

  const getFileTypeColor = (fileType: string) => {
    const colorMap: Record<string, string> = {
      pdf: '#d32f2f',
      word: '#1976d2',
      excel: '#388e3c',
      powerpoint: '#f57c00',
      text: '#7b1fa2',
    };
    return colorMap[fileType?.toLowerCase()] || theme.palette.themePrimary;
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} className={styles.container}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack tokens={headerTokens}>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, fontSize: '24px' } }}>
            {t('documents.title')}
          </Text>
          <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
            {t('documents.subtitle')}
          </Text>
        </Stack>
        <Link to="/resources" style={{ textDecoration: 'none' }} className="view-all-link">
          <FluentLink styles={{ root: { fontSize: '13px', fontWeight: 600 } }}>
            {t('documents.viewAll')} <Icon iconName="ChevronRight" styles={{ root: { fontSize: 10, marginLeft: '2px' } }} />
          </FluentLink>
        </Link>
      </Stack>

      <div className={styles.scrollContainer}>
        {documents.slice(0, 3).map((doc) => {
          const fileType = getFileTypeFromUrl(doc.file_url);
          const fileColor = getFileTypeColor(fileType);
          return (
            <Stack
              key={doc.id}
              horizontal
              tokens={cardTokens}
              verticalAlign="start"
              className={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = fileColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.palette.neutralQuaternaryAlt;
              }}
            >
              <div
                className={styles.backgroundGradient}
                style={{
                  background: `radial-gradient(circle at top right, ${fileColor}10 0%, transparent 70%)`,
                }}
              />
              <div
                className={styles.iconContainer}
                style={{
                  background: `linear-gradient(135deg, ${fileColor}15 0%, ${fileColor}25 100%)`,
                  color: fileColor,
                }}
              >
                <Icon iconName={getDocIcon(fileType)} styles={{ root: { fontSize: 24 } }} />
              </div>

              <Stack tokens={contentTokens} styles={{ root: { flex: 1, position: 'relative', zIndex: 1 } }}>
                <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  {doc.title}
                </Text>
                <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary, fontSize: '13px' } }}>
                  {doc.description}
                </Text>
                <Stack horizontal tokens={badgeTokens} verticalAlign="center" styles={{ root: { marginTop: '4px' } }}>
                  <div
                    className={styles.fileTypeBadge}
                    style={{
                      background: `linear-gradient(135deg, ${fileColor}15 0%, ${fileColor}25 100%)`,
                      color: fileColor,
                    }}
                  >
                    {fileType === 'document' ? 'DOC' : fileType.toUpperCase()}
                  </div>
                </Stack>
              </Stack>

              <Icon
                iconName="Download"
                styles={{
                  root: {
                    fontSize: 16,
                    color: theme.palette.themePrimary,
                    flexShrink: 0,
                  },
                }}
              />
            </Stack>
          );
        })}
      </div>
    </Stack>
  );
}
