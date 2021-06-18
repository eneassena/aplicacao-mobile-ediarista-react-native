import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { ScrollView } from 'react-native';
import PageTitle from 'ui/components/data-display/PageTitle/Title';
import TextInput from 'ui/components/Inputs/TextInput/TextInput';
import { TextInputMask } from 'react-native-masked-text';
import Button from 'ui/components/Inputs/Button/Button';
import Userinformation from 'ui/components/data-display/Userinformation/Userinformation';
import {
    FormContainer,
    ResponseContainer,
    TextContainer,
    ErrorText,
} from 'ui/styles/pages/encontrar-diarista.style';
import useIndex from 'data/hooks/pages/useIndex.page';
import useEncontrarDiarista from 'data/hooks/pages/useEncontrarDiarista.page.mobile';
import { useEffect } from 'react';


const EncontrarDiarista: React.FC = () => {
    const {colors } = useTheme();
    const {
        cep,
        setCep,
        cepValido,
        buscarProfissionais,
        erro,
        diaristas,
        buscaFeita,
        carregando,
        diaristasRestantes,

    } = useIndex(),
    { cepAutomatico } = useEncontrarDiarista();
    
    useEffect(() => {
        if(cepAutomatico && !cep) {
            setCep(cepAutomatico);
            buscarProfissionais(cepAutomatico)
        }
    }, [cepAutomatico])

    
    console.log(diaristas);
    

    return ( 
        <ScrollView>
            <PageTitle 
                title={ 'Conheça os profissionais' }
                subtitle={
                    'preencha seu endereço e conheça todos os profissionais da sua localidade.'
                } 
            /> 

            <FormContainer>

                <TextInputMask 
                    value={cep}
                    onChangeText={setCep}
                    type={'custom'}
                    options= {{
                        mask: '99.999-999',
                    }}
                    customTextInput={TextInput}
                    customTextInputProps={{
                        label: 'Digite seu CEP',
                    }}
                />

                {erro ? <ErrorText>{erro}</ErrorText> : null}

                <Button mode={ 'contained' } style={{ marginTop: 32 }} 
                    color={ colors.accent } 
                    disabled={ !cepValido || carregando }
                    onPress={ () => buscarProfissionais( cep ) }
                    loading={ carregando }
                    > 
                    Buscar
                </Button>
            </FormContainer>

            {buscaFeita && (diaristas.length > 0 ? (
                <ResponseContainer>

                    { diaristas.map((item, index) => (
                        <Userinformation
                            key={index}
                            name={ item.nome_completo }
                            rating={ item.reputação || 0}
                            picture={ item.foto_usuario || ''}
                            description={ item.cidade }
                            darker={index % 2 === 1 }
                            />
                    ) ) }                   

                    { diaristasRestantes > 0 ? <TextContainer>
                        ...e mais { diaristasRestantes }{' '}
                        { diaristasRestantes > 1 ? 'profissionais atendem' : 'profissional' }{' '}
                        ao seu endereço.
                    </TextContainer> : 0 }
                    <Button color={ colors.accent } mode={ 'contained' } >
                        Contratar um profissional
                    </Button>
                </ResponseContainer>
            ) : (
                <TextContainer>
                    Ainda não temos nenhuma diarista disponível em sua região.
                </TextContainer>
            ))}
        </ScrollView>
    );
};


export default EncontrarDiarista;
