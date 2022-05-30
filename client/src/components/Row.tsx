import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react';
import { musicalNote, musicalNoteOutline } from 'ionicons/icons';
import moment from 'moment';


const Row: React.FC<any> = ({ element, pageInfo, history }: any) => {
  return (
    
    <IonRow>
        <IonCol>
            <IonIcon icon={musicalNoteOutline}></IonIcon>
        </IonCol>
        {
            pageInfo === "authors" ? <IonCol>

            {element.firstName} {element?.pseudo} {element?.lastName}  
        </IonCol> : <IonCol>

            {element.title}
            </IonCol>
        }
        
        <IonCol>
            {moment(element.createdAt).format('DD-MM-YYYY hh:mm:ss')}
        </IonCol>
        <IonCol>
            <IonButton size="small" onClick={() => history.push('/'+ pageInfo + '/' + element.id)}>
                Go to
            </IonButton>
        </IonCol>
    </IonRow>
    
  );
};

export default Row;
