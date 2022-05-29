import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { listOutline, musicalNotesOutline, peopleOutline } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { getAll, getOneById } from '../actions/api';
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

  const [openInclude, setOpenInclude] = useState(false)

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
                <IonCardHeader>
                  {
                    element?.title
                  }
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {
                      pageInfo === 'playlists' ? element['Songs']?.map((element: any) => element.title)

                      : 

                      pageInfo === 'songs' ? element['Songs']?.map((element: any) => element.title)

                      : null

                    }
                  </IonList>
                </IonCardContent>
              </IonCard>
              
              {
                (pageInfo === 'playlists') && <Fragment>

                  <IonButton onClick={() => setOpenInclude(!openInclude)}>Include a song</IonButton>

                </Fragment>
              }
              {
                (pageInfo === 'playlists' && openInclude) && <Fragment>

                  ciao

                </Fragment>
              }



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
