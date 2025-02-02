# Search Application

This is a React-based application that allows users to search for items using an API and displays the results. The application is divided into two main sections: a search bar at the top and a results display area at the bottom. It includes features like local storage integration, error handling, and loading indicators.

## Features

### Search Functionality:

- A search input and button are provided in the top section.

- The application checks local storage for previously saved search terms. If none exists, the input is left empty.

- When the user clicks the "Search" button, the application makes an API call using the search term (trimmed of trailing spaces).

- The search term is saved to local storage. If a term already exists, it is overwritten.

### Results Display:

- The bottom section displays search results, including the name and a small description of each item.

- By default, the application makes an API call to fetch all items or items based on the search term in the input.

### Loading Indicator:

- When the application makes an API request, a loading indicator (spinner) is displayed to inform the user.

### Error Handling:

- If the API request fails (status code 4xx or 5xx), a meaningful error message is displayed to the user.

- The application is wrapped in an error boundary to catch errors. Errors are logged to the console, and a fallback UI is displayed.

- A button is provided to test error handling by throwing an error on click.

### Technologies Used

- React: For building the user interface.

- Local Storage: For saving and retrieving search terms.

- API Integration: For fetching search results.

- Error Boundary: For catching and handling errors.

- Typescript: For type checking.

- Vite: For building and serving the application.

### Installation

1. Clone the repository:

```
git clone https://github.com/NadyaGus/rs-react-app
```

2. Navigate to the project directory:

```
cd rs-react-app
```

3. Switch to task branch (e.g. class-components)
```
git checkout class-components
```

4. Install dependencies:

```
npm install
```

5. Start the development server:

```
npm run dev
```

Open your browser and visit http://localhost:5173 to view the application.

### Usage

1. Search for Items:

- Enter a search term in the input field and click the "Search" button.
- The application will fetch and display results based on the search term.

2. Test Error Handling:

- Click the "Throw Error" button to simulate an error and see the fallback UI.
