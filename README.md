## About
This is an app developed as a recruiment task for a company. The task was to create a web app that displays a list of chargers and allows the user to filter and sort them based on different criteria.
The user also has to be able to book slots at chargers.

## Approach

The app is built using Next.js and Typescript. It app uses a mock API to simulate the backend created with MSW.
The UI is built with Material UI components keeping in mind responsiveness and accessibility. 
Many components are taken from the Material UI library examples and customized to fit the app.

State management is handled in two ways:
- URL query params are used for sorting and filtering. This is a simple and clean way to handle state without passing props or worrying about a global state using Context API or some library. 
- Zustand is used for keeping a persistent state such as charger bookings. The Zustand state is very simple, only keeping a list of bookings.
In this case components are responsible for finding the relevant booking information based on the charger id and date.

The mock API is responsible for sending the charger data to components. Sorting and filtering is also handled by the API instead of the components. This is done to keep the components clean and simple and to not eat up performance.
So in this case performance gains are traded for additional network requests. This could be switched depending on the use case. Obviously for such a small use-case both approaches are valid.

## Local setup

To run the app locally you need to install the dependencies and start the dev server.

Using `npm` as the package manager:

```bash
npm install
npm run dev
```

Then navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## Testing

The app has a few tests written using Vitest and React Testing Library. The tests verify the functionality of util functions and basic working of important UI components.

To run the tests use the following command:

```bash
npm run test
```

## Features missing from initial requirements

### Sorting based on distance
Since there is no location data in the mock data (other than city), sorting based on distance is not implemented. 
This would require a location API to get the user's location and then calculate the distance between the user and the chargers. This feature is out-of-scope for this task.

### Filtering based on availability
Since availability is stored in the Zustand state and filtering is done by the mock API, filtering based on availability is not implemented.
It could be implemented similarly to how filtering is done based on other parameters. However, adding it to the current architecture would be very messy and would require a lot of refactoring.


## Possible improvements

### Error handling
The app has only very minimal error handling. Throughout the application the user is expected to be "well-behaved" and not do anything unexpected.
For a production app, error handling would be a must. This includes handling network errors, invalid data, etc. However, it was not the main focus for this task and is not implemented extensively.

### Adding informational chips for filtering state
Currently the user has no way of knowing what filters are applied unlesss they open the filtering modal again. Adding some sort of visual indicator outside the modal would be a nice addition.
This does not affect the functionality of the application and would require some additional UI design and work to implement. 

### Dark mode
Most modern web apps have a dark mode. This app does not have one. Implementing a dark mode would be a nice addition to the app.
It was not implemented due to time constraints. and the fact that it was not part of the initial requirements.
