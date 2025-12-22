import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Text, Icon, IconButton, useTheme, mergeStyleSets, IStackTokens, Breadcrumb, IBreadcrumbItem, Persona, PersonaSize, DefaultButton } from '@fluentui/react';
import { supabase } from '../lib/supabase';
import { NewHire } from '../types/database';

const getStyles = (theme: any) => mergeStyleSets({
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
    textAlign: 'center',
  },
  contentCard: {
    backgroundColor: theme.palette.white,
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 600,
  },
  metaItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px 20px',
    backgroundColor: theme.palette.neutralLighter,
    borderRadius: '8px',
  },
  skillChip: {
    padding: '6px 14px',
    backgroundColor: theme.palette.themeLighter,
    color: theme.palette.themePrimary,
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 600,
  },
});

const contentTokens: IStackTokens = { childrenGap: 24 };

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [employee, setEmployee] = useState<NewHire | null>(null);

  useEffect(() => {
    if (id) {
      supabase
        .from('new_hires')
        .select('*')
        .eq('id', id)
        .maybeSingle()
        .then(({ data }) => setEmployee(data));
    }
  }, [id]);

  if (!employee) {
    return (
      <div className={styles.pageRoot}>
        <div className={styles.container}>
          <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: '80px 20px' } }}>
            <Icon iconName="ContactCardSettings" styles={{ root: { fontSize: 64, color: theme.palette.neutralTertiary, marginBottom: '16px' } }} />
            <Text variant="xLarge" styles={{ root: { fontWeight: 600, marginBottom: '16px', color: theme.palette.neutralPrimary } }}>
              Employee not found
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

  const breadcrumbItems: IBreadcrumbItem[] = [
    { text: 'Home', key: 'home', onClick: () => navigate('/') },
    { text: 'Employees', key: 'employees' },
    { text: employee.name, key: 'current', isCurrentItem: true },
  ];

  const mockSkills = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'UI/UX Design'];
  const mockProjects = [
    { name: 'Intranet Portal Redesign', role: 'Frontend Developer' },
    { name: 'Mobile App Development', role: 'React Native Developer' },
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
          <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
            <Persona
              text={employee.name}
              size={PersonaSize.size120}
              hidePersonaDetails
              styles={{
                root: {
                  '& .ms-Persona-initials': {
                    background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
                    fontSize: '42px',
                    fontWeight: 600,
                  },
                },
              }}
            />

            <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }}>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                {employee.name}
              </Text>
              <Text variant="xLarge" styles={{ root: { fontWeight: 500, color: theme.palette.themePrimary } }}>
                {employee.position}
              </Text>
              <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                {employee.department}
              </Text>
            </Stack>

            <div
              className={styles.badge}
              style={{
                backgroundColor: '#e7f3ff',
                color: theme.palette.themePrimary,
              }}
            >
              <Icon iconName="Sparkle" styles={{ root: { fontSize: 14 } }} />
              Joined {new Date(employee.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>

            <Stack horizontal tokens={{ childrenGap: 12 }}>
              <DefaultButton
                iconProps={{ iconName: 'Mail' }}
                text="Send Email"
                onClick={() => alert('Email dialog')}
              />
              <DefaultButton
                iconProps={{ iconName: 'Chat' }}
                text="Message"
                onClick={() => alert('Chat opened')}
              />
              <DefaultButton
                iconProps={{ iconName: 'AddFriend' }}
                text="Connect"
                onClick={() => alert('Connection request sent')}
              />
            </Stack>
          </Stack>
        </div>

        <Stack tokens={contentTokens}>
          <div className={styles.contentCard}>
            <Stack tokens={contentTokens}>
              <Stack tokens={{ childrenGap: 8 }}>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  About
                </Text>
                <div style={{ width: '60px', height: '4px', backgroundColor: theme.palette.themePrimary, borderRadius: '2px' }} />
              </Stack>

              <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary, lineHeight: '1.8' } }}>
                {employee.bio || `Welcome ${employee.name} to our team! We're excited to have you as our new ${employee.position} in the ${employee.department} department. Looking forward to working together and achieving great things!`}
              </Text>

              <Stack tokens={{ childrenGap: 12 }}>
                <div className={styles.metaItem}>
                  <Icon iconName="Work" styles={{ root: { fontSize: 18, color: theme.palette.themePrimary, marginTop: '2px' } }} />
                  <Stack tokens={{ childrenGap: 4 }} styles={{ root: { flex: 1 } }}>
                    <Text variant="small" styles={{ root: { fontWeight: 600, color: theme.palette.neutralSecondary } }}>
                      Position
                    </Text>
                    <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary } }}>
                      {employee.position}
                    </Text>
                  </Stack>
                </div>

                <div className={styles.metaItem}>
                  <Icon iconName="Org" styles={{ root: { fontSize: 18, color: theme.palette.themePrimary, marginTop: '2px' } }} />
                  <Stack tokens={{ childrenGap: 4 }} styles={{ root: { flex: 1 } }}>
                    <Text variant="small" styles={{ root: { fontWeight: 600, color: theme.palette.neutralSecondary } }}>
                      Department
                    </Text>
                    <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary } }}>
                      {employee.department}
                    </Text>
                  </Stack>
                </div>

                <div className={styles.metaItem}>
                  <Icon iconName="Calendar" styles={{ root: { fontSize: 18, color: theme.palette.themePrimary, marginTop: '2px' } }} />
                  <Stack tokens={{ childrenGap: 4 }} styles={{ root: { flex: 1 } }}>
                    <Text variant="small" styles={{ root: { fontWeight: 600, color: theme.palette.neutralSecondary } }}>
                      Start Date
                    </Text>
                    <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary } }}>
                      {new Date(employee.start_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Text>
                  </Stack>
                </div>

                <div className={styles.metaItem}>
                  <Icon iconName="POI" styles={{ root: { fontSize: 18, color: theme.palette.themePrimary, marginTop: '2px' } }} />
                  <Stack tokens={{ childrenGap: 4 }} styles={{ root: { flex: 1 } }}>
                    <Text variant="small" styles={{ root: { fontWeight: 600, color: theme.palette.neutralSecondary } }}>
                      Location
                    </Text>
                    <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary } }}>
                      Main Office - Building A
                    </Text>
                  </Stack>
                </div>
              </Stack>
            </Stack>
          </div>

          <div className={styles.contentCard}>
            <Stack tokens={contentTokens}>
              <Stack tokens={{ childrenGap: 8 }}>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  Skills & Expertise
                </Text>
                <div style={{ width: '60px', height: '4px', backgroundColor: theme.palette.themePrimary, borderRadius: '2px' }} />
              </Stack>

              <Stack horizontal tokens={{ childrenGap: 8 }} wrap>
                {mockSkills.map((skill, index) => (
                  <div key={index} className={styles.skillChip}>
                    {skill}
                  </div>
                ))}
              </Stack>
            </Stack>
          </div>

          <div className={styles.contentCard}>
            <Stack tokens={contentTokens}>
              <Stack tokens={{ childrenGap: 8 }}>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  Current Projects
                </Text>
                <div style={{ width: '60px', height: '4px', backgroundColor: theme.palette.themePrimary, borderRadius: '2px' }} />
              </Stack>

              <Stack tokens={{ childrenGap: 12 }}>
                {mockProjects.map((project, index) => (
                  <div key={index} className={styles.metaItem}>
                    <Icon iconName="ProjectCollection" styles={{ root: { fontSize: 18, color: theme.palette.themePrimary, marginTop: '2px' } }} />
                    <Stack tokens={{ childrenGap: 4 }} styles={{ root: { flex: 1 } }}>
                      <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                        {project.name}
                      </Text>
                      <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                        {project.role}
                      </Text>
                    </Stack>
                  </div>
                ))}
              </Stack>
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
}
