import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
 
import ThumbnailModal from './ThumbnailModal';
import ThumbnailMaker from './ThumbnailMaker';
 

//Class 형태로 만들어진 컴포넌트는 꼭 render 함수 있어야하며 render 함수 내부에서 JSX 코드를 return 해주어야함.
class App extends Component {

  //render 함수
  render() {
  
    return (
    
      <div className="App">
        <ThumbnailMaker></ThumbnailMaker>
     </div>
    );
  }
}
export default App;