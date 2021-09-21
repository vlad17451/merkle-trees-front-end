import React from "react";
import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";
import Home from "../../pages/Home";
import Admin from "../../pages/Admin";


export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/admin">
					<Admin />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
