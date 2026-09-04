type Input = number | string;

type Locale =
  | "en-IN"
  | "en-US"
  | "fr-FR"
  | "de-DE"
  | "ja-JP"
  | "zh-CN"
  | "es-ES"
  | "it-IT"
  | "pt-BR"
  | "ru-RU";

export const formatNumber = (
  input: Input,
  locale: Locale = "en-US",
  options?: Intl.NumberFormatOptions,
) => {
  const number = +input;
  return new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 3,
    ...options,
  }).format(number);
};

export const compactNumber = (
  input: Input,
  locale: Locale = "en-US",
  compactDisplay: "short" | "long" = "short",
) => {
  return formatNumber(input, locale, { notation: "compact", compactDisplay });
};
