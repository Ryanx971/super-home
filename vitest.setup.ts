import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest';
import { server } from './src/test/mocks/server';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeAll(() => server.listen());

afterEach(() => {
  vi.restoreAllMocks();
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

vi.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

