export const GOVEE = {
  ApiKeyName: 'Govee-API-Key',
  ApiKeyValue: import.meta.env.VITE_GOVEE_TOKEN || 'token',
  baseUrl: 'https://developer-api.govee.com/v1',
};

export const SOMFY = {
  pinCode: '2006-4441-1365',
  api: {
    baseUrl:
      'https://gateway-2006-4441-1365.local:8443/enduser-mobile-web/1/enduserAPI',
    token: import.meta.env.VITE_SOMFY_TOKEN || 'token',
  },
};

export const CONSTANTS = {
  DEFAULT_STALETIME: 120_000,
  MAX_HEATING_TEMPERATURE: 24,
};

