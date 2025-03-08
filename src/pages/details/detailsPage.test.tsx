// import { screen, waitFor, render } from '@testing-library/react';
// import { describe, expect, it } from 'vitest';
// import animeData from '../../__test__/mock/animeData.json';
// import { ROUTES } from '../../utils/constants';
// import DetailsPage from './detailsPage';
// import { Route } from './+types/detailsPage';
// import { createMemoryRouter, RouterProvider } from 'react-router';
// import MainPage from '../main/mainPage';
// import { CardsResponse } from '../../types/cardTypes';
// import { Provider } from 'react-redux';
// import { store } from '../../store/store';

// describe('details page', () => {
//   it('should show relevant data', async () => {
//     const data = animeData.data[0];

//     const router = createMemoryRouter(
//       [
//         {
//           path: ROUTES.root,
//           element: <MainPage {...(animeData as CardsResponse)} />,
//           children: [
//             {
//               path: ROUTES.details,
//               element: (
//                 <DetailsPage {...(data as unknown as Route.ComponentProps)} />
//               ),
//             },
//           ],
//         },
//       ],
//       {
//         initialEntries: ['/anime'],
//       }
//     );

//     render(
//       <Provider store={store}>
//         <RouterProvider router={router} />
//       </Provider>
//     );

//     await waitFor(() => {
//       expect(
//         screen.getByRole('heading', { name: 'Naruto' })
//       ).toBeInTheDocument();

//       expect(screen.getByAltText(data.title_english));
//     });
//   });
// });

import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  configureRouter,
  renderApp,
  userTypeAndSearch,
} from '../../__test__/utils';
import userEvent from '@testing-library/user-event';
import animeData from '../../__test__/mock/animeData.json';
import { ROUTES } from '../../utils/constants';

const router = configureRouter();
const user = userEvent.setup();

describe('details page', () => {
  it('should show loader when details page is loading', async () => {
    waitFor(async () => {
      renderApp();
      await screen.findByText('Naruto');
    });
    await userTypeAndSearch(user);
    const card = await screen.findByAltText(animeData.data[0].title_english);
    await user.click(card);
    waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeInTheDocument();
    });
  });

  it('should show relevant data', async () => {
    renderApp();
    await userTypeAndSearch(user);
    const card = await screen.findByAltText(animeData.data[0].title_english);
    await user.click(card);
    waitFor(async () => {
      expect(
        screen.getByText(animeData.data[0].title_english)
      ).toBeInTheDocument();
      expect(screen.getByText(animeData.data[0].synopsis)).toBeInTheDocument();
      expect(
        screen.getByText(animeData.data[0].title_japanese)
      ).toBeInTheDocument();
    });
  });

  it('should hide page when clicking back button ', async () => {
    renderApp();
    waitFor(async () => {
      expect(
        screen.getByText(animeData.data[0].title_english)
      ).toBeInTheDocument();
      expect(screen.getByText(animeData.data[0].synopsis)).toBeInTheDocument();
      expect(
        screen.getByText(animeData.data[0].title_japanese)
      ).toBeInTheDocument();
      await user.click(screen.getByRole('link', { name: 'Go Back' }));
      expect(router.state.location.pathname).toBe(ROUTES.root);
    });
  });
});
