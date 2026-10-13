import { SeoConfig, CompanyProfile } from '../types';

export interface SeoAuditResult {
  score: number;
  checks: {
    label: string;
    passed: boolean;
    recommendation: string;
    impact: 'high' | 'medium' | 'low';
  }[];
}

export function auditSeo(seo: SeoConfig, profile: CompanyProfile): SeoAuditResult {
  const checks = [
    {
      label: 'Panjang Tag Judul (Title Tag)',
      passed: seo.metaTitle.length >= 35 && seo.metaTitle.length <= 65,
      recommendation: `Panjang saat ini: ${seo.metaTitle.length} karakter. Idealnya antara 35 - 65 karakter agar tidak terpotong di hasil pencarian Google.`,
      impact: 'high' as const
    },
    {
      label: 'Panjang Meta Description',
      passed: seo.metaDescription.length >= 110 && seo.metaDescription.length <= 165,
      recommendation: `Panjang saat ini: ${seo.metaDescription.length} karakter. Idealnya antara 120 - 160 karakter untuk snippet hasil pencarian Google yang menarik klik (CTR).`,
      impact: 'high' as const
    },
    {
      label: 'Kata Kunci Utama dalam Judul & Deskripsi',
      passed: seo.targetKeywords.some(kw =>
        seo.metaTitle.toLowerCase().includes(kw.toLowerCase()) ||
        seo.metaDescription.toLowerCase().includes(kw.toLowerCase())
      ),
      recommendation: 'Pastikan minimal satu kata kunci utama (misal: "Sound System", "Event Production") tercantum dalam Judul atau Deskripsi.',
      impact: 'high' as const
    },
    {
      label: 'Structured Data Schema.org (JSON-LD)',
      passed: !!seo.schemaType,
      recommendation: 'Skema LocalBusiness/ProfessionalService aktif agar Google menampilkan Rich Snippet (alamat, jam buka, rating).',
      impact: 'high' as const
    },
    {
      label: 'OpenGraph & Social Sharing Image',
      passed: !!seo.ogImageUrl && seo.ogImageUrl.startsWith('http'),
      recommendation: 'Gambar OpenGraph resolusi tinggi diperlukan saat link dibagikan ke WhatsApp, Facebook, dan media sosial.',
      impact: 'medium' as const
    },
    {
      label: 'Canonical URL Resmi',
      passed: !!seo.canonicalUrl && seo.canonicalUrl.startsWith('http'),
      recommendation: 'Canonical URL mencegah Google mengenali konten duplikat pada website Anda.',
      impact: 'medium' as const
    },
    {
      label: 'Sitemap.xml Siap Google Search Console',
      passed: seo.sitemapXmlContent.includes('<urlset') && seo.sitemapXmlContent.includes('</urlset>'),
      recommendation: 'Sitemap XML valid membantu bot Google merayapi seluruh halaman layanan dan portofolio.',
      impact: 'medium' as const
    },
    {
      label: 'Robots.txt Mengizinkan Mesin Pencari',
      passed: seo.robotsTxtContent.includes('Allow: /'),
      recommendation: 'Robots.txt harus memberi izin bot Google (Googlebot) mengindeks halaman beranda dan layanan publik.',
      impact: 'high' as const
    },
    {
      label: 'Informasi Kontak Bisnis Lengkap (NAP)',
      passed: !!profile.phone && !!profile.address && !!profile.email,
      recommendation: 'Name, Address, Phone (NAP) yang konsisten meningkatkan peringkat SEO lokal Google Maps.',
      impact: 'medium' as const
    }
  ];

  const totalPoints = checks.reduce((acc, c) => acc + (c.impact === 'high' ? 15 : 10), 0);
  const earnedPoints = checks.reduce((acc, c) => {
    if (c.passed) {
      return acc + (c.impact === 'high' ? 15 : 10);
    }
    return acc;
  }, 0);

  const score = Math.round((earnedPoints / totalPoints) * 100);

  return {
    score,
    checks
  };
}

export function generateSitemapXml(baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${cleanBase}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${cleanBase}/#services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${cleanBase}/#portfolio</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${cleanBase}/#about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanBase}/#contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /private/

Sitemap: ${cleanBase}/sitemap.xml`;
}
