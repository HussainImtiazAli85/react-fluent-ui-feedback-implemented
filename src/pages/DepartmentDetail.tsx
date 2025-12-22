import { useParams } from 'react-router-dom';
import { Stack, Text, Icon, mergeStyles, useTheme } from '@fluentui/react';

const sectionStyles = mergeStyles({
  padding: '48px 24px',
  minHeight: 'calc(100vh - 300px)',
});

const containerStyles = mergeStyles({
  maxWidth: '1440px',
  margin: '0 auto',
});

const heroStyles = mergeStyles({
  padding: '48px 32px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
  color: '#fff',
  marginBottom: '32px',
});

const cardStyles = mergeStyles({
  padding: '24px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  border: '1px solid #edebe9',
});

const teamMemberStyles = mergeStyles({
  padding: '16px',
  backgroundColor: '#f3f2f1',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: '#e1dfdd',
    transform: 'translateX(4px)',
  },
});

export default function DepartmentDetail() {
  const { deptId } = useParams<{ deptId: string }>();
  const theme = useTheme();

  const departmentData: Record<string, any> = {
    dept1: {
      name: 'Department 1',
      description: 'Responsible for managing and developing innovative solutions for our clients.',
      head: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      location: 'Building A, Floor 3',
      teamSize: 25,
      established: '2015',
      mission: 'To deliver exceptional results through innovation and collaboration.',
      services: [
        'Project Management',
        'Solution Architecture',
        'Technical Consulting',
        'Quality Assurance',
      ],
      teamMembers: [
        { name: 'John Smith', role: 'Senior Manager', email: 'john.smith@company.com' },
        { name: 'Emily Davis', role: 'Project Lead', email: 'emily.davis@company.com' },
        { name: 'Michael Brown', role: 'Technical Lead', email: 'michael.brown@company.com' },
        { name: 'Lisa Wilson', role: 'QA Manager', email: 'lisa.wilson@company.com' },
      ],
    },
    dept2: {
      name: 'Department 2',
      description: 'Focused on customer success and relationship management.',
      head: 'Robert Martinez',
      email: 'robert.martinez@company.com',
      phone: '+1 (555) 987-6543',
      location: 'Building B, Floor 2',
      teamSize: 18,
      established: '2017',
      mission: 'To ensure customer satisfaction and drive business growth.',
      services: [
        'Customer Support',
        'Account Management',
        'Training & Onboarding',
        'Success Planning',
      ],
      teamMembers: [
        { name: 'Jennifer Lee', role: 'Senior Manager', email: 'jennifer.lee@company.com' },
        { name: 'David Clark', role: 'Support Lead', email: 'david.clark@company.com' },
        { name: 'Amanda White', role: 'Training Manager', email: 'amanda.white@company.com' },
        { name: 'Chris Taylor', role: 'Account Manager', email: 'chris.taylor@company.com' },
      ],
    },
  };

  const dept = departmentData[deptId || ''] || departmentData.dept1;

  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <Stack tokens={{ childrenGap: 32 }}>
          <div className={heroStyles}>
            <Stack tokens={{ childrenGap: 16 }}>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 700, color: '#fff', fontSize: '42px' } }}>
                {dept.name}
              </Text>
              <Text variant="xLarge" styles={{ root: { color: 'rgba(255, 255, 255, 0.9)' } }}>
                {dept.description}
              </Text>
              <Stack horizontal tokens={{ childrenGap: 32 }} wrap styles={{ root: { marginTop: '16px' } }}>
                <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                  <Icon iconName="People" styles={{ root: { fontSize: 20, color: '#fff' } }} />
                  <Text variant="large" styles={{ root: { color: '#fff' } }}>{dept.teamSize} Team Members</Text>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                  <Icon iconName="Calendar" styles={{ root: { fontSize: 20, color: '#fff' } }} />
                  <Text variant="large" styles={{ root: { color: '#fff' } }}>Est. {dept.established}</Text>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                  <Icon iconName="POI" styles={{ root: { fontSize: 20, color: '#fff' } }} />
                  <Text variant="large" styles={{ root: { color: '#fff' } }}>{dept.location}</Text>
                </Stack>
              </Stack>
            </Stack>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className={cardStyles}>
              <Stack tokens={{ childrenGap: 16 }}>
                <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon iconName="Contact" styles={{ root: { fontSize: 24, color: '#fff' } }} />
                  </div>
                  <Stack tokens={{ childrenGap: 4 }}>
                    <Text variant="large" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                      Department Head
                    </Text>
                    <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                      {dept.head}
                    </Text>
                  </Stack>
                </Stack>
                <Stack tokens={{ childrenGap: 8 }}>
                  <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                    <Icon iconName="Mail" styles={{ root: { fontSize: 16, color: theme.palette.themePrimary } }} />
                    <Text variant="medium">{dept.email}</Text>
                  </Stack>
                  <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                    <Icon iconName="Phone" styles={{ root: { fontSize: 16, color: theme.palette.themePrimary } }} />
                    <Text variant="medium">{dept.phone}</Text>
                  </Stack>
                </Stack>
              </Stack>
            </div>

            <div className={cardStyles}>
              <Stack tokens={{ childrenGap: 16 }}>
                <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #107c10 0%, #0d5f0d 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon iconName="Rocket" styles={{ root: { fontSize: 24, color: '#fff' } }} />
                  </div>
                  <Text variant="large" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                    Our Mission
                  </Text>
                </Stack>
                <Text variant="medium" styles={{ root: { color: theme.palette.neutralSecondary, lineHeight: 1.6 } }}>
                  {dept.mission}
                </Text>
              </Stack>
            </div>
          </div>

          <div className={cardStyles}>
            <Stack tokens={{ childrenGap: 24 }}>
              <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #8764b8 0%, #6b4d9c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon iconName="TaskList" styles={{ root: { fontSize: 24, color: '#fff' } }} />
                </div>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  Services & Capabilities
                </Text>
              </Stack>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {dept.services.map((service: string, index: number) => (
                  <Stack
                    key={index}
                    horizontal
                    tokens={{ childrenGap: 12 }}
                    verticalAlign="center"
                    styles={{
                      root: {
                        padding: '12px',
                        backgroundColor: theme.palette.neutralLighter,
                        borderRadius: '6px',
                      },
                    }}
                  >
                    <Icon iconName="CheckMark" styles={{ root: { fontSize: 16, color: theme.palette.themePrimary } }} />
                    <Text variant="medium" styles={{ root: { fontWeight: 500 } }}>{service}</Text>
                  </Stack>
                ))}
              </div>
            </Stack>
          </div>

          <div className={cardStyles}>
            <Stack tokens={{ childrenGap: 24 }}>
              <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #00a4ef 0%, #0086c7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon iconName="PeopleTeam" styles={{ root: { fontSize: 24, color: '#fff' } }} />
                </div>
                <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  Key Team Members
                </Text>
              </Stack>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {dept.teamMembers.map((member: any, index: number) => (
                  <div key={index} className={teamMemberStyles}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${theme.palette.themePrimary} 0%, ${theme.palette.themeDark} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '18px',
                      fontWeight: 600,
                    }}>
                      {member.name.charAt(0)}
                    </div>
                    <Stack tokens={{ childrenGap: 4 }} styles={{ root: { flex: 1 } }}>
                      <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                        {member.name}
                      </Text>
                      <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
                        {member.role}
                      </Text>
                      <Text variant="small" styles={{ root: { color: theme.palette.themePrimary } }}>
                        {member.email}
                      </Text>
                    </Stack>
                  </div>
                ))}
              </div>
            </Stack>
          </div>
        </Stack>
      </div>
    </section>
  );
}
