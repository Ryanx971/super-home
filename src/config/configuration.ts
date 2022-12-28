export const GOVEE = {
  ApiKeyName: 'Govee-API-Key',
  ApiKeyValue: process.env.REACT_APP_GOVEE_TOKEN || 'token',
  baseUrl: 'https://developer-api.govee.com/v1',
};

export const SOMFY = {
  pinCode: '2006-4441-1365',
  api: {
    baseUrl:
      'https://gateway-2006-4441-1365.local:8443/enduser-mobile-web/1/enduserAPI',
    token: process.env.REACT_APP_SOMFY_TOKEN || 'token',
  },
};

export const CONSTANTS = {
  DEFAULT_STALETIME: 120_000,
};

