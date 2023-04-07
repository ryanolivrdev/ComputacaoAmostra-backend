import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { CustomRequest } from 'src/@types/index';

export const GetSession = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    return request.cookies['session_token'];
  },
);
