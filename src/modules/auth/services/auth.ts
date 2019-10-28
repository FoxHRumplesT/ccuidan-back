import firebase from 'firebase';

import { generateBytes } from '@utils/generate-random-bytes';
import { User } from '../entities/user';
import { Session } from '../entities/session';
import sessionStore from './session-store';

export const registerWithEmailAndPassword = async (name: string, email: string, password: string): Promise<Session> => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user: firebase.auth.UserCredential) => {
      if (user.user) {
        user.user.updateProfile({ displayName: name });
        return generateSession(user.user);
      } else throw new Error('User not fount');
    });
};

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<Session> => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user: firebase.auth.UserCredential) => {
      if (user.user) return generateSession(user.user); 
      else throw new Error('User not found');
    });
};

export const loginWithSessionId = (sessionId: string): Session | null => {
  const session = sessionStore.getSession(sessionId);
  const isValidSession = !!session && session.isValid();
  if (isValidSession) {
    return session; 
  } else {
    sessionStore.removeSession(sessionId);
    return null;
  }
};

export const logout = (sessionId: string): Promise<void> => {
  sessionStore.removeSession(sessionId);
  return firebase.auth().signOut();
};

async function generateSession(user: firebase.User): Promise<Session> {
  const sessionId = await generateBytes(32);
  const { token, expirationTime } = await user.getIdTokenResult();
  const currentUser: User = { 
    id: user.uid,
    email: user.email,
    name: user.displayName,
    phone: user.phoneNumber,
    photoUrl: user.photoURL
  };
  const session = new Session(sessionId, currentUser, token, expirationTime);
  if (session.isValid()) {
    sessionStore.addSession(session);
    return session;
  } else throw new Error('Cannot create session');
}
