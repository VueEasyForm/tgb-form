// @ts-nocheck

export function OgCard({ description, title }) {
  return (
    <div
      tw="flex h-full w-full flex-col items-start justify-between p-[72px]"
      style={{
        fontFamily: 'Inter',
        backgroundColor: 'oklch(21% 0.034 264.665)',
        color: 'oklch(87.2% 0.01 258.338)',
      }}
    >
      <div tw="flex items-center gap-4 text-[30px] font-bold">TGB Form</div>

      <div tw="flex max-w-[1000px] flex-col gap-7">
        <div tw="text-[72px] font-bold leading-[1.1]">{title}</div>

        <div
          tw="text-[34px] leading-[1.35]"
          style={{
            color: 'oklch(87% 0.065 274.039)',
          }}
        >
          {description}
        </div>
      </div>

      <div
        tw="text-2xl italic"
        style={{
          fontFamily: 'JetBrains Mono',
          color: 'oklch(70.7% 0.022 261.325)',
        }}
      >
        Schema-first forms for React and Vue
      </div>
    </div>
  );
}
