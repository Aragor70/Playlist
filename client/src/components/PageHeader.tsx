
import { IonHeader, IonTitle, IonIcon, IonItem, IonMenuToggle } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


import { moon, sunny } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const PageHeader: React.FC<RouteComponentProps | any> = ({ history }) => {

  const [ isDarkMode, setIsDarkMode ] = useState(false)

  const handleToggle = async () => {

    document.body.classList.toggle("dark");

    if (document?.body?.classList?.value === 'dark') {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
    
  }

  useEffect(() => {

    if (document?.body?.classList?.value === 'dark') {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
    

  }, [document?.body?.classList?.value])

  return (
      <IonHeader>
        <IonItem lines="none" mode="md">
          <IonTitle className="no-padding"><span onClick={() => history.push("/")} className="brand-icon">Playlist</span></IonTitle>
          
            <IonIcon icon={isDarkMode ? sunny : moon} onClick={() => handleToggle()} slot="end"></IonIcon>
            
            <IonMenuToggle slot="end" className="vertical-center" style={{ marginLeft: '15px'}}>
              <IonIcon size="large" color="dark" name="menu-outline"></IonIcon>
            </IonMenuToggle>
        </IonItem>
      </IonHeader>
  );
};

export default withRouter(PageHeader);
