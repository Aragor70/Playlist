import { IonButton, IonCard, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { listOutline, musicalNotesOutline, peopleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { getAll } from '../actions/api';
import ContentHeadline from '../components/ContentHeadline';
import EmptyRow from '../components/EmptyRow';
import ExploreContainer from '../components/ExploreContainer';
import PageHeader from '../components/PageHeader';
import Row from '../components/Row';
import './Home.css';

const ListingPage: React.FC = ({ location, history }: any) => {

  const [ array, setArray ] = useState([])


  const [ loadingData, setLoadingData ] = useState(false)

  const [ pageInfo, setPageInfo ] = useState("")

  useEffect(() => {

    (async () => {

        setLoadingData(true)
        
        const path = location.pathname?.replace(/\//, '')
        setPageInfo(path)


        const res = await getAll(path);
        
        const values = res[path]
        setArray(values)
        setLoadingData(false)
      
    })()

    return () => {
      setArray([])
    }
  }, [location.pathname])


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
            <ContentHeadline element={{ title: pageInfo, description: "List of " + pageInfo }} />
          </IonGrid>
        </IonList>
        <IonList>
            {
              loadingData ? <EmptyRow element={{ title: "loading..." }} /> : !!array?.length ? array.map((element: any) => <Row key={element.id} element={element} history={history} pageInfo={pageInfo} />) : <EmptyRow element={{ title: "No " + pageInfo }} />
            }
        </IonList>
        
        


      </IonContent>
        <IonFooter className='ion-text-center'>
          <p>&#169; Nicolai 2022</p>
        </IonFooter>
    </IonPage>
  );
};

export default withRouter(ListingPage);
