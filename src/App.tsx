import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import CohortRepo from "./pages/cohortRepo";
import { css } from "emotion";
import { ARRANGER_API, SHOW_COHORT_REPO_DISCLAIMER } from "./config";
import urlJoin from "url-join";
import { API_BASIC_AUTH_PAIR, MAINTENANCE_MODE } from "./config";
import createArrangerFetcher from "./pages/cohortRepo/arrangerFetcher/createArrangerFetcher";
import Header from "./components/Header";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import MaintenancePageContent from "./components/MaintenancePageContent";

const DisclaimerBanner = () => {
  return (
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #4f5165;
        opacity: 0.8;
        color: white;
        padding: 10px;
      `}
    >
      The DAC Cohort Atlas currently has a combination of real and mock data for
      demo purposes. The data is not appropriate for research.
    </div>
  );
};

function App() {
  const customHistory = createBrowserHistory();
  const fullView = css`
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  `;
  const pageContainer = css`
    position: relative;
    flex: 1;
  `;

  const index = "cohort_centric";
  const graphqlField = "cohort";
  const projectId = "dac";

  const authorizationHeader = `Basic ${btoa(API_BASIC_AUTH_PAIR)}`;

  const client = new ApolloClient({
    uri: urlJoin(ARRANGER_API, `/${projectId}/graphql`),
    headers: {
      authorization: authorizationHeader,
    },
  });

  // This guy supports requests made by arranger's UI components
  const arrangerFetcher = createArrangerFetcher({
    defaultHeaders: {
      authorization: authorizationHeader,
    },
  });

  return (
    <ApolloProvider client={client}>
      <div className={fullView}>
        <Header />
        <div className={pageContainer}>
          {MAINTENANCE_MODE && <MaintenancePageContent />}
          {!MAINTENANCE_MODE && (
            <>
              {SHOW_COHORT_REPO_DISCLAIMER && <DisclaimerBanner />}
              <Router history={customHistory}>
                <Switch>
                  <Route exact path="/">
                    <CohortRepo
                      index={index}
                      graphqlField={graphqlField}
                      projectId={projectId}
                      arrangerFetcher={arrangerFetcher}
                    />
                  </Route>
                </Switch>
              </Router>
            </>
          )}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
