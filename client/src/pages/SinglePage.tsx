import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { listOutline, musicalNotesOutline, peopleOutline } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { deleteOneById, getAll, getOneById, updateById } from '../actions/api';
import ContentHeadline from '../components/ContentHeadline';
import EmptyRow from '../components/EmptyRow';
import ExploreContainer from '../components/ExploreContainer';
import PageHeader from '../components/PageHeader';
import Row from '../components/Row';
import './Home.css';

const SinglePage: React.FC = ({ location, match }: any) => {

  const [ element, setElement ] = useState<any>(null)

  const [ loadingData, setLoadingData ] = useState(false)

  const [ pageInfo, setPageInfo ] = useState("")

  const [ openInclude, setOpenInclude ] = useState(false)
  const [ allowEdit, setAllowEdit ] = useState(false)

  const [ allSongs, setAllSongs ] = useState([])


  const includeExcludeSong = async (song_id: any, action: string = '') => {
    try {
      
      setLoadingData(true)

      const payload = { 
        payload: {
          id: match.params.id,
          song_id
        },
        action
      }

      const res = await updateById('playlists', payload)

      const value = res;

      setElement(value.playlist)
      
      await loadSongs(false)
      
      setLoadingData(false)

    } catch (err: any) {
      console.log(err.message)
    }
  }


  const loadSongs = async (isOpen: boolean) => {
    try {

      setOpenInclude(!isOpen)

      const res = await getAll('songs');

      const values = res?.songs;
      
      setAllSongs(values)

      
    } catch (err: any) {
      console.log(err.message)
    }
  }

  useEffect(() => {

    (async () => {

        setLoadingData(true)
        
        const path = location.pathname?.replace(/[\d+ /]/g, '')
        setPageInfo(path)

        const res = await getOneById(path, { payload: {id: match.params.id} });
        
        const value = res[path.slice(0, path.length - 1)]
        setElement(value)

        setLoadingData(false)
      
    })()

    return () => {
        setElement(null)
    }
  }, [location.pathname, match.params])

  console.log(element)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <PageHeader />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonGrid>
            <ContentHeadline element={{ title: pageInfo, description: "Element of " + pageInfo }} />
          </IonGrid>

          {
            loadingData ? 'loading...' : element ? <Fragment>

              
              <IonCard>
                <IonCardContent>


                  {
                    (pageInfo === 'playlists') && <Fragment>

                      <IonButtons>
                        <IonButton style={{ margin: '0 auto'}} color="success" onClick={() => loadSongs(openInclude)}>Include a song</IonButton>
                        <IonButton style={{ margin: '0 auto'}} color="warning" onClick={() => setAllowEdit( !allowEdit )}>Edit</IonButton>
                        <IonButton style={{ margin: '0 auto'}} color="danger" onClick={() => deleteOneById( pageInfo, { id: match.params.id } )}>Delete</IonButton>
                      </IonButtons>

                    </Fragment>
                  }
                  {
                    (pageInfo === 'playlists' && openInclude) && <Fragment>

                      {
                        allSongs?.map((element: any) => <IonItem key={element.id}>{element.title}{!!element?.Playlists?.filter((elem: any) => elem?.id === parseInt(match?.params?.id))[0] ? <IonButton onClick={() => includeExcludeSong(element?.id, 'delete')}>Delete</IonButton> : <IonButton onClick={() => includeExcludeSong(element?.id, 'include')}>Add</IonButton>}</IonItem>)
                      }

                    </Fragment>
                  }

                  
                </IonCardContent>
              </IonCard>


              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    {
                      element?.title
                    }
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {
                      pageInfo === 'playlists' ? element['Songs']?.map((element: any) => <IonItem key={element.id}>{element.title}</IonItem>)

                      : 

                      pageInfo === 'songs' ? element['Songs']?.map((element: any) => <IonItem key={element.id}>{element.title}</IonItem>)

                      : null

                    }
                  </IonList>
                </IonCardContent>
              </IonCard>
              
              



            </Fragment> : null
          }
            
          
        </IonList>
        
        
        


      </IonContent>
        <IonFooter className='ion-text-center'>
          <p>&#169; Nicolai 2022</p>
        </IonFooter>
    </IonPage>
  );
};

export default withRouter(SinglePage);
