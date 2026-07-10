type OgCardProps = {
  description: string;
  title: string;
};

export function OgCard({ description, title }: OgCardProps) {
  return (
    <div
      style={{
        alignItems: 'flex-start',
        backgroundColor: '#121926',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter',
        height: '100%',
        justifyContent: 'space-between',
        padding: 72,
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          fontSize: 30,
          fontWeight: 700,
          gap: 16,
        }}
      >
        <span
          style={{
            backgroundColor: '#2dd4bf',
            height: 24,
            width: 24,
          }}
        />
        EasyForm
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1000 }}>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
        <div style={{ color: '#cbd5e1', fontSize: 34, lineHeight: 1.35 }}>{description}</div>
      </div>
      <div style={{ color: '#94a3b8', fontSize: 24 }}>Schema-first forms for React and Vue</div>
    </div>
  );
}
