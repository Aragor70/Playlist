import { IonCol, IonIcon, IonItem, IonRow } from '@ionic/react';
import { musicalNotes } from 'ionicons/icons';
import './ExploreContainer.css';

interface ContainerProps { 
    element: any
}

const ContentHeadline: React.FC<ContainerProps> = ({ element }) => {

  return (
    
    <IonRow className="l-grey-bcg" style={{ border: 'none' }}>
        <IonCol style={{ justifyContent: 'center' }}>
            <IonIcon icon={musicalNotes} ></IonIcon>
        </IonCol>
        <IonCol style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <h1>{element.title === 'playlists' ? 'playlist' : element.title === 'songs' ? 'song' : element.title === 'authors' ? 'author' : element?.title || 'N/A'}</h1>
                <p>{element.description}</p>
        </IonCol>
    </IonRow>
    
  );
};

export default ContentHeadline;
