import { IonCard, IonCardContent, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import './ExploreContainer.css';
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
            console.log(pageInfo)
            const res = await getAll(pageInfo, formData);

            setArray(res[pageInfo])
            setLoading(false)

        })()

    }, [formData, pageInfo])

  return (
    
    <IonGrid>
        
        <IonRow>
            <IonCol>
                Filter
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
                <IonLabel>
                    <span>Title</span>
                    <IonInput name='phrase' placeholder="Search by phrase" ref={phrase} type='text' onIonChange={(e: any) => handleChange(e)}></IonInput>
                </IonLabel>
            </IonCol>
            <IonCol>
                <IonLabel>
                    <span>Uploaded from</span>
                    <IonInput name='startDate' type='date' onIonChange={(e: any) => handleChange(e)}></IonInput>
                </IonLabel>
            </IonCol>
            <IonCol>
                <IonLabel>
                    <span>Uploaded to</span>
                    <IonInput name='endDate' type='date' onIonChange={(e: any) => handleChange(e)}></IonInput>
                </IonLabel>
            </IonCol>
        </IonRow>
    </IonGrid>
    
  );
};

export default Filter;
