import { User } from 'src/modules/user/user.interface'; 

declare module 'express-serve-static-core' {
    interface Request {
        user?: User; 
    }
}