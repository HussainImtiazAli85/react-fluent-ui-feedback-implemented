import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Text, Icon, IconButton, useTheme, mergeStyleSets, IStackTokens, Breadcrumb, IBreadcrumbItem, PrimaryButton, DefaultButton, ITheme } from '@fluentui/react';
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
    maxWidth: '1000px',
    margin: '0 auto',
  },
  headerCard: {
    backgroundColor: theme.palette.white,
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    marginBottom: '24px',
  },
  contentCard: {
    backgroundColor: theme.palette.white,
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
  },
  iconContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badge: {
    padding: '6px 14px',
    borderRadius: '16px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: theme.palette.neutralLighter,
    borderRadius: '8px',
  },
  previewBox: {
    padding: '24px',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    border: `2px dashed ${theme.palette.neutralQuaternaryAlt}`,
    textAlign: 'center',
  },
});

const headerTokens: IStackTokens = { childrenGap: 24 };

export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (id) {
      supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .maybeSingle()
        .then(({ data }) => setDocument(data));
    }
  }, [id]);

  if (!document) {
    return (
      <div className={styles.pageRoot}>
        <div className={styles.container}>
          <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: '80px 20px' } }}>
            <Icon iconName="DocumentSearch" styles={{ root: { fontSize: 64, color: theme.palette.neutralTertiary, marginBottom: '16px' } }} />
            <Text variant="xLarge" styles={{ root: { fontWeight: 600, marginBottom: '16px', color: theme.palette.neutralPrimary } }}>
              Document not found
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

  const fileType = getFileTypeFromUrl(document.file_url);
  const fileColor = getFileTypeColor(fileType);
  const categoryInfo = getCategoryInfo(document.category || 'general');

  const breadcrumbItems: IBreadcrumbItem[] = [
    { text: 'Home', key: 'home', onClick: () => navigate('/') },
    { text: 'Resources', key: 'resources', onClick: () => navigate('/resources') },
    { text: document.title, key: 'current', isCurrentItem: true },
  ];

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
            <Stack horizontal tokens={{ childrenGap: 24 }} verticalAlign="center">
              <div
                className={styles.iconContainer}
                style={{
                  background: `linear-gradient(135deg, ${fileColor}20 0%, ${fileColor}40 100%)`,
                  color: fileColor,
                }}
              >
                <Icon iconName={getDocIcon(fileType)} styles={{ root: { fontSize: 40 } }} />
              </div>

              <Stack tokens={{ childrenGap: 12 }} styles={{ root: { flex: 1 } }}>
                <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center" wrap>
                  <div
                    className={styles.badge}
                    style={{
                      background: `linear-gradient(135deg, ${fileColor}25 0%, ${fileColor}40 100%)`,
                      color: fileColor,
                    }}
                  >
                    {fileType === 'document' ? 'DOC' : fileType.toUpperCase()}
                  </div>
                  <div
                    className={styles.badge}
                    style={{
                      backgroundColor: categoryInfo.bg,
                      color: categoryInfo.color,
                    }}
                  >
                    <Icon iconName={categoryInfo.icon} styles={{ root: { fontSize: 10, marginRight: '4px' } }} />
                    {document.category || 'General'}
                  </div>
                </Stack>

                <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  {document.title}
                </Text>

                <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary, lineHeight: '1.6' } }}>
                  {document.description}
                </Text>

                <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
                  <div className={styles.metaItem}>
                    <Icon iconName="Calendar" styles={{ root: { fontSize: 14, color: theme.palette.themePrimary } }} />
                    <Text variant="small" styles={{ root: { fontWeight: 500 } }}>
                      {new Date(document.uploaded_at || document.created_at || '').toLocaleDateString()}
                    </Text>
                  </div>
                  <div className={styles.metaItem}>
                    <Icon iconName="View" styles={{ root: { fontSize: 14, color: theme.palette.themePrimary } }} />
                    <Text variant="small" styles={{ root: { fontWeight: 500 } }}>
                      {Math.floor(Math.random() * 500) + 100} views
                    </Text>
                  </div>
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 12 }}>
                  <PrimaryButton
                    iconProps={{ iconName: 'Download' }}
                    text="Download"
                    onClick={() => alert('Download initiated')}
                  />
                  <DefaultButton
                    iconProps={{ iconName: 'Share' }}
                    text="Share"
                    onClick={() => alert('Share dialog')}
                  />
                  <DefaultButton
                    iconProps={{ iconName: 'Print' }}
                    text="Print"
                    onClick={() => alert('Print dialog')}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>

        <div className={styles.contentCard}>
          <Stack tokens={{ childrenGap: 24 }}>
            <Stack tokens={{ childrenGap: 8 }}>
              <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                Preview
              </Text>
              <div style={{ width: '60px', height: '4px', backgroundColor: theme.palette.themePrimary, borderRadius: '2px' }} />
            </Stack>

            <div className={styles.previewBox}>
              <Icon iconName="DocumentSearch" styles={{ root: { fontSize: 48, color: theme.palette.neutralTertiary, marginBottom: '16px' } }} />
              <Text variant="large" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, marginBottom: '8px' } }}>
                Document Preview
              </Text>
              <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                Preview will be displayed here once the document viewer is integrated
              </Text>
            </div>

            <Stack tokens={{ childrenGap: 16 }}>
              <Text variant="large" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                Additional Information
              </Text>
              <Stack tokens={{ childrenGap: 12 }}>
                <Stack horizontal horizontalAlign="space-between">
                  <Text variant="medium" styles={{ root: { fontWeight: 500, color: theme.palette.neutralSecondary } }}>
                    Document Type:
                  </Text>
                  <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary } }}>
                    {fileType === 'document' ? 'DOC' : fileType.toUpperCase()}
                  </Text>
                </Stack>
                <Stack horizontal horizontalAlign="space-between">
                  <Text variant="medium" styles={{ root: { fontWeight: 500, color: theme.palette.neutralSecondary } }}>
                    Category:
                  </Text>
                  <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary } }}>
                    {document.category || 'General'}
                  </Text>
                </Stack>
                <Stack horizontal horizontalAlign="space-between">
                  <Text variant="medium" styles={{ root: { fontWeight: 500, color: theme.palette.neutralSecondary } }}>
                    Last Modified:
                  </Text>
                  <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary } }}>
                    {new Date(document.uploaded_at || document.created_at || '').toLocaleDateString()}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
}
