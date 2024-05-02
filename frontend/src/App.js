import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = {
    data: [],
    error: null
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/hall/list-create')
      .then(res => {
        if (Array.isArray(res.data)) {
          this.setState({ data: res.data });
        } else {
          this.setState({ error: 'Invalid data format received' });
        }
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    }

    return (
      <div>
        <h1>API Data</h1>
        <ul>
          {this.state.data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;