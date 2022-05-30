import { IonCard, IonCardContent, IonCol, IonRow, IonText } from '@ionic/react';

interface ContainerProps { 
    element: any
}

const EmptyRow: React.FC<ContainerProps> = ({ element }) => {
  return (
    
    <IonRow>
        <IonCol>
            <IonCard>
                <IonCardContent className='ion-items-center l-grey-bcg'>
                    <IonText>
                        {element.title}
                    </IonText>
                </IonCardContent>
            </IonCard>
        </IonCol>
    </IonRow>

    
  );
};

export default EmptyRow;
