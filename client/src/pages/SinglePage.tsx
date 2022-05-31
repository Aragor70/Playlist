import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { deleteOneById, getAll, getOneById, updateById } from '../actions/api';
import ContentHeadline from '../components/ContentHeadline';
import PageHeader from '../components/PageHeader';

const SinglePage: React.FC = ({ location, match, history }: any) => {

  const [ element, setElement ] = useState<any>(null)

  const [ loadingData, setLoadingData ] = useState(false)

  const [ pageInfo, setPageInfo ] = useState("")

  const [ openInclude, setOpenInclude ] = useState(false)
  const [ allowEdit, setAllowEdit ] = useState(false)

  const [ allData, setAllData ] = useState([])

  const [ formData, setFormData ] = useState<any>({})

  
  const listOf : any= {
    songs: 'playlists',
    playlists: 'songs'
  }

  const buttons: any = {
    songs: [{ value: 'Include to the playlist', color: 'success', action: () => loadData(openInclude)}, {value: 'Edit', color: 'warning', action: () => setAllowEdit( !allowEdit )}, {value: 'Delete', color: 'danger', action: () => {deleteOneById( pageInfo, { id: match.params.id } ); history.push('/')}}],
    playlists: [{ value: 'Include a song', color: 'success', action: () => loadData(openInclude)}, {value: 'Edit', color: 'warning', action: () => setAllowEdit( !allowEdit )}, {value: 'Delete', color: 'danger', action: () => {deleteOneById( pageInfo, { id: match.params.id } ); history.push('/')}}],
    authors: [false, {value: 'Edit', color: 'warning', action: () => setAllowEdit( !allowEdit )}, {value: 'Delete', color: 'danger', action: () => {deleteOneById( pageInfo, { id: match.params.id } ); history.push('/')}}]
  }

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
      
      await loadData(false)
      
      setLoadingData(false)

    } catch (err: any) {
      console.log(err.message)
    }
  }


  const loadData = async (isOpen: boolean) => {
    try {

      setOpenInclude(!isOpen)

      const res = await getAll(listOf[pageInfo]);

      const values = res[listOf[pageInfo]];
      console.log(values)
      setAllData(values)
      
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
        
        setFormData({ ...value })
        setElement(value)

        setLoadingData(false)
      
    })()

    return () => {
        setElement(null)
    }
  }, [location.pathname, match.params])

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

                  <IonButtons>
                    {
                      buttons[pageInfo].map((element: any, index: number) => element ? <IonButton key={index} style={{ margin: '0 auto'}} color={element.color} onClick={element.action}>{element.value}</IonButton> : null)
                    }
                  </IonButtons>
                  
                  {
                    (pageInfo === 'playlists' && openInclude) && <Fragment>

                      {
                        allData?.map((element: any) => <IonItem key={element.id}>{element.title}{!!element?.Playlists?.filter((elem: any) => elem?.id === parseInt(match?.params?.id))[0] ? <IonButton onClick={() => includeExcludeSong(element?.id, 'delete')}>Delete</IonButton> : <IonButton onClick={() => includeExcludeSong(element?.id, 'include')}>Add</IonButton>}</IonItem>)
                      }

                    </Fragment>
                  }
                  {
                    (pageInfo === 'songs' && openInclude) && <Fragment>

                      {
                        allData?.map((element: any) => <IonItem key={element.id}>{element.title}{!!element?.Songs?.filter((elem: any) => elem?.id === parseInt(match?.params?.id))[0] ? <IonButton onClick={() => includeExcludeSong(element?.id, 'delete')}>Delete</IonButton> : <IonButton onClick={() => includeExcludeSong(element?.id, 'include')}>Add</IonButton>}</IonItem>)
                      }

                    </Fragment>
                  }

                  
                </IonCardContent>
              </IonCard>


              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    {
                      (pageInfo === 'authors') ? <Fragment>

                          
                        {
                          allowEdit ? <div>
                            <IonInput type="text" name="firstName" placeholder="firstName" onIonChange={(e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                            <IonInput type="text" name="lastName" placeholder="lastName" onIonChange={(e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                            <IonInput type="text" name="pseudo" placeholder="pseudo" onIonChange={(e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                            <IonButton onClick={() => {updateById(pageInfo, {payload: {id: match.params.id, ...formData}}); setAllowEdit(false)}}>submit</IonButton>
                          </div> : <Fragment>
                            {element.firstName} {element.pseudo} {element.lastName} 
                          </Fragment>
                        }

                      </Fragment> : <Fragment>
                        {
                          allowEdit ? <div>
                            <IonInput type="text" name="title" onIonChange={(e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                            <IonButton onClick={() => {updateById(pageInfo, {payload: {id: match.params.id, ...formData}}); setAllowEdit(false)}}>submit</IonButton>
                          </div> : element.title
                        }
                      </Fragment>
                      
                    }
                    
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {
                      pageInfo === 'playlists' ? element['Songs']?.map((element: any) => <IonItem key={element.id}>{element.title}</IonItem>)

                      : 

                      pageInfo === 'songs' ? element['Authors']?.map((element: any) => <IonItem key={element.id}>{element.firstName} {element.pseudo} {element.lastName}</IonItem>)

                      : 
                      
                      pageInfo === 'authors' ? element['Songs']?.map((element: any) => <IonItem key={element.id}>{element.title}</IonItem>)

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
