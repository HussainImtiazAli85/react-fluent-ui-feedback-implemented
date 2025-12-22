import { useState } from 'react';
import { Stack, Text, TextField, PrimaryButton, Icon, mergeStyles, useTheme } from '@fluentui/react';

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
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#deecf9',
  color: '#0078d4',
  marginBottom: '16px',
});

export default function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div>
      <div className={heroStyles}>
        <div className={containerStyles}>
          <Text variant="xxLarge" styles={{ root: { fontWeight: 700, marginBottom: '16px', display: 'block' } }}>
            Get In Touch
          </Text>
          <Text variant="large" styles={{ root: { maxWidth: '800px', margin: '0 auto', opacity: 0.95 } }}>
            We're here to help and answer any questions you might have
          </Text>
        </div>
      </div>

      <section className={sectionStyles} style={{ backgroundColor: '#faf9f8' }}>
        <div className={containerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <div className={cardStyles} style={{ textAlign: 'center' }}>
              <div className={iconBoxStyles} style={{ margin: '0 auto 16px' }}>
                <Icon iconName="Mail" styles={{ root: { fontSize: 24 } }} />
              </div>
              <Text variant="large" styles={{ root: { fontWeight: 600, marginBottom: '8px', display: 'block' } }}>
                Email Us
              </Text>
              <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                info@company.com
              </Text>
              <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                support@company.com
              </Text>
            </div>

            <div className={cardStyles} style={{ textAlign: 'center' }}>
              <div className={iconBoxStyles} style={{ margin: '0 auto 16px' }}>
                <Icon iconName="Phone" styles={{ root: { fontSize: 24 } }} />
              </div>
              <Text variant="large" styles={{ root: { fontWeight: 600, marginBottom: '8px', display: 'block' } }}>
                Call Us
              </Text>
              <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                +1 (555) 123-4567
              </Text>
              <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                Mon-Fri 9:00 AM - 6:00 PM
              </Text>
            </div>

            <div className={cardStyles} style={{ textAlign: 'center' }}>
              <div className={iconBoxStyles} style={{ margin: '0 auto 16px' }}>
                <Icon iconName="MapPin" styles={{ root: { fontSize: 24 } }} />
              </div>
              <Text variant="large" styles={{ root: { fontWeight: 600, marginBottom: '8px', display: 'block' } }}>
                Visit Us
              </Text>
              <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                123 Business Avenue
              </Text>
              <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                Suite 100, City, State 12345
              </Text>
            </div>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className={cardStyles}>
              <Text variant="xLarge" styles={{ root: { fontWeight: 600, marginBottom: '24px', display: 'block' } }}>
                Send Us a Message
              </Text>

              {submitted ? (
                <Stack horizontalAlign="center" tokens={{ childrenGap: 16 }} styles={{ root: { padding: '48px 24px', textAlign: 'center' } }}>
                  <Icon iconName="CheckMark" styles={{ root: { fontSize: 64, color: theme.palette.green } }} />
                  <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.green } }}>
                    Message Sent Successfully!
                  </Text>
                  <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                    We'll get back to you as soon as possible.
                  </Text>
                </Stack>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Stack tokens={{ childrenGap: 16 }}>
                    <TextField
                      label="Your Name"
                      required
                      value={formData.name}
                      onChange={(_, value) => setFormData({ ...formData, name: value || '' })}
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(_, value) => setFormData({ ...formData, email: value || '' })}
                    />
                    <TextField
                      label="Subject"
                      required
                      value={formData.subject}
                      onChange={(_, value) => setFormData({ ...formData, subject: value || '' })}
                    />
                    <TextField
                      label="Message"
                      multiline
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(_, value) => setFormData({ ...formData, message: value || '' })}
                    />
                    <PrimaryButton type="submit" text="Send Message" styles={{ root: { marginTop: '8px' } }} />
                  </Stack>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
