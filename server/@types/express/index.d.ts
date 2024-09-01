import User from 'src/common/interfaces/user.interface';

declare module 'express-serve-static-core' {
    interface Request {
        user?: User; 
    }
}