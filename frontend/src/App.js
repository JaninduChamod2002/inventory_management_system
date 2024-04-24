import './App.css';
import Customer from './components/Customer'; // Import the Customer component

function App() {
  return (
    <div className="App">
      <h1>Add New Customer</h1>
      <Customer /> {/* Render the Customer component */}
    </div>
  );
}

export default App;
