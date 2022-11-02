import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './redux/store';
import App from './App';
import Navigation from './components/Navigation';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Navigation />,
      <App />,
    </Provider>,
  </BrowserRouter>,
  document.querySelector('#root')
);



