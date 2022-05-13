import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { UserProfileContext } from '../contexts/UserProfile.Context';



// Extends Route component props with idea title route param
interface MyAdsPageProps extends RouteComponentProps<{}> {
    // Add custom added props here 
}

const MyAdsPage: React.FC<MyAdsPageProps> = ({}) => {
    const {token} = useContext(UserProfileContext);

    return (
        <div className="wrapper">

        </div>
    );
}

export default MyAdsPage;