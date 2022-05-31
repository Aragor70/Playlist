import { IonCol, IonGrid, IonInput, IonLabel, IonRow, IonText } from '@ionic/react';
import { Fragment, useEffect, useState } from 'react';
import { getAll } from '../actions/api';

interface ContainerProps { 
    setArray: any, setLoading: any, pageInfo: string
}

const Filter: React.FC<ContainerProps> = ({ setArray, setLoading, pageInfo = '' }) => {


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
            try {

                if (!pageInfo) return

                setLoading(true)
    
                const res = await getAll(pageInfo, formData);
                
                setArray(res[pageInfo])
                setLoading(false)

            } catch (err: any) {
                console.log(err.message)
            }

        })()

    }, [formData, pageInfo])

  return (
    
    <IonGrid>
        
        {
            (['playlists', 'songs'].indexOf(pageInfo) >= 0) && <Fragment>

                    
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

            </Fragment>
        }
        <IonRow>
            
            <IonLabel style={{ width: '100%' }}>
                <IonInput name='phrase' value={formData?.phrase || ""} placeholder="Search by phrase" type='text' onIonChange={(e: any) => handleChange(e)}></IonInput>
            </IonLabel>
        </IonRow>
    </IonGrid>
    
  );
};

export default Filter;
