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
// <div className='bg-img' >
		// 	<section className='h-screen bg-green-300 flex items-center justify-center text-center text-3xl'>
		// 		<p>
		// 			Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
		// 			iste, ducimus quos adipisci libero saepe commodi facilis officia
		// 			accusamus! Quaerat veritatis itaque earum a quae vitae aspernatur
		// 			asperiores, placeat provident.
		// 		</p>
		// 	</section>
		// </div>
export default App;
