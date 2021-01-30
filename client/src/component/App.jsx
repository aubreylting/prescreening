import React from 'react';
import EmployeeData  from '../data/employeeData.js';


class App extends React.Component {
  constructor(){
    super();

    this.state = {
      originalData: [],
      filteredData: []
    };
  }

  componentDidMount() {
    this.setState({
      originalData: EmployeeData,
      filteredData: EmployeeData
    });
  }

  searchName(name){
    //console.log(name);
    let aux = JSON.parse(JSON.stringify(this.state.originalData));

    if (name!== "") {
      aux = aux.filter(row => row.name.includes(name));
    }

    this.setState({
      filteredData: aux
    });
  }

  handleSelectedDepartment(department) {
    //console.log(department);
    let aux = JSON.parse(JSON.stringify(this.state.filteredData));

    if (department!== "") {
      aux = aux.filter(row => row.department === department);
    }else{
      aux = this.state.originalData
    }

    this.setState({
      filteredData: aux
    });
  }

  handleSelectedAge(age) {
    let aux = JSON.parse(JSON.stringify(this.state.filteredData));

    if (age === "20") {
      aux = aux.filter(row => (row.age >= 20 && row.age <30));
    }
    else if (age === "30") {
      aux = aux.filter(row => (row.age >= 30 && row.age <40));
    }
    else if (age === "40") {
      aux = aux.filter(row => (row.age >= 40 && row.age <50));
    } else{
      aux = this.state.originalData
    }

    this.setState({
      filteredData: aux
    });
  }
  

  render() {

    return (
      <div>
        <input type="text" placeholder="Search by Name" onChange={(e)=>this.searchName(e.target.value)} />
        Department: <select onChange={e => this.handleSelectedDepartment(e.target.value)}>
          <option />
          <option>Music</option>
          <option>Film</option>
          <option>Sports</option>
        </select>
        Age: <select onChange={e => this.handleSelectedAge(e.target.value)}>
          <option />
          <option value ='20'>20-30</option>
          <option value ='30'>30-40</option>
          <option value ='40'>40-50</option>
        </select>
        {this.state.filteredData.map(data=>{
          return(
          <div key = {data.name}>
            <ul>
              <li>
                <span style = {{paddingRight:'10px'}}>{data.name}</span>
                <span style = {{paddingRight:'10px'}}>{data.department}</span>
                <span style = {{paddingRight:'10px'}}>{data.age}</span>
              </li>
            </ul>
          </div>
          )
        })}
      </div>
    );
  }
}

export default App;