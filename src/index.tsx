import { createRoot } from 'react-dom/client';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider
} from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home';
import { FileUpload } from './components/file-upload/FileUpload';
import React from 'react';
import { Form } from './components/form/Form';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Home />} />
			<Route path="/form" element={<Form />} />
			<Route path="/upload" element={<FileUpload />} />
		</>
	)
);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
