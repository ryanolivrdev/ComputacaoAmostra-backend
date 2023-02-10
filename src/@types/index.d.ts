import { Request } from 'express';
import type { IncomingHttpHeaders } from 'http';

export interface RequestWithCustomHeader extends Request {
  headers: IncomingHttpHeaders & {
    email: string;
    api: string;
  };
}

export type SessionPayload = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};
