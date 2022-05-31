import { IonContent, IonFooter, IonGrid, IonHeader, IonList, IonPage, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { getAll } from '../actions/api';
import ContentHeadline from '../components/ContentHeadline';
import EmptyRow from '../components/EmptyRow';
import PageHeader from '../components/PageHeader';
import Row from '../components/Row';

const ListingPage: React.FC = ({ location, history }: any) => {

  const [ array, setArray ] = useState([])

  const [ loadingData, setLoadingData ] = useState(false)

  const [ pageInfo, setPageInfo ] = useState("")

  useEffect(() => {

    (async () => {
        
        try {
          
          const path = location.pathname?.replace(/\//, '')
          setPageInfo(path)

          if (!path) return
          
          setLoadingData(true)

          const res = await getAll(path);
          
          const values = res[path]
          setArray(values)
          setLoadingData(false)

        } catch (err: any) {
          console.log(err.message)
        }
      
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
