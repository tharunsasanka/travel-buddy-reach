import type { FastifyReply, FastifyRequest } from 'fastify';
import { createRemoteJWKSet, jwtVerify } from 'jose';

let verifier: ReturnType<typeof createRemoteJWKSet> | undefined;
let configuredUrl = '';

function authConfiguration() {
  const supabaseUrl = String(process.env.SUPABASE_URL ?? '').replace(/\/$/, '');
  if (!supabaseUrl) throw new Error('SUPABASE_URL is not configured');
  if (!verifier || configuredUrl !== supabaseUrl) {
    configuredUrl = supabaseUrl;
    verifier = createRemoteJWKSet(new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`));
  }
  return { issuer: `${supabaseUrl}/auth/v1`, verifier: verifier! };
}

export async function requireUser(request: FastifyRequest, reply: FastifyReply) {
  const authorization = request.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) {
    await reply.code(401).send({ error: 'AUTHENTICATION_REQUIRED' });
    return null;
  }

  try {
    const token = authorization.slice('Bearer '.length).trim();
    const { issuer, verifier } = authConfiguration();
    const { payload } = await jwtVerify(token, verifier, {
      issuer,
      audience: 'authenticated'
    });
    if (!payload.sub) throw new Error('Token subject is missing');
    return payload.sub;
  } catch (error) {
    request.log.warn({ error }, 'Supabase token verification failed');
    await reply.code(401).send({ error: 'INVALID_ACCESS_TOKEN' });
    return null;
  }
}
