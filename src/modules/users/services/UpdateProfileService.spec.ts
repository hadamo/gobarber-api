import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulano@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Ciclano de Tal',
            email: 'ciclano@example.com',
        });

        expect(updatedUser.name).toBe('Ciclano de Tal');
        expect(updatedUser.email).toBe('ciclano@example.com');
    });

    it('should not be able to update the profile of non-existing user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existing-user-id',
                name: 'Test',
                email: 'test@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulano@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Ciclano de Tal',
                email: 'fulano@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulano@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Ciclano de Tal',
            email: 'ciclano@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without informing the old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulano@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Ciclano de Tal',
                email: 'ciclano@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password while informing the wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulano@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Ciclano de Tal',
                email: 'ciclano@example.com',
                old_password: 'wrong_password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
