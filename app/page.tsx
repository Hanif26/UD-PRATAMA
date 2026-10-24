import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import SiteInteractions from './site-interactions';

export default function HomePage() {
  const html = readFileSync(join(process.cwd(), 'app', 'site-content.html'), 'utf8');

  return (
    <>
      <SiteInteractions />
      <div className="min-h-screen" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
