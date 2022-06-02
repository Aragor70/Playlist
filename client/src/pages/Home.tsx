import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { listOutline, musicalNotesOutline, peopleOutline } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { getAll } from '../actions/api';
import CreatePopup from '../components/CreatePopup';
import EmptyRow from '../components/EmptyRow';
import Filter from '../components/Filter';
import PageHeader from '../components/PageHeader';
import Row from '../components/Row';
import TableHeadline from '../components/TableHeadline';
import ListContext from '../context/ListContext';

const Home: React.FC = ({ history }: any) => {

  
  const [ createView, setCreateView ] = useState('')

  const [ loadingData, setLoadingData ] = useState(false)
  
  const { list, setList } = useContext(ListContext);
  
  

  useEffect(() => {

    (async () => {
        try {

            setLoadingData(true)

            const res1 = await getAll('playlists');
            const res2 = await getAll('authors');
            const res3 = await getAll('songs');
            
            setList({ 
              playlists: res1.playlists,
              authors: res2.authors,
              songs: res3.songs
            })

            setLoadingData(false)

        } catch (err: any) {
            console.log(err.message)
        }

    })()

}, [])

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
                  <IonIcon slot="start" icon={musicalNotesOutline} />
                  <IonItem lines="none"><IonText className="extra-bold">General playlists</IonText></IonItem>
                  <IonButtons slot="end" className='small-to-grid'>

                    <IonButton onClick={() => history.push({
                                      
                        pathname: '/playlists'
                    
                    })} slot="end" color='primary'>Get all</IonButton>

                    <IonButton color='success' onClick={() => setCreateView('playlists')}>Add new</IonButton>
                  </IonButtons>
                  
                </IonItem>
                
                <IonGrid>
                <Filter setLoading={setLoadingData} pageInfo={'playlists'} />
                
                
              <TableHeadline />
              
                {
                  loadingData ? <EmptyRow element={{ title: "loading..." }} /> : !!list?.playlists?.length ? list?.playlists?.slice(0, 5)?.map((element: any, index: number) => <Row key={element.id} element={element} pageInfo={'playlists'} history={history} />) :  <EmptyRow element={{ title: "No playlists." }} />
                }

                </IonGrid>
                
                
              </IonCardContent>
            </IonCard>

            <IonCard>
            <IonCardContent>
          <IonItem lines="none">
            <IonIcon slot="start" icon={peopleOutline} />
            <IonItem lines="none"><IonText className="extra-bold">Authors</IonText></IonItem>
            <IonButtons slot="end" className='small-to-grid'>

              <IonButton onClick={() => history.push({
                                
                  pathname: '/authors'
              
              })} slot="end" color='primary'>Get all</IonButton>

              <IonButton color='success' onClick={() => setCreateView('authors')}>Add new</IonButton>
            </IonButtons>
          </IonItem>
          
          <IonGrid>

          <Filter setLoading={setLoadingData} pageInfo={'authors'} />
          
          <TableHeadline />

          {
            loadingData ? <EmptyRow element={{ title: "loading..." }} /> : !!list?.authors?.length ? list?.authors?.slice(0, 5)?.map((element: any, index: number) => <Row key={element.id} element={element} pageInfo={'authors'} history={history} />) :  <EmptyRow element={{ title: "No authors." }} />
          }

          </IonGrid>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
          <IonItem lines="none">
            <IonIcon slot="start" icon={listOutline} />
            <IonItem lines="none"><IonText className="extra-bold">List of songs</IonText></IonItem>
            <IonButtons slot="end" className='small-to-grid'>

              <IonButton onClick={() => history.push({
                                
                  pathname: '/songs'
              
              })} slot="end" color='primary'>Get all</IonButton>

              <IonButton color='success' onClick={() => setCreateView('songs')}>Add new</IonButton>
            </IonButtons>
          </IonItem>
          
          <IonGrid>

          <Filter setLoading={setLoadingData} pageInfo={'songs'} />
          
          
          <TableHeadline />

          {
            loadingData ? <EmptyRow element={{ title: "loading..." }} /> : !!list?.songs?.length ? list?.songs?.slice(0, 5)?.map((element: any, index: number) => <Row key={element.id} element={element} pageInfo={'songs'} history={history} />) :  <EmptyRow element={{ title: "No songs." }} />
          }

          </IonGrid>
            </IonCardContent>
          </IonCard>
        
        </IonList>
        {
          createView && <CreatePopup pageInfo={createView} setView={setCreateView} />
        }

      </IonContent>
        <IonFooter className='ion-text-center'>
          <p>&#169; Nicolai 2022</p>
        </IonFooter>
    </IonPage>
  );
};

export default withRouter(Home);
