// Global types for Deno environment
declare global {
  interface Request {}
  interface Response {
    constructor(body?: BodyInit | null, init?: ResponseInit): Response;
  }
  interface ResponseInit {
    status?: number;
    statusText?: string;
    headers?: HeadersInit;
  }
  type BodyInit = string | FormData | Blob | ArrayBuffer | URLSearchParams | ReadableStream<Uint8Array>;
  type HeadersInit = string[][] | Record<string, string> | Headers;
  
  namespace console {
    function log(...args: any[]): void;
    function error(...args: any[]): void;
    function warn(...args: any[]): void;
    function info(...args: any[]): void;
  }
}

// Deno environment types
declare namespace Deno {
  export interface Env {
    get(key: string): string | undefined;
  }
  
  export const env: Env;
}

// Module declarations for Deno imports
declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export function serve(handler: (req: Request) => Promise<Response> | Response): void;
  export function serve(handler: (req: Request) => Promise<Response> | Response): Promise<void>;
}

declare module "https://esm.sh/@supabase/supabase-js@2" {
  export function createClient<T>(
    url: string,
    key: string,
    options?: {
      auth?: {
        autoRefreshToken?: boolean;
        persistSession?: boolean;
      };
      global?: {
        headers?: Record<string, string>;
      };
    }
  ): any;
  
  export * from '@supabase/supabase-js';
}