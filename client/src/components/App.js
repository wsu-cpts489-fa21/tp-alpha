import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { faWindowClose, faEdit, faCalendar, 
        faSpinner, faSignInAlt, faBars, faTimes, faSearch,
        faSort, faTrash, faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import FeedPage from './FeedPage.js';
import RoundsPage from './RoundsPage.js';
import CoursesPage from './CoursesPage.js';
import BuddiesPage from './BuddiesPage.js';
import SideMenu from './SideMenu.js';
import AppMode from './AppMode.js';

library.add(faWindowClose,faEdit, faCalendar, 
            faSpinner, faSignInAlt, faBars, faTimes, faSearch,
            faSort, faTrash, faEye, faUserPlus, faGithub);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  modalOpen: false,
                  filter: "",
                  editId: -1,
                  courseEditId: -1,
                  numStrokes: 0,
                  minTime: 10000000000,
                  courses: [{name: "test",
                            addresss: "1234 test",
                            phoneNumber: "1234",
                            location: "home",
                            picture: "png",
                            tees: []}],
                  userData: {
                    accountData: {},
                    identityData: {},
                    speedgolfData: {},
                    rounds: [],
                    roundCount: 0},
                  authenticated: false                  
                  };
    this.getCourseData();
   this.getNumStrokes();
   // alert(this.state.numStrokes);
  }

  componentDidMount() {
    document.addEventListener("click",this.handleClick, true);
    if (!this.state.authenticated) { 
      //Use /auth/test route to (re)-test authentication and obtain user data
      fetch("/auth/test")
        .then((response) => response.json())
        .then((obj) => {
          if (obj.isAuthenticated) {
            this.logInUser(obj.user);
          }
        })
    }
    //this.getRoundStrokes(); 
  }
  

  /*
   handleClick -- document-level click handler assigned in componentDidMount()
   using 'true' as third param to addEventListener(). This means that the event
   handler fires in the _capturing_ phase, not the default _bubbling_ phase.
   Thus, the event handler is fired _before_ any events reach their lowest-level
   target. If the menu is open, we want to close
   it if the user clicks anywhere _except_ on a menu item, in which case we
   want the menu item event handler to get the event (through _bubbling_).
   We identify this border case by comparing 
   e.target.getAttribute("role") to "menuitem". If that's NOT true, then
   we close the menu and stop propagation so event does not reach anyone
   else. However, if the target is a menu item, then we do not execute 
   the if body and the event bubbles to the target. 
  */
  
  handleClick = (e) => {
    if (this.state.menuOpen && e.target.getAttribute("role") !== "menuitem") {
      this.toggleMenuOpen();
      e.stopPropagation();
    }
  }

  /*
   * Menu item functionality 
   */
  logOut = () => {
    this.setState({mode:AppMode.LOGIN,
                   userData: {
                    accountData: {},
                    identityData: {},
                    speedgolfData: {},
                    rounds: [],
                    },
                   authenticated: false,
                   menuOpen: false});
  }
  
   //User interface state management methods
   
  setMode = (newMode) => {
    this.setState({mode: newMode});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  toggleModalOpen = () => {
    this.setState(prevState => ({dialogOpen: !prevState.dialogOpen}));
  }

  //Account Management methods
   
  accountExists = async(email) => {
    const res = await fetch("/user/" + email);
    return (res.status === 200);
  }

  getAccountData = (email) => {
    return JSON.parse(localStorage.getItem(email));
  }

  authenticateUser = async(id, pw) => {
    const url = "/auth/login?username=" + id + 
      "&password=" + pw;
    const res = await fetch(url,{method: 'POST'});
    if (res.status == 200) { //successful login!
      return true;
    } else { //Unsuccessful login
      return false;
    } 
  }

  logInUser = (userObj) => {
      this.setState({userData: userObj,
                     mode: AppMode.FEED,
                     authenticated: true});
  }

  createAccount = async(data) => {
    const url = '/users/' + data.accountData.id;
    const res = await fetch(url, {
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        method: 'POST',
        body: JSON.stringify(data)}); 
    if (res.status == 201) { 
        return("New account created with email " + data.accountData.id);
    } else { 
        const resText = await res.text();
        return("New account was not created. " + resText);
    }
  }

  updateUserData = (data) => {
   localStorage.setItem(data.accountData.email,JSON.stringify(data));
   this.setState({userData: data});
  }

  //Round Management methods

  addRound = async(newRoundData) => {
    const url = "/rounds/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
                  method: 'POST',
                  headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                                },
                          method: 'POST',
                          body: JSON.stringify(newRoundData)
                }); 
    if (res.status == 201) { 
      const newRounds = [...this.state.userData.rounds];
      newRounds.push(newRoundData);
      const newUserData = {accountData: this.state.userData.accountData,
                           identityData: this.state.userData.identityData,
                           speedgolfData: this.state.userData.speedgolfData,
                           rounds: newRounds};
      this.setState({userData: newUserData});
   
      return("New round logged.");
    } else { 
      const resText = await res.text();
      return("New Round could not be logged. " + resText);
    }
  }

  passEditId = (val) => {
      this.setState({editId: val});
  }

  passCourseEditId = (val) => {
    this.setState({courseEditId: val});
}

  updateRound = async(newRoundData) => {
    const newRounds = [...this.state.userData.rounds];

    newRounds[this.state.editId] = newRoundData;
    const response = await fetch("/users/" + this.state.userData.accountData.id);
    const json = await response.json();
    const data = JSON.parse(json);
    var roundId = data.rounds[this.state.editId].id;
    var round =data.rounds[this.state.editId];
    //alert(roundId);
    let res = await fetch(("/rounds/" + this.state.userData.accountData.id + "/" + roundId), {
      method: 'PUT',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
              method: 'PUT',
              body: JSON.stringify(newRounds)
    }); 
      if (res.status == 201) { 
    
      const newUserData = {
        accountData: this.state.userData.accountData,
        identityData: this.state.userData.identityData,
        speedgolfProfileData: this.state.userData.speedgolfProfileData,
        rounds: newRounds, 
        roundCount: this.state.userData.roundCount
      }
      this.setState({userData: newUserData});

      return(" round edited.");
      } else { 
      const resText = await res.text();
      return(" Round could not be edited. " + resText);
      }
    }

  deleteRound = async (id) => {
    const newRounds = [...this.state.userData.rounds];
    let r;
    newRounds.splice(id, 1);
  
    const response = await fetch("/users/" + this.state.userData.accountData.id);
    const json = await response.json();
    const data = JSON.parse(json);
    var roundId = data.rounds[id].id;
    var round =data.rounds[id];
    //alert(roundId);
    let res = await fetch(("/rounds/" + this.state.userData.accountData.id + "/" + roundId), {
      method: 'DELETE',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
              method: 'DELETE',
    }); 
      if (res.status == 201) { 
        
        const newUserData = {
          accountData: this.state.userData.accountData,
          identityData: this.state.userData.identityData,
          speedgolfProfileData: this.state.userData.speedgolfProfileData,
          rounds: newRounds, 
          roundCount: this.state.userData.roundCount
        }
        this.setState({userData: newUserData});
      alert("round deleted");
      return(" round deleted.");
      } else { 
      const resText = await res.text();
      return(" Round could not be deleted. " + resText);
      }
  }
  //Course management methods

