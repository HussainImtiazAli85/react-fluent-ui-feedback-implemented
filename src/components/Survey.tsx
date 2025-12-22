import { useState } from 'react';
import { Stack, Text, ChoiceGroup, IChoiceGroupOption, PrimaryButton, Icon, useTheme } from '@fluentui/react';

export default function Survey() {
  const theme = useTheme();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const sectionStyles = {
    padding: '80px 24px',
    background: `linear-gradient(135deg, ${theme.palette.themePrimary}10 0%, ${theme.palette.themePrimary}05 100%)`,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const containerStyles = {
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'relative' as const,
    zIndex: 1,
  };

  const cardStyles = {
    padding: '48px',
    backgroundColor: theme.palette.white,
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
    border: 'none',
    position: 'relative' as const,
  };

  const questions = [
    {
      id: 'satisfaction',
      question: 'How satisfied are you with our intranet portal?',
      options: [
        { key: 'very-satisfied', text: 'Very Satisfied' },
        { key: 'satisfied', text: 'Satisfied' },
        { key: 'neutral', text: 'Neutral' },
        { key: 'dissatisfied', text: 'Dissatisfied' },
      ],
    },
    {
      id: 'ease-of-use',
      question: 'How easy is it to find information on the portal?',
      options: [
        { key: 'very-easy', text: 'Very Easy' },
        { key: 'easy', text: 'Easy' },
        { key: 'moderate', text: 'Moderate' },
        { key: 'difficult', text: 'Difficult' },
      ],
    },
    {
      id: 'features',
      question: 'Which feature do you use most often?',
      options: [
        { key: 'documents', text: 'Documents' },
        { key: 'news', text: 'News & Announcements' },
        { key: 'events', text: 'Events Calendar' },
        { key: 'directory', text: 'Employee Directory' },
      ],
    },
  ];

  const handleChange = (questionId: string, option?: IChoiceGroupOption) => {
    if (option) {
      setAnswers({ ...answers, [questionId]: option.key });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAnswers({});
    }, 4000);
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <section style={sectionStyles}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.palette.themePrimary} 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, ${theme.palette.themePrimary} 0%, transparent 50%)`,
        }} />
      <div style={containerStyles}>
        <Stack tokens={{ childrenGap: 40 }}>
          <Stack tokens={{ childrenGap: 16 }} styles={{ root: { textAlign: 'center' } }}>
            <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, fontSize: '32px' } }}>
              Quick Survey
            </Text>
            <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary, fontWeight: 400, maxWidth: '600px', margin: '0 auto' } }}>
              Help us improve your experience by sharing your feedback
            </Text>
            {!submitted && Object.keys(answers).length > 0 && (
              <div style={{ maxWidth: '400px', margin: '20px auto 0' }}>
                <Stack tokens={{ childrenGap: 8 }}>
                  <Stack horizontal horizontalAlign="space-between">
                    <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary, fontWeight: 600 } }}>
                      Progress
                    </Text>
                    <Text variant="small" styles={{ root: { color: theme.palette.themePrimary, fontWeight: 600 } }}>
                      {Object.keys(answers).length} / {questions.length}
                    </Text>
                  </Stack>
                  <div style={{
                    height: '8px',
                    backgroundColor: theme.palette.neutralLighter,
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${theme.palette.themePrimary} 0%, ${theme.palette.themeDark} 100%)`,
                      transition: 'width 0.3s ease',
                      borderRadius: '4px',
                    }} />
                  </div>
                </Stack>
              </div>
            )}
          </Stack>

          <div style={cardStyles}>
            {submitted ? (
              <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }} styles={{ root: { padding: '40px 24px', textAlign: 'center' } }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: theme.palette.neutralLighter,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon iconName="CompletedSolid" styles={{ root: { fontSize: 48, color: '#107c10' } }} />
                </div>
                <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  Thank You!
                </Text>
                <Text variant="large" styles={{ root: { color: theme.palette.neutralSecondary, lineHeight: 1.6 } }}>
                  Your feedback has been submitted successfully. We appreciate your time!
                </Text>
              </Stack>
            ) : (
              <Stack tokens={{ childrenGap: 40 }}>
                {questions.map((q, index) => {
                  const isAnswered = !!answers[q.id];
                  return (
                    <div
                      key={q.id}
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        backgroundColor: isAnswered ? `${theme.palette.themePrimary}08` : theme.palette.neutralLighterAlt,
                        border: `2px solid ${isAnswered ? theme.palette.themePrimary : 'transparent'}`,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Stack tokens={{ childrenGap: 20 }}>
                        <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '12px',
                              background: isAnswered
                                ? `linear-gradient(135deg, ${theme.palette.themePrimary} 0%, ${theme.palette.themeDark} 100%)`
                                : theme.palette.neutralLight,
                              color: isAnswered ? theme.palette.white : theme.palette.neutralSecondary,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '16px',
                              transition: 'all 0.3s ease',
                              boxShadow: isAnswered ? `0 4px 12px ${theme.palette.themePrimary}40` : 'none',
                            }}
                          >
                            {isAnswered ? <Icon iconName="CheckMark" styles={{ root: { fontSize: 18 } }} /> : index + 1}
                          </div>
                          <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, flex: 1, fontSize: '20px' } }}>
                            {q.question}
                          </Text>
                        </Stack>
                        <div style={{ paddingLeft: '56px' }}>
                          <ChoiceGroup
                            options={q.options}
                            selectedKey={answers[q.id]}
                            onChange={(_, option) => handleChange(q.id, option)}
                          />
                        </div>
                      </Stack>
                    </div>
                  );
                })}

                <Stack horizontal horizontalAlign="center" styles={{ root: { paddingTop: '24px' } }}>
                  <PrimaryButton
                    text="Submit Survey"
                    iconProps={{ iconName: 'Send' }}
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length < questions.length}
                    styles={{
                      root: {
                        height: '56px',
                        fontSize: '17px',
                        fontWeight: 600,
                        minWidth: '200px',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${theme.palette.themePrimary} 0%, ${theme.palette.themeDark} 100%)`,
                        border: 'none',
                        boxShadow: `0 8px 24px ${theme.palette.themePrimary}40`,
                        transition: 'all 0.3s ease',
                      },
                      rootHovered: {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 32px ${theme.palette.themePrimary}50`,
                      },
                      rootDisabled: {
                        background: theme.palette.neutralLight,
                        color: theme.palette.neutralTertiary,
                        boxShadow: 'none',
                      },
                    }}
                  />
                </Stack>
              </Stack>
            )}
          </div>
        </Stack>
      </div>
    </section>
  );
}
