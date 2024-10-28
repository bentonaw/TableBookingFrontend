import React from 'react';
import BookingScreen from '../src/pages/BookingScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage';
import Contact from './pages/Contact';
import About from './pages/About';
import Reservation from './pages/Reservation';
import CreateReservation from './pages/CreateReservation';

const App = () => {

	function handlePageRefresh(){
		windows.location.reload()
	}

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path='booking' element={<BookingScreen />} />
					<Route path='contact' element={<Contact />} />
					<Route path='about' element={<About />} />
					<Route path='CreateReservation' element={<CreateReservation refresh={handlePageRefresh} />} />
					<Route path='Reservation' element={<Reservation />} />
				</Route>
			</Routes>
		</Router>
	);
};
export default App;
