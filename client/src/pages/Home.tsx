import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { listOutline, musicalNotesOutline, peopleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import EmptyRow from '../components/EmptyRow';
import ExploreContainer from '../components/ExploreContainer';
import Filter from '../components/Filter';
import PageHeader from '../components/PageHeader';
import Row from '../components/Row';
import './Home.css';

const Home: React.FC = ({ history, location }: any) => {

  const [ playlists, setPlaylists ] = useState([])
  const [ authors, setAuthors ] = useState([])
  const [ songs, setSongs ] = useState([])

  const [ loadingData, setLoadingData ] = useState(false)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <PageHeader />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonList className='cards'>
          
          <IonCard>
            <IonCardContent>

              
          <IonItem lines="none">
            <IonIcon slot="start" icon={musicalNotesOutline}></IonIcon>
            <IonItem lines="none"><IonText className="extra-bold">General playlists</IonText></IonItem>
            <IonButton onClick={() => history.push({
                              
                pathname: '/playlists'
            
            })} slot="end">Get all</IonButton>
          </IonItem>
          
          <IonGrid>
          <Filter setArray={setPlaylists} setLoading={setLoadingData} pageInfo={'playlists'} />
          <IonRow className='l-grey-bcg'>
            <IonCol>
                icon
            </IonCol>
            <IonCol>
                title
            </IonCol>
            <IonCol>
                created at
            </IonCol>
            <IonCol>Show more</IonCol>
        </IonRow>
        
          {
            loadingData ? <EmptyRow element={{ title: "loading..." }} /> : !!playlists.length ? playlists.slice(0, 5).map((element: any, index: number) => <Row key={element.id} element={element} pageInfo={'playlists'} history={history} />) :  <EmptyRow element={{ title: "No playlists." }} />
          }

          </IonGrid>
          
              
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
          <IonItem lines="none">
            <IonIcon slot="start" icon={peopleOutline}></IonIcon>
            <IonItem lines="none"><IonText className="extra-bold">Authors</IonText></IonItem>
            <IonButton onClick={() => history.push({
                              
                pathname: '/authors',
                state: { new_wallet: true }
            
            })} slot="end">Get all</IonButton>
          </IonItem>
          
          <IonGrid>

          <Filter setArray={setAuthors} setLoading={setLoadingData} pageInfo={'authors'} />
          <IonRow className='l-grey-bcg'>
            <IonCol>
                icon
            </IonCol>
            <IonCol>
                title
            </IonCol>
            <IonCol>
                created at
            </IonCol>
            <IonCol>Show more</IonCol>
          </IonRow>

          {
            loadingData ? <EmptyRow element={{ title: "loading..." }} /> : !!playlists.length ? authors.slice(0, 5).map((element: any, index: number) => <Row key={element.id} element={element} pageInfo={'authors'} history={history} />) :  <EmptyRow element={{ title: "No playlists." }} />
          }

          </IonGrid>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
          <IonItem lines="none">
            <IonIcon slot="start" icon={listOutline}></IonIcon>
            <IonItem lines="none"><IonText className="extra-bold">List of songs</IonText></IonItem>
            <IonButton onClick={() => history.push({
                              
                pathname: '/songs',
                state: { new_wallet: true }
            
            })} slot="end">Get all</IonButton>
          </IonItem>
          
          <IonGrid>

          <Filter setArray={setSongs} setLoading={setLoadingData} pageInfo={'songs'} />
          <IonRow className='l-grey-bcg'>
            <IonCol>
                icon
            </IonCol>
            <IonCol>
                title
            </IonCol>
            <IonCol>
                created at
            </IonCol>
            <IonCol>Show more</IonCol>
        </IonRow>

          {
            loadingData ? <EmptyRow element={{ title: "loading..." }} /> : !!playlists.length ? songs.slice(0, 5).map((element: any, index: number) => <Row key={element.id} element={element} pageInfo={'songs'} history={history} />) :  <EmptyRow element={{ title: "No playlists." }} />
          }

          </IonGrid>
            </IonCardContent>
          </IonCard>
        
        </IonList>


      </IonContent>
        <IonFooter className='ion-text-center'>
          <p>&#169; Nicolai 2022</p>
        </IonFooter>
    </IonPage>
  );
};

export default withRouter(Home);
