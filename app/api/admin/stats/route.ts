import { NextResponse } from 'next/server';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { isAuthed } from '@/lib/admin-auth';
import { ALLOWED_FOLDERS, R2_BUCKET, getR2Client } from '@/lib/r2';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const client = getR2Client();
    const folders: Record<string, { count: number; bytes: number }> = {};
    for (const folder of ALLOWED_FOLDERS) {
      folders[folder] = { count: 0, bytes: 0 };
    }
    let totalCount = 0;
    let totalBytes = 0;
    let continuationToken: string | undefined;
    do {
      const out = await client.send(
        new ListObjectsV2Command({
          Bucket: R2_BUCKET,
          MaxKeys: 1000,
          ContinuationToken: continuationToken,
        }),
      );
      for (const obj of out.Contents ?? []) {
        if (!obj.Key || obj.Key.endsWith('/')) continue;
        totalCount += 1;
        totalBytes += obj.Size ?? 0;
        const folder = obj.Key.split('/')[0];
        if (folder && folder in folders) {
          folders[folder].count += 1;
          folders[folder].bytes += obj.Size ?? 0;
        }
      }
      continuationToken = out.IsTruncated ? out.NextContinuationToken : undefined;
    } while (continuationToken);
    return NextResponse.json({ ok: true, totalCount, totalBytes, folders });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stats failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
