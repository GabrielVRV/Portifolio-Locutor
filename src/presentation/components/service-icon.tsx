import { FaBullhorn, FaCarSide, FaCompactDisc, FaMicrophoneLines, FaRadio } from "react-icons/fa6";

const ICONS = {
  car: FaCarSide,
  spot: FaBullhorn,
  jingle: FaCompactDisc,
  radio: FaRadio,
  voice: FaMicrophoneLines,
} as const;

export type ServiceIconKey = keyof typeof ICONS;

/** Keyword → icon. Services are free text in the content, so match loosely. */
const ICON_RULES: ReadonlyArray<readonly [RegExp, ServiceIconKey]> = [
  [/carro|som|rua/i, "car"],
  [/spot|comercial|propaganda/i, "spot"],
  [/vinheta|jingle/i, "jingle"],
  [/chamada|r[aá]dio/i, "radio"],
];

export function iconKeyForService(name: string): ServiceIconKey {
  return ICON_RULES.find(([pattern]) => pattern.test(name))?.[1] ?? "voice";
}

interface ServiceIconProps {
  readonly name: string;
  readonly className?: string;
}

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = ICONS[iconKeyForService(name)];
  return <Icon aria-hidden="true" className={className} />;
}
