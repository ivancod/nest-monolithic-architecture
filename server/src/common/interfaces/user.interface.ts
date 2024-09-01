/**
 * User interface
 * @interface
 * @property {number} id - User id
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} refreshToken - User refresh token
 */
export default interface User {
    id: number;
    email: string;
    password: string;
    refreshToken: string;
};
