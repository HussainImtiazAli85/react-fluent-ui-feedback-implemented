import { Stack, Text, useTheme } from '@fluentui/react';

export default function Departments() {
  const theme = useTheme();
  return (
    <div style={{ padding: '48px 24px', backgroundColor: theme.palette.white }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <Text variant="xxLarge" styles={{ root: { fontWeight: 600, marginBottom: '24px' } }}>Departments</Text>
        <Text>Explore our departments.</Text>
      </div>
    </div>
  );
}
