import { MobileShell } from '@/components/mobile-shell';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="ambient">
        <div className="gridlines" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />
        <div className="scanlines" />
      </div>
      <main className="relative z-10 min-h-screen">
        <MobileShell />
      </main>
    </div>
  );
}
