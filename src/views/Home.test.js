import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

import Home from './Home';

jest.mock('axios');

describe('Home test renders', () => {

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
            content: 'Goodbye',
            likes: [],
        }
    ];

    beforeEach(() => {
        axios.post.mockResolvedValueOnce({ data: posts });
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

    describe('post list', () => {
        const userData = { isLogged: null, };

        it('of two items', async () => {
            const { getAllByTestId } = render(
                <BrowserRouter>
                    <Home userData={userData} />
                </BrowserRouter>);

            const allPosts = await waitFor(() => getAllByTestId('post'));
            expect(allPosts).toHaveLength(2);
        });

        it('with specific content', async () => {
            const { getAllByTestId } = render(
                <BrowserRouter>
                    <Home userData={userData} />
                </BrowserRouter>);

            const allPosts = await waitFor(() => getAllByTestId('post').map(post => post.textContent));
            expect(allPosts[0].includes('Hi everyone')).toBeTruthy();
            expect(allPosts[1].includes('Goodbye')).toBeTruthy();
        });

        it('with particular like number', async () => {
            const { getAllByTestId } = render(
                <BrowserRouter>
                    <Home userData={userData} />
                </BrowserRouter>);

            const likeNumber = await waitFor(() => getAllByTestId('likeNumber'));
            expect(likeNumber[0].textContent).toEqual('2');
            expect(likeNumber[1].textContent).toEqual('0');
        });
    });

    describe('for unlogged user', () => {
        const userData = { isLogged: false, };

        beforeEach(() => {
            render(
                <BrowserRouter>
                    <Home userData={userData} />
                </BrowserRouter>);
        });

        it('no AddPost and UsersToFollow components', () => {
            const homeContainer = screen.getByTestId('home');
            expect(homeContainer.querySelector('add')).not.toBeInTheDocument();
            expect(() => screen.getByTestId('usersToFollow')).toThrow('Unable to find an element');
        });

        it('\"Load more\" button', () => {
            const loadMoreButton = screen.getByText('Load more');
            expect(loadMoreButton).toBeInTheDocument();
        })

    });

    afterEach(() => {
        axios.post.mockClear();
    });
});
