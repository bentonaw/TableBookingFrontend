import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import MainPage from "./pages/MainPage"
import Contact from "./pages/Contact"
import About from "./pages/About"

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path='contact' element={<Contact />} />
					<Route path='about' element={<About />} />
				</Route>
			</Routes>
		</Router>
	);
};
export default App;
