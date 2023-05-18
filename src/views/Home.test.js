import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

import Home from './Home';

jest.mock('axios');

describe('Home test', () => {

    describe('renders', () => {

        const posts = [
            {
                id: 1,
                user: {
                    avatar_url: 'someUrl',
                    username: 'Tomek',
                    id: 10,
                },
                created_at: '2023-05-01 23:03:00',
                content: 'Hi everyone',
                likes: [
                    {},
                    {},
                ],
            },
            {
                id: 2,
                user: {
                    avatar_url: 'someUrl',
                    username: 'Tomek',
                    id: 10,
                },
                created_at: '2023-05-02 12:10:00',
                content: 'Godbye',
                likes: [],
            }
        ];

        beforeEach(() => {
            axios.post.mockResolvedValueOnce({ data: posts });
        });

        afterEach(() => {
            axios.post.mockClear();
          });

        it('Home component', () => {
            const userData = { isLogged: null, };

            render(
                <BrowserRouter>
                    <Home userData={userData} />
                </BrowserRouter>);

            const homeContainer = screen.getByTestId('home');
            expect(homeContainer).toBeInTheDocument();
        });

        it('post list', async () => {
            const userData = { isLogged: null, };

            const { getAllByTestId } = render(
                <BrowserRouter>
                    <Home userData={userData} />
                </BrowserRouter>);

            const allPosts = await waitFor(() => getAllByTestId('post'));
            expect(allPosts).toHaveLength(2);
        });

        describe('for unlogged user', () => {
            const userData = { isLogged: false, };

            it('no AddPost and UsersToFollow components', () => {
                render(
                    <BrowserRouter>
                        <Home userData={userData} />
                    </BrowserRouter>);

                const homeContainer = screen.getByTestId('home');
                expect(homeContainer.querySelector('add')).not.toBeInTheDocument();
                expect(() => screen.getByTestId('usersToFollow')).toThrow('Unable to find an element');
            });

            it('\"Load more\" button', () => {
                render(
                    <BrowserRouter>
                        <Home userData={userData} />
                    </BrowserRouter>);

                const loadMoreButton = screen.getByText('Load more');
                expect(loadMoreButton).toBeInTheDocument();
            })

        });
    });
});
