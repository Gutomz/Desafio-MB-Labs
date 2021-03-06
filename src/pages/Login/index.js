import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import logo from '../../assets/logo.png'
import PrimaryButton from '../../components/PrimaryButton'
import SecundaryButton from '../../components/SecundaryButton'
import { CommonActions } from '@react-navigation/native';

import { Container, Logo, Form } from './styles';
import { Input } from '../../globalStyles';

export default function Login({ navigation, route }) {

  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');

  function validateInputs(){
    if(email === '') return false;
    if(password === '') return false;

    return true;
  }

  async function handleSubmit() {
    if(validateInputs()){
      //Search the account on backend

      AsyncStorage.setItem('user', email);

      //Ir para a dashboard sem voltar atrás
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'UserRoutes'}],
        }),
      );
    }
  }

  return (
    <Container>
      <Logo source={logo} />

      <Form behavior="padding" enabled>

        <Input 
          placeholder="E-mail"
          placeholderTextColor="#888888"
          underlineColorAndroid="#2E323D"
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Senha"
          placeholderTextColor="#888888"
          secureTextEntry={true}
          value={password}
          onChangeText={SetPassword}
        />

        <PrimaryButton title="Entrar" onPress={handleSubmit}/>

      </Form>

      <SecundaryButton title="CADASTRE-SE GRÁTIS" onPress={() => navigation.navigate('Register')}/>

    </Container>
  );
}
