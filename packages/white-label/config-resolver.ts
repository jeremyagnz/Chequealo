import type { WhiteLabelConfig } from '@chequealo/shared-types';
import { buildTheme, themeToCssVars } from './themes/default';
import type { Theme } from './themes/default';

export interface ResolvedTenantConfig {
  theme: Theme;
  cssVars: Record<string, string>;
  companyName: string;
  logoUrl: string;
}

export class WhiteLabelConfigResolver {
  resolve(whiteLabelConfig: WhiteLabelConfig | null | undefined): ResolvedTenantConfig {
    const theme = buildTheme(whiteLabelConfig);
    return {
      theme,
      cssVars: themeToCssVars(theme),
      companyName: theme.companyName,
      logoUrl: theme.logoUrl,
    };
  }
}
