import React from "react";
import "./App.css";
import { MainScreenComponent } from "./container/mainScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MeetingComponent } from "./exampleComponent/simpleDyteClient";
import { CustomLayoutButton } from "./exampleComponent/customLayoutButton";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={MainScreenComponent} />
          <Route
            path="/simple-dyte-client/meeting/:room/:id"
            component={MeetingComponent}
          />
          <Route
            path="/custom-layout-button/meeting/:room/:id"
            component={CustomLayoutButton}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
