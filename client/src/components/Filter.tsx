import { IonCard, IonCardContent, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAll } from '../actions/api';

interface ContainerProps { 
    setArray: any, setLoading: any, pageInfo: string
}

const Filter: React.FC<ContainerProps> = ({ setArray, setLoading, pageInfo = '' }) => {

    const phrase: any = null
    const startDate: any = null
    const endDate: any = null

    const [formData, setFormData] = useState({
        phrase: '',
        startDate: '',
        endDate: ''
    })

    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {

        
        (async () => {

            setLoading(true)

            const res = await getAll(pageInfo, formData);

            setArray(res[pageInfo])
            setLoading(false)

        })()

        return () => {
            setArray([])
        }

    }, [formData, pageInfo])

  return (
    
    <IonGrid>
        
        <IonRow>
            <IonCol>
                <IonText className='extra-bold'>Filter</IonText>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
                <IonLabel>
                    <IonText slot='start'>Uploaded from</IonText>
                    <IonInput name='startDate' type='date' onIonChange={(e: any) => handleChange(e)}></IonInput>
                </IonLabel>
            </IonCol>
            <IonCol>
                <IonLabel>
                    <IonText slot='start'>Uploaded to</IonText>
                    <IonInput name='endDate' type='date' onIonChange={(e: any) => handleChange(e)}></IonInput>
                </IonLabel>
            </IonCol>
        </IonRow>
        <IonRow>
            
            <IonLabel style={{ width: '100%' }}>
                <IonInput name='phrase' value={formData?.phrase || ""} placeholder="Search by phrase" ref={phrase} type='text' onIonChange={(e: any) => handleChange(e)}></IonInput>
            </IonLabel>
        </IonRow>
    </IonGrid>
    
  );
};

export default Filter;
