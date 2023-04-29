import { StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryClientDecorator = (Story: StoryFn) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    </>
  );
};
export { QueryClientDecorator };

