import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { deleteOneById, getAll, getOneById, updateById } from '../actions/api';
import ContentHeadline from '../components/ContentHeadline';
import PageHeader from '../components/PageHeader';
import ListContext from '../context/ListContext';

const SinglePage: React.FC = ({ location, match, history }: any) => {

  const [ element, setElement ] = useState<any>(null)

  const [ loadingData, setLoadingData ] = useState(false)

  const [ pageInfo, setPageInfo ] = useState("")

  const [ openInclude, setOpenInclude ] = useState(false)
  const [ allowEdit, setAllowEdit ] = useState(false)

  const [ allData, setAllData ] = useState([])

  const [ formData, setFormData ] = useState<any>({})

  
  const { list, setList } = useContext(ListContext);
  
  const listOf : any= {
    songs: 'playlists',
    playlists: 'songs'
  }
  
  const singular : any= {
    songs: 'song',
    playlists: 'playlist',
    authors: 'author'
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


  const updateElement = async (payload: any, action: string = '') => {
    try {
      
      setLoadingData(true)
      const options = { 
        payload: {
          id: match.params.id,
          ...payload
        },
        action
      }

      const res = await updateById(pageInfo, options)

      setElement(res[singular[pageInfo]])
      setOpenInclude(false)
      setLoadingData(false)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const deleteElement = async () => {
    try {
      
      setLoadingData(true)
      
      const res = await deleteOneById(pageInfo, { id: match.params.id })

      const id = await res[singular[pageInfo]]?.id

      const values = await list[pageInfo]?.filter((elem: any) => elem?.id !== id)

      await setList({ ...list, [pageInfo]: values })

      await history.push('/')

      setLoadingData(false)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const loadData = async () => {
    try {

      setOpenInclude(!openInclude)

      const res = await getAll(listOf[pageInfo]);

      const values = res[listOf[pageInfo]];

      setAllData(values)
      
    } catch (err: any) {
      console.log(err.message)
    }
  }

  
  const buttons: any = {
    songs: [{ value: 'Include to the playlist', color: 'success', action: () => loadData()}, {value: 'Edit', color: 'warning', action: () => setAllowEdit( !allowEdit )}, {value: 'Delete', color: 'danger', action: () =>  deleteElement()}],
    playlists: [{ value: 'Include a song', color: 'success', action: () => loadData()}, {value: 'Edit', color: 'warning', action: () => setAllowEdit( !allowEdit )}, {value: 'Delete', color: 'danger', action: () => deleteElement()}],
    authors: [false, {value: 'Edit', color: 'warning', action: () => setAllowEdit( !allowEdit )}, {value: 'Delete', color: 'danger', action: () => deleteElement()}]
  }

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
                        allData?.map((element: any) => <IonItem key={element.id}>{element.title}{!!element?.Playlists?.filter((elem: any) => elem?.id === parseInt(match?.params?.id))[0] ? <IonButton onClick={() => updateElement({ song_id: element?.id }, 'delete')}>Delete</IonButton> : <IonButton onClick={() => updateElement({ song_id: element?.id }, 'include')}>Add</IonButton>}</IonItem>)
                      }

                    </Fragment>
                  }
                  {
                    (pageInfo === 'songs' && openInclude) && <Fragment>

                      {
                        allData?.map((element: any) => <IonItem key={element.id}>{element.title}{!!element?.Songs?.filter((elem: any) => elem?.id === parseInt(match?.params?.id))[0] ? <IonButton onClick={() => updateElement({ song_id: element?.id }, 'delete')}>Delete</IonButton> : <IonButton onClick={() => updateElement({ song_id: element?.id }, 'include')}>Add</IonButton>}</IonItem>)
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
                            <IonButton onClick={() => {updateElement({id: match.params.id, ...formData}); setAllowEdit(false)}}>submit</IonButton>
                          </div> : <Fragment>
                            {element.firstName} {element.pseudo} {element.lastName} 
                          </Fragment>
                        }

                      </Fragment> : <Fragment>
                        {
                          allowEdit ? <div>
                            <IonInput type="text" name="title" onIonChange={(e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                            <IonButton onClick={() => {updateElement({id: match.params.id, ...formData}); setAllowEdit(false)}}>submit</IonButton>
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
