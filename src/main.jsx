// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';

// createRoot(document.getElementById('root')).render(
// 	<StrictMode>
// 		<App />
// 	</StrictMode>,
// );

// const root = document.getElementById('root');

// ReactDOM.createRoot(root).render(<RouterProvider router={router} />);

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 1. Find the "parking spot" and start React
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 2. Render the "App" (which contains your Router)
root.render(
	// <StrictMode>
	<App />,
	// </StrictMode>,
);
