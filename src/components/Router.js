import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component = {}/>
            {/* Todo: put the class in the component! Also import the component! */}
        </Switch>
    </BrowserRouter>
);

export default Router;