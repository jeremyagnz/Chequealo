import type { WhiteLabelConfig } from '@chequealo/shared-types';

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logoUrl: string;
  companyName: string;
}

export const defaultTheme: Theme = {
  primaryColor: '#2563eb',
  secondaryColor: '#64748b',
  fontFamily: 'Inter, sans-serif',
  logoUrl: '/logo.svg',
  companyName: 'Chequealo AI',
};

export function buildTheme(config: WhiteLabelConfig | null | undefined): Theme {
  return {
    primaryColor: config?.primaryColor ?? defaultTheme.primaryColor,
    secondaryColor: config?.secondaryColor ?? defaultTheme.secondaryColor,
    fontFamily: config?.fontFamily ?? defaultTheme.fontFamily,
    logoUrl: config?.logoUrl ?? defaultTheme.logoUrl,
    companyName: config?.companyName ?? defaultTheme.companyName,
  };
}

export function themeToCssVars(theme: Theme): Record<string, string> {
  return {
    '--color-primary': theme.primaryColor,
    '--color-secondary': theme.secondaryColor,
    '--font-family': theme.fontFamily,
  };
}
