import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Create an Apollo client - GraphQL client
const client = new ApolloClient({
	uri: 'https://api.studio.thegraph.com/query/24143/main-threshold-subgraph/0.0.7',
	cache: new InMemoryCache(),
});

root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
