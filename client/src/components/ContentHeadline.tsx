import { IonCol, IonIcon, IonRow } from '@ionic/react';
import { musicalNotes } from 'ionicons/icons';

interface ContainerProps { 
    element: any
}

const ContentHeadline: React.FC<ContainerProps> = ({ element }) => {

  return (
    
    <IonRow className="l-grey-bcg" style={{ border: 'none' }}>
        <IonCol style={{ justifyContent: 'center' }}>
            <IonIcon icon={musicalNotes} />
        </IonCol>
        <IonCol style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <h1>{element.title === 'playlists' ? 'playlist' : element.title === 'songs' ? 'song' : element.title === 'authors' ? 'author' : element?.title || ''}</h1>
                <p>{element.description}</p>
        </IonCol>
    </IonRow>
    
  );
};

export default ContentHeadline;
