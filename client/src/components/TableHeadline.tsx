import {IonCol, IonRow } from '@ionic/react';


const TableHeadline: React.FC = () => {
  return (
    
    <IonRow className='l-grey-bcg'>
        <IonCol>
            icon
        </IonCol>
        <IonCol>
            title
        </IonCol>
        <IonCol>
            created at
        </IonCol>
        <IonCol>Show more</IonCol>
    </IonRow>

    
  );
};

export default TableHeadline;
