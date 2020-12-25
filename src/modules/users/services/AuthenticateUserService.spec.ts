import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUserService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {
        const user = await createUser.execute({
            name: 'Fulano de Tal',
            email: 'fulano@example.com',
            password: '123123123',
        });

        const response = await authenticateUser.execute({
            email: 'fulano@example.com',
            password: '123123123',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'fulano@example.com',
                password: '123123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await createUser.execute({
            name: 'Fulano de Tal',
            email: 'fulano@example.com',
            password: '123123123',
        });

        await expect(
            authenticateUser.execute({
                email: 'fulano@example.com',
                password: 'wrongpassword',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
