import { IonButton, IonButtons, IonInput, IonItem, IonText } from '@ionic/react';
import { Fragment, useContext, useState } from 'react';
import { createNew } from '../actions/api';
import ListContext from '../context/ListContext';


const CreatePopup: React.FC<any> = ({ pageInfo="", setView }: any) => {

    const [formData, setFormData] = useState<any>({
      title: '',
      firstName: '',
      lastName: '',
      pseudo: ''
    })
    
    const { list, setList } = useContext(ListContext);

    
    const handleChange = (e: any) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const inputs : any= {
      authors: ['firstName', 'lastName', 'pseudo'],
      songs: ['title'],
      playlists: ['title']
    }
    
    const singular : any= {
      songs: 'song',
      playlists: 'playlist',
      authors: 'author'
    }

    
    const handleCreate = async(e: any) => {
      
      e.preventDefault();

      const res = await createNew(pageInfo, formData);

      const element = await res[singular[pageInfo]];

      const values = [...list[pageInfo], element];

      await setList({ ...list, [pageInfo]: values });

      setView(false)

    }
    
  return (
    <Fragment>

      
    <form onSubmit={(e: any) => handleCreate(e)}>
      
      {
        pageInfo && inputs[pageInfo]?.map((element: any, index: number) => <Fragment key={index}>
          
          <IonItem>
            <IonText slot="start">{element || ''}</IonText>
            <IonInput name={element} onIonChange={(e) => handleChange(e)} value={formData[element] || ""} />
            
          </IonItem>

        </Fragment>)
      }
      

      <IonButtons>
        
        <IonButton type="submit">
          Create
        </IonButton>
        <IonButton color="warning" onClick={() => setView('')}>
          Cancel
        </IonButton>

      </IonButtons>



    </form>

    <div className="shadow" onClick={() => setView('')}></div>
    </Fragment>
    
  );
};

export default CreatePopup;
