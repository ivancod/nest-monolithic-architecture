import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import appConfig from 'src/config/app.config';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService) {
        super();
    }

    /**
     * This method is called by the Passport library when it has successfully verified the JWT token.
     * It is used to check if the refresh token is present in the request body.
     * 
     * @param context ExecutionContext object
     * @returns boolean
     * @throws UnauthorizedException
     * @throws ForbiddenException
     */
    canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const refreshToken = request.body.refreshToken;
        console.log('refreshToken: ',refreshToken);
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is missing');
        }

        try {
            request.user = this.jwtService.verify(refreshToken, { secret: appConfig.jwt.secret });
            request.user.refreshToken = refreshToken;
            return true;
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
