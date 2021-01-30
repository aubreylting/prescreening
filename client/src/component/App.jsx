import React from 'react';
import EmployeeData  from '../data/employeeData.js';


class App extends React.Component {
  constructor(){
    super();

    this.state = {
      originalData: [],
      filteredData: [],
      departmentSelected: false,
      ageSelected: false
    };
  }

  componentDidMount() {
    this.setState({
      originalData: EmployeeData,
      filteredData: EmployeeData,
      departmentSelected: false,
      ageSelected: false
    });
  }

  searchName(name){
    //console.log(name);
    let aux = JSON.parse(JSON.stringify(this.state.originalData));

    if (name!== "") {
      aux = aux.filter(row => row.name.toLowerCase().includes(name.toLowerCase()));
    }

    this.setState({
      filteredData: aux
    });
  }

  handleSelectedDepartment(department) {
    //console.log(department);
    let aux = JSON.parse(JSON.stringify(this.state.originalData));
    let auxSelected = this.state.filteredData;

    if (department!== "" && !this.state.ageSelected) {
      aux = aux.filter(row => row.department === department);
    } else if (department!== "" && this.state.ageSelected){
      aux = auxSelected.filter(row => row.department === department)
    } else {
      aux = this.state.originalData
    }

    this.setState({
      filteredData: aux,
      departmentSelected: true
    });
  }

  handleSelectedAge(age) {
    let aux = JSON.parse(JSON.stringify(this.state.originalData));
    let auxSelected = this.state.filteredData;

    if (age === "20" && !this.state.departmentSelected) {
      aux = aux.filter(row => (row.age >= 20 && row.age <30));
    }
    else if (age === "30" && !this.state.departmentSelected) {
      aux = aux.filter(row => (row.age >= 30 && row.age <40));
    }
    else if (age === "40" && !this.state.departmentSelected ) {
      aux = aux.filter(row => (row.age >= 40 && row.age <50));
    }
    else if (age === "20" && this.state.departmentSelected) {
      aux = auxSelected.filter(row => (row.age >= 20 && row.age <30));
    }
    else if (age === "30" && this.state.departmentSelected) {
      aux = auxSelected.filter(row => (row.age >= 30 && row.age <40));
    }
    else if (age === "40" && this.state.departmentSelected ) {
      aux = auxSelected.filter(row => (row.age >= 40 && row.age <50));
    } else {
      aux = this.state.originalData
    }
    
    this.setState({
      filteredData: aux,
      ageSelected: true
    });
  }
  

  render() {

    return (
      <div>
        <li>
        <input className="search-wrapper cf" type="text" placeholder="Search by Name" onChange={(e)=>this.searchName(e.target.value)} />
        Department: <select className="select-dropdown" onChange={e => this.handleSelectedDepartment(e.target.value)}>
          <option />
          <option>Music</option>
          <option>Film</option>
          <option>Sports</option>
        </select>
        Age: <select  className="select-dropdown" onChange={e => this.handleSelectedAge(e.target.value)}>
          <option />
          <option value ='20'>20-30</option>
          <option value ='30'>30-40</option>
          <option value ='40'>40-50</option>
        </select>
        <button onClick ={() => this.componentDidMount()} >Refresh</button>
        </li>
        <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>              
                {this.state.filteredData.map(data=>{
                return(
                  <tr key = {data.name}>
                    <td data-column="Name">{data.name}</td>
                    <td data-column="Department">{data.department}</td>
                    <td data-column="Age">{data.age}</td>
                  </tr>
                )
                })}
            </tbody>
          </table>
      </div>
    );
  }
}

export default App;