filterResults = (val) =>{
  this.setState({filter: val})
}


editCourse = async(newCourseData) => {
  const newCourses = [...this.state.courses];

  newCourses[this.state.courseEditId] = newCourseData;
 
  const response = await fetch("/courses/");
    const json = await response.json();
    const data = JSON.parse(json);
    var courseId = data[this.state.courseEditId].id;
    alert(courseId);
  let res = await fetch(("/courses/" + courseId), {
    method: 'PUT',
    headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
                  },
            method: 'PUT',
            body: JSON.stringify(newCourseData)
  }); 
    if (res.status == 201) { 
    this.setState({courses: newCourses});

    return(" Course edited.");
    } else { 
    const resText = await res.text();
    return(" Course could not be edited. " + resText);
    }

}

deleteCourse = async(id) => {
  const newCourses = [...this.state.courses];
  let r;
  newCourses.splice(id, 1);

  const response = await fetch("/courses/");
  const json = await response.json();
  const data = JSON.parse(json);
  var courseId = data[id].id;
  //alert(roundId);
  let res = await fetch(("/courses/" + courseId), {
    method: 'DELETE',
    headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
                  },
            method: 'DELETE',
  }); 
    if (res.status == 201) { 
  
      this.setState({courses: newCourses});
    alert("Course deleted");
    return(" Course deleted.");
    } else { 
    const resText = await res.text();
    return(" Course could not be deleted. " + resText);
    }

}
  
  getCourseData = async() => {
    const res = await fetch("/courses/", {method: 'GET'});
    const json = await res.json();
    if(res.status == 200){
      var c = JSON.parse(json);
      this.setState({courses: c});
    }
    else{
      return ("Could not get courses");
    }
  }

  addCourse = async(newCourse) => {
    let res = await fetch("/courses/", {
      method: 'POST',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
              method: 'POST',
              body: JSON.stringify(newCourse)
    }); 
    if (res.status == 201) { 
      const newCourses = [...this.state.courses];
      newCourses.push(newCourse);
      this.setState({courses: newCourses});
      alert("added course");
      return("New course added.");
    } else { 
      const resText = await res.text();
      return("New course could not be added. " + resText);
    }
  }

  getNumStrokes = () => {
    for (var i = 0; i < this.state.userData.rounds.length; i++) { 
      this.setState({numStrokes: this.state.numStrokes + this.state.userData.rounds[i].strokes});
    }
    //return this.state.numStrokes;
  //  alert(this.state.userData.rounds);
   // alert(this.state.numStrokes);
  }

  render() {
    return (
      <>
        <NavBar mode={this.state.mode}
                menuOpen={this.state.menuOpen}
                toggleMenuOpen={this.toggleMenuOpen}
                modalOpen={this.state.modalOpen}
                toggleModalOpen={this.toggleModalOpen}
                userData={this.state.userData}
                updateUserData={this.updateUserData}
                 /> 
        <ModeTabs mode={this.state.mode}
                  setMode={this.setMode} 
                  menuOpen={this.state.menuOpen}
                  modalOpen={this.state.modalOpen}
                  /> 
        {this.state.menuOpen  ? <SideMenu logOut={this.logOut}/> : null}
        {
          {LoginMode:
            <LoginPage modalOpen={this.state.modalOpen}
                       toggleModalOpen={this.toggleModalOpen} 
                       logInUser={this.logInUser}
                       createAccount={this.createAccount}
                       accountExists={this.accountExists}
                       authenticateUser={this.authenticateUser}/>, 
          FeedMode:
            <FeedPage modalOpen={this.state.modalOpen}
                      toggleModalOpen={this.toggleModalOpen} 
                      menuOpen={this.state.menuOpen}
                      userId={this.state.userId}/>,
          RoundsMode:
            <RoundsPage rounds={this.state.userData.rounds}
                        numStrokes ={this.state.numStrokes}
                        getNumStrokes={this.getNumStrokes}
                        passEditId = {this.passEditId}
                        addRound={this.addRound}
                        updateRound={this.updateRound}
                        deleteRound={this.deleteRound}
                        modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}/>,
          CoursesMode:
            <CoursesPage courses={this.state.courses}
                        passCourseEditId={this.passCourseEditId}
                        addCourse={this.addCourse}
                        editCourse={this.editCourse}
                        deleteCourse={this.deleteCourse}
                        filter={this.state.filter}
                        modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}
                        filterResults={this.filterResults}
                        showReviews={this.showReviews}/>,
          BuddiesMode:
            <BuddiesPage modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}/>
        }[this.state.mode]
        }
      </>
    ); 
  }

}
export default App;