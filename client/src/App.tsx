import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './style/style.css';
import ListingPage from './pages/ListingPage';
import SinglePage from './pages/SinglePage';
import { useEffect, useMemo, useState } from 'react';
import ListContext from './context/ListContext';

setupIonicReact();

const App: React.FC = () => {

  const [list, setList] = useState({})


  useEffect(() => {
    setList({
      playlists: [],
      authors: [],
      songs: []
    })
  }, [])


  const value = useMemo(() => ({ list, setList }), [list]);

  return (
    <ListContext.Provider value={value}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/playlists">
              <ListingPage />
            </Route>
            <Route exact path="/playlists/:id">
              <SinglePage />
            </Route>
            <Route exact path="/authors">
              <ListingPage />
            </Route>
            <Route exact path="/authors/:id">
              <SinglePage />
            </Route>
            <Route exact path="/songs">
              <ListingPage />
            </Route>
            <Route exact path="/songs/:id">
              <SinglePage />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </ListContext.Provider>
  );
}

export default App;
