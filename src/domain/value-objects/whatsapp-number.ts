import { DomainValidationError } from "@/domain/errors/domain-validation-error";

declare const brand: unique symbol;

/**
 * Brazilian phone number normalized to E.164 digits (e.g. "5519997355358").
 * Only obtainable through {@link parseWhatsAppNumber}, so every value is valid.
 */
export type WhatsAppNumber = string & { readonly [brand]: "WhatsAppNumber" };

const BRAZIL_COUNTRY_CODE = "55";
const LOCAL_NUMBER = /^[1-9]{2}(9\d{8}|[2-5]\d{7})$/;

export function parseWhatsAppNumber(raw: string): WhatsAppNumber {
  const digits = raw.replace(/\D/g, "");
  const local =
    digits.length > 11 && digits.startsWith(BRAZIL_COUNTRY_CODE)
      ? digits.slice(BRAZIL_COUNTRY_CODE.length)
      : digits;

  if (!LOCAL_NUMBER.test(local)) {
    throw new DomainValidationError(`Invalid Brazilian phone number: "${raw}"`);
  }

  return `${BRAZIL_COUNTRY_CODE}${local}` as WhatsAppNumber;
}

/**
 * Formats for display, e.g. "(19) 99735-5358".
 */
export function formatWhatsAppNumber(number: WhatsAppNumber): string {
  const local = number.slice(BRAZIL_COUNTRY_CODE.length);
  const areaCode = local.slice(0, 2);
  const subscriber = local.slice(2);
  const splitAt = subscriber.length - 4;

  return `(${areaCode}) ${subscriber.slice(0, splitAt)}-${subscriber.slice(splitAt)}`;
}

/**
 * Builds a click-to-chat link, optionally with a pre-filled message.
 */
export function buildWhatsAppLink(number: WhatsAppNumber, message?: string): string {
  const url = new URL(`https://wa.me/${number}`);
  if (message) url.searchParams.set("text", message);
  return url.toString();
}
