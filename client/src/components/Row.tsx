import { IonButton, IonCol, IonRow } from '@ionic/react';
import './ExploreContainer.css';


const Row: React.FC<any> = ({ element, pageInfo, history }: any) => {
  return (
    
    <IonRow>
        <IonCol>
            {"+"}
        </IonCol>
        <IonCol>
            {element.title}
        </IonCol>
        <IonCol>
            {element.createdAt}
        </IonCol>
        <IonCol>
            <IonButton onClick={() => history.push('/'+ pageInfo + '/' + element.id)}>
                Go to
            </IonButton>
        </IonCol>
    </IonRow>
    
  );
};

export default Row;
