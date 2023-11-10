import jwt from 'jsonwebtoken';

import validateInput from './validateInput';

const SingleSignOnKey = 'SingleSignOnKey';

export default async function authenticateUser(request, queryData) {
  const { ssoToken } = queryData;
  const userData = await jwt.verify(ssoToken, SingleSignOnKey);
//  console.log(userData, ssoToken, jwt.sign({...userData}, SingleSignOnKey));
  delete queryData.ssoToken;

  if (!userData.id) {

//    console.log('id is incorrect');
    throw new Error('Missing id in user data');
  } else if (userData.email && !validateInput.email(userData.email)) {

//    console.log('email information is invalid');
    throw new Error('Invalid email in user data');
  } else if (!userData.name) {

//    console.log('user name is incorrect');
    throw new Error('Missing name in user data');
  }

//  console.log('All information is correct');

  return userData;
}

module.exports = authenticateUser;
