import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import IResponseUserDTO from '@modules/users/dtos/IResponseUserDTO';

export default class SessionsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        const userResponse: IResponseUserDTO = user;

        delete userResponse.password;

        return response.json({ user, token });
    }
}
