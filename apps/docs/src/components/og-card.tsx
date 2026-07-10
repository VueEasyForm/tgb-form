type OgCardProps = {
  description: string;
  title: string;
};

// https://github.com/fuma-nama/fumadocs/blob/main/packages/base-ui/css/dusk.css
const darkDuskTheme = `
  :root {
    --color-fd-ring: hsl(340, 100%, 90%);
    --color-fd-primary-foreground: hsl(240, 40%, 4%);
    --color-fd-popover: hsl(240, 20%, 5%);
    --color-fd-popover-foreground: hsl(250, 20%, 90%);
    --color-fd-primary: hsl(340, 100%, 90%);
    --color-fd-border: hsl(220, 15%, 15%);
    --color-fd-background: hsl(220, 15%, 6%);
    --color-fd-foreground: hsl(220, 15%, 87%);
    --color-fd-muted: hsl(220, 20%, 15%);
    --color-fd-muted-foreground: hsl(220, 15%, 60%);
    --color-fd-accent: hsl(250, 20%, 15%);
    --color-fd-secondary: hsl(240, 20%, 15%);
    --color-fd-card-foreground: hsl(240, 15%, 87%);
    --color-fd-card: hsl(240, 20%, 5%);
    --color-fd-secondary-foreground: hsl(250, 20%, 90%);
    --color-fd-accent-foreground: hsl(340, 5%, 90%);
  }
`;

export function OgCard({ description, title }: OgCardProps) {
  return (
    <div
      tw="flex h-full w-full flex-col items-start justify-between p-[72px] antialiased"
      style={{
        backgroundColor: 'var(--color-fd-background)',
        color: 'var(--color-fd-foreground)',
        fontFamily: 'Inter',
      }}
    >
      <style>{darkDuskTheme}</style>
      <div tw="flex items-center gap-4 text-[30px] font-bold">
        <span
          tw="h-6 w-6"
          style={{ backgroundColor: 'var(--color-fd-primary)' }}
        />
        TGB Form
      </div>
      <div tw="flex max-w-[1000px] flex-col gap-7">
        <div tw="text-[72px] font-bold leading-[1.1]">{title}</div>
        <div
          tw="text-[34px] leading-[1.35]"
          style={{ color: 'var(--color-fd-popover-foreground)' }}
        >
          {description}
        </div>
      </div>
      <div
        tw="text-2xl italic subpixel-antialiased!"
        style={{ color: 'var(--color-fd-muted-foreground)', fontFamily: 'JetBrains Mono' }}
      >
        Schema-first forms for React and Vue
      </div>
    </div>
  );
}
