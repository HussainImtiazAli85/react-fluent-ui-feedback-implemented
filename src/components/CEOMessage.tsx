import { Stack, Text, Icon, mergeStyles, useTheme } from '@fluentui/react';
import { useTranslation } from 'react-i18next';

const cardStyles = mergeStyles({
  padding: '40px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  border: '1px solid #edebe9',
  position: 'relative',
  overflow: 'hidden',
});

const quoteStyles = mergeStyles({
  fontSize: '64px',
  color: '#0078d4',
  opacity: 0.08,
  position: 'absolute',
  top: '20px',
  left: '30px',
  lineHeight: 1,
  fontWeight: 700,
});

export default function CEOMessage() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack tokens={{ childrenGap: 24 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack tokens={{ childrenGap: 8 }}>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, fontSize: '28px' } }}>
            {t('ceoMessage.title')}
          </Text>
          {/* <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
            {t('ceoMessage.subtitle')}
          </Text> */}
        </Stack>
      </Stack>

      <div className={cardStyles}>
        <div className={quoteStyles}>"</div>
        <Stack tokens={{ childrenGap: 28 }} styles={{ root: { position: 'relative', zIndex: 1 } }}>
          <Stack horizontal tokens={{ childrenGap: 24 }} verticalAlign="center" wrap>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundImage: 'url(https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              border: '4px solid #fff',
              flexShrink: 0,
            }}>
            </div>
            <Stack tokens={{ childrenGap: 4 }} styles={{ root: { flex: 1 } }}>
              <Text variant="xLarge" styles={{ root: { fontWeight: 700, color: theme.palette.neutralPrimary, fontSize: '24px' } }}>
                {t('ceoMessage.name')}
              </Text>
              <Text variant="large" styles={{ root: { color: theme.palette.themePrimary, fontWeight: 600, fontSize: '15px' } }}>
                {t('ceoMessage.position')}
              </Text>
            </Stack>
          </Stack>

          <Stack tokens={{ childrenGap: 20 }}>
            <Text
              variant="large"
              styles={{
                root: {
                  color: theme.palette.neutralPrimary,
                  //lineHeight: 1.8,
                  fontSize: '17px',
                  fontStyle: 'italic',
                  fontWeight: 500,
                },
              }}
            >
              "{t('ceoMessage.quote')}"
            </Text>

            {/* <Text
              variant="medium"
              styles={{
                root: {
                  color: theme.palette.neutralSecondary,
                  lineHeight: 1.8,
                  fontSize: '15px',
                },
              }}
            >
              {t('ceoMessage.paragraph1')}
            </Text> */}

            <Text
              variant="medium"
              styles={{
                root: {
                  color: theme.palette.neutralSecondary,
                  //lineHeight: 1.8,
                  fontSize: '15px',
                },
              }}
            >
              {t('ceoMessage.paragraph2')}
            </Text>
          </Stack>

          {/* <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
            borderRadius: '10px',
            color: '#fff',
          }}>
            <Stack tokens={{ childrenGap: 16 }}>
              <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                <Icon iconName="Lightbulb" styles={{ root: { fontSize: 26, color: '#fff' } }} />
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: '#fff' } }}>
                  {t('ceoMessage.keyFocus')}
                </Text>
              </Stack>
              <Stack tokens={{ childrenGap: 12 }} styles={{ root: { paddingLeft: '36px' } }}>
                <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="start">
                  <Icon iconName="CheckMark" styles={{ root: { fontSize: 16, color: '#fff', marginTop: '3px' } }} />
                  <Text variant="medium" styles={{ root: { color: '#fff', lineHeight: 1.6 } }}>
                    {t('ceoMessage.focus1')}
                  </Text>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="start">
                  <Icon iconName="CheckMark" styles={{ root: { fontSize: 16, color: '#fff', marginTop: '3px' } }} />
                  <Text variant="medium" styles={{ root: { color: '#fff', lineHeight: 1.6 } }}>
                    {t('ceoMessage.focus2')}
                  </Text>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="start">
                  <Icon iconName="CheckMark" styles={{ root: { fontSize: 16, color: '#fff', marginTop: '3px' } }} />
                  <Text variant="medium" styles={{ root: { color: '#fff', lineHeight: 1.6 } }}>
                    {t('ceoMessage.focus3')}
                  </Text>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="start">
                  <Icon iconName="CheckMark" styles={{ root: { fontSize: 16, color: '#fff', marginTop: '3px' } }} />
                  <Text variant="medium" styles={{ root: { color: '#fff', lineHeight: 1.6 } }}>
                    {t('ceoMessage.focus4')}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </div> */}

        
        </Stack>
      </div>
    </Stack>
  );
}
