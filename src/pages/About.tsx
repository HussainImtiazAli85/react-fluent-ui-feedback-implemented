import { Stack, Text, Icon, mergeStyles, useTheme } from '@fluentui/react';

const sectionStyles = mergeStyles({
  padding: '48px 24px',
});

const containerStyles = mergeStyles({
  maxWidth: '1280px',
  margin: '0 auto',
});

const heroStyles = mergeStyles({
  padding: '80px 24px',
  background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
  color: '#fff',
  textAlign: 'center',
});

const cardStyles = mergeStyles({
  padding: '32px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 3.2px 7.2px 0 rgba(0,0,0,.132)',
});

const iconBoxStyles = mergeStyles({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#deecf9',
  color: '#0078d4',
  marginBottom: '16px',
});

export default function About() {
  const theme = useTheme();

  return (
    <div>
      <div className={heroStyles}>
        <div className={containerStyles}>
          <Text variant="xxLarge" styles={{ root: { fontWeight: 700, marginBottom: '16px', display: 'block' } }}>
            About Our Company
          </Text>
          <Text variant="large" styles={{ root: { maxWidth: '800px', margin: '0 auto', opacity: 0.95 } }}>
            Building the future together through innovation, collaboration, and excellence
          </Text>
        </div>
      </div>

      <section className={sectionStyles} style={{ backgroundColor: '#faf9f8' }}>
        <div className={containerStyles}>
          <Stack tokens={{ childrenGap: 48 }}>
            <Stack tokens={{ childrenGap: 16 }}>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                Our Mission
              </Text>
              <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary, lineHeight: 1.6 } }}>
                We are dedicated to delivering exceptional solutions that empower businesses and individuals to achieve their goals.
                Through innovation, integrity, and collaboration, we create lasting value for our clients, employees, and communities.
              </Text>
            </Stack>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div className={cardStyles}>
                <div className={iconBoxStyles}>
                  <Icon iconName="Lightbulb" styles={{ root: { fontSize: 32 } }} />
                </div>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, marginBottom: '12px', display: 'block' } }}>
                  Innovation
                </Text>
                <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  We embrace cutting-edge technologies and creative thinking to solve complex challenges and drive progress.
                </Text>
              </div>

              <div className={cardStyles}>
                <div className={iconBoxStyles}>
                  <Icon iconName="People" styles={{ root: { fontSize: 32 } }} />
                </div>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, marginBottom: '12px', display: 'block' } }}>
                  Collaboration
                </Text>
                <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  Our success is built on teamwork, open communication, and the collective expertise of our talented team.
                </Text>
              </div>

              <div className={cardStyles}>
                <div className={iconBoxStyles}>
                  <Icon iconName="FavoriteStarFill" styles={{ root: { fontSize: 32 } }} />
                </div>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, marginBottom: '12px', display: 'block' } }}>
                  Excellence
                </Text>
                <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  We are committed to the highest standards of quality in everything we do, from products to customer service.
                </Text>
              </div>
            </div>
          </Stack>
        </div>
      </section>

      <section className={sectionStyles}>
        <div className={containerStyles}>
          <Stack tokens={{ childrenGap: 32 }}>
            <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
              Our Story
            </Text>
            <Stack tokens={{ childrenGap: 16 }}>
              <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary, lineHeight: 1.6 } }}>
                Founded with a vision to transform the industry, our company has grown from a small startup to a leading
                organization serving clients worldwide. Our journey has been marked by continuous innovation, strategic
                partnerships, and an unwavering commitment to excellence.
              </Text>
              <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary, lineHeight: 1.6 } }}>
                Today, we are proud to have a diverse team of experts working together to deliver solutions that make a
                real difference. Our culture fosters creativity, encourages learning, and celebrates success at every level.
              </Text>
            </Stack>
          </Stack>
        </div>
      </section>

      <section className={sectionStyles} style={{ backgroundColor: '#faf9f8' }}>
        <div className={containerStyles}>
          <Stack tokens={{ childrenGap: 32 }}>
            <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, textAlign: 'center' } }}>
              By the Numbers
            </Text>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
              <div>
                <Text variant="mega" styles={{ root: { fontWeight: 700, color: theme.palette.themePrimary, display: 'block', marginBottom: '8px' } }}>
                  500+
                </Text>
                <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  Employees
                </Text>
              </div>
              <div>
                <Text variant="mega" styles={{ root: { fontWeight: 700, color: theme.palette.themePrimary, display: 'block', marginBottom: '8px' } }}>
                  15+
                </Text>
                <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  Years of Excellence
                </Text>
              </div>
              <div>
                <Text variant="mega" styles={{ root: { fontWeight: 700, color: theme.palette.themePrimary, display: 'block', marginBottom: '8px' } }}>
                  1000+
                </Text>
                <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  Happy Clients
                </Text>
              </div>
              <div>
                <Text variant="mega" styles={{ root: { fontWeight: 700, color: theme.palette.themePrimary, display: 'block', marginBottom: '8px' } }}>
                  50+
                </Text>
                <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  Countries Served
                </Text>
              </div>
            </div>
          </Stack>
        </div>
      </section>
    </div>
  );
}
