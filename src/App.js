import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Header, DropZone, TableComponent } from './components'
import { store } from './components/lib/store'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: monospace;
`

export const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <AppWrapper>
          <Header />
          <Switch>
            <Route exact path="/" component={DropZone} />
            <Route exact path="/table" component={TableComponent} />
          </Switch>
        </AppWrapper>
      </Provider>
    </Router>
  );
}
