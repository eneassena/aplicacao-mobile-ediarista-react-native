import React from 'react';
import { Avatar } from 'react-native-paper';
import {
    
    UserInformationContainer,
    InformationContainer,
    UserName,
    UserDescription,
    RatingStyled,

 } from './Userinformation.style';


export interface UserinformationProps {
    picture: string;
    name: string;
    rating: number;
    description: string;
    darker?: boolean;
}
// picture, name, rating, description, darker
const Userinformation: React.FC<UserinformationProps> = (props) => {
    return (
        <UserInformationContainer darker={Boolean(props.darker)}>
            <Avatar.Image source={{ uri: props.picture }} />
            <InformationContainer>
                <UserName>{props.name}</UserName>
                <RatingStyled>{props.rating}</RatingStyled>
                <UserDescription>{props.description}</UserDescription>
            </InformationContainer>
        </UserInformationContainer>
    );
}


export default Userinformation;