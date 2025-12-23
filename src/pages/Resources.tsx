import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Stack, Text, Icon, useTheme, mergeStyleSets, IStackTokens, SearchBox, ITheme } from '@fluentui/react';
import { supabase } from '../lib/supabase';
import { Document } from '../types/database';

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
  pageRoot: {
    backgroundColor: '#f3f2f1',
    minHeight: 'calc(100vh - 128px)',
    padding: '48px 24px',
  },
  container: {
    maxWidth: '1440px',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  card: {
    position: 'relative',
    padding: '20px',
    backgroundColor: theme.palette.white,
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    overflow: 'hidden',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    },
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    pointerEvents: 'none',
  },
  iconContainer: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginBottom: '16px',
  },
  fileTypeBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600,
  },
});

const headerTokens: IStackTokens = { childrenGap: 8 };
const cardContentTokens: IStackTokens = { childrenGap: 12 };
const metaTokens: IStackTokens = { childrenGap: 8 };

export default function Resources() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    supabase.from('documents').select('*').then(({ data }) => setDocuments(data || []));
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const getCategoryInfo = (category: string) => {
    const categoryMap: Record<string, { icon: string; color: string; bg: string }> = {
      policy: { icon: 'Shield', color: '#0078d4', bg: '#deecf9' },
      hr: { icon: 'People', color: '#107c10', bg: '#dff6dd' },
      it: { icon: 'ProcessMetaTask', color: '#8764b8', bg: '#f3f0f7' },
      finance: { icon: 'Money', color: '#d13438', bg: '#fde7e9' },
      general: { icon: 'Document', color: '#797775', bg: '#f3f2f1' },
    };
    return categoryMap[category?.toLowerCase()] || categoryMap.general;
  };

  return (
    <div className={styles.pageRoot}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <Stack tokens={headerTokens}>
            <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
              {t('nav.resources')}
            </Text>
            <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
              Access all company documents, policies, and resources in one place
            </Text>
          </Stack>
        </div>

        <div className={styles.filterBar}>
          <Stack horizontal verticalAlign="center" horizontalAlign="space-between" wrap>
            <SearchBox
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(_, newValue) => setSearchQuery(newValue || '')}
              styles={{ root: { width: 320 } }}
            />
            <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
              {filteredDocuments.length} {filteredDocuments.length === 1 ? 'document' : 'documents'} found
            </Text>
          </Stack>
        </div>

        <div className={styles.grid}>
          {filteredDocuments.map((doc) => {
            const fileType = getFileTypeFromUrl(doc.file_url);
            const fileColor = getFileTypeColor(fileType);
            const categoryInfo = getCategoryInfo(doc.category || 'general');
            return (
              <div
                key={doc.id}
                className={styles.card}
                onClick={() => navigate(`/document/${doc.id}`)}
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

                <Stack tokens={cardContentTokens} styles={{ root: { position: 'relative', zIndex: 1 } }}>
                  <div
                    className={styles.iconContainer}
                    style={{
                      background: `linear-gradient(135deg, ${fileColor}15 0%, ${fileColor}30 100%)`,
                      color: fileColor,
                    }}
                  >
                    <Icon iconName={getDocIcon(fileType)} styles={{ root: { fontSize: 28 } }} />
                  </div>

                  <Stack tokens={{ childrenGap: 6 }}>
                    <Text variant="large" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                      {doc.title}
                    </Text>
                    <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary, lineHeight: '1.5' } }}>
                      {doc.description}
                    </Text>
                  </Stack>

                  <Stack horizontal tokens={metaTokens} verticalAlign="center" wrap>
                    <div
                      className={styles.fileTypeBadge}
                      style={{
                        background: `linear-gradient(135deg, ${fileColor}20 0%, ${fileColor}35 100%)`,
                        color: fileColor,
                      }}
                    >
                      {fileType === 'document' ? 'DOC' : fileType.toUpperCase()}
                    </div>
                    <div
                      className={styles.categoryBadge}
                      style={{
                        backgroundColor: categoryInfo.bg,
                        color: categoryInfo.color,
                      }}
                    >
                      <Icon iconName={categoryInfo.icon} styles={{ root: { fontSize: 10 } }} />
                      {doc.category || 'General'}
                    </div>
                  </Stack>

                  <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { marginTop: '8px', paddingTop: '12px', borderTop: `1px solid ${theme.palette.neutralLighter}` } }}>
                    <Text variant="small" styles={{ root: { color: theme.palette.neutralTertiary, fontSize: '11px' } }}>
                      {new Date(doc.uploaded_at || doc.created_at || '').toLocaleDateString()}
                    </Text>
                    <Icon
                      iconName="Download"
                      styles={{
                        root: {
                          fontSize: 16,
                          color: theme.palette.themePrimary,
                        },
                      }}
                    />
                  </Stack>
                </Stack>
              </div>
            );
          })}
        </div>

        {filteredDocuments.length === 0 && (
          <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: '80px 20px', backgroundColor: theme.palette.white, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' } }}>
            <Icon iconName="SearchIssue" styles={{ root: { fontSize: 64, color: theme.palette.neutralTertiary, marginBottom: '16px' } }} />
            <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, marginBottom: '8px' } }}>
              No documents found
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
