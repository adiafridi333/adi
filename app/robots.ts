import type { MetadataRoute } from 'next';
import { SITE_HOST, SITE_URL } from '@/lib/metadata';

const HUMAN_DISALLOW = [
  '/admin',
  '/admin/',
  '/api/',
  '/wp-admin/',
  '/wp-content/',
  '/wp-includes/',
];

// Bots that train + cite content for LLM answer engines. Allow them so the
// site shows up in ChatGPT / Claude / Perplexity / Google AI Overviews etc.
const AI_BOTS = [
  'GPTBot', // OpenAI training crawler
  'ChatGPT-User', // ChatGPT live retrieval
  'OAI-SearchBot', // OpenAI SearchGPT index
  'ClaudeBot', // Anthropic training crawler
  'Claude-User', // Claude live retrieval
  'Claude-SearchBot', // Anthropic search
  'anthropic-ai', // legacy Anthropic
  'PerplexityBot', // Perplexity index
  'Perplexity-User', // Perplexity live retrieval
  'Google-Extended', // Bard / Gemini training
  'GoogleOther', // misc Google research crawlers
  'Applebot-Extended', // Apple Intelligence
  'Amazonbot', // Alexa / Rufus
  'Bytespider', // Doubao / TikTok
  'CCBot', // Common Crawl (used by many LLMs)
  'DuckAssistBot', // DuckDuckGo AI
  'meta-externalagent', // Meta AI fetch
  'meta-externalfetcher',
  'cohere-ai',
  'YouBot', // You.com
  'MistralAI-User',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: HUMAN_DISALLOW,
      },
      {
        userAgent: AI_BOTS,
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_HOST,
  };
}
