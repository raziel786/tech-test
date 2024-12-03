import { TOKEN_KEY } from "@env";
import { sign } from "react-native-pure-jwt";
import { storage } from '../App';
import logger from './logger';

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async () => {
  try {
    await sleep(1000);
    /**
     * generate a mock of the user
     */
    const mockLogin = {
      emailAddress: 'joe@test.com',
      exp: new Date().getTime() + 8 * 3600 * 1000, //set expiry of token to 8 hours
      id: 1,
      name: 'Joe Davis',
    }
    /**
     * Create a JWT token for the user.
     * Since this data is static, it does not need to be stored in Redux.
     */
    const token = await sign(mockLogin, TOKEN_KEY, { alg: "HS256" })
    /**
     * Store the user data in persistent storage.
     */
    storage.set('token', token)
    /**
     * return the token after successful data has been parsed
     */
    return token
  } catch (error: any) {
    storage.clearAll()
    logger.error(error);
  }
};

type Account = {
  balance: number;
  createdAt: null | number;
  status: 'completed' | 'pending';
  version: 'v1' | 'v2';
};

let mockAccount: Account | null = null;

export const createAccount = async () => {
  try {
    await sleep(500);
    mockAccount = {
      balance: 0,
      createdAt: Date.now(),
      status: 'pending',
      version: 'v1',
    };
    storage.set('account', JSON.stringify(mockAccount));
    return mockAccount;
  } catch (error: any) {
    logger.error(error);
    throw new Error('Failed to create account');
  }
};


export const resetAccount = async () => {
  mockAccount = null;
  storage.delete('account');

};

export const getAccount = async (
  getNewerAccountVersion?: boolean,
): Promise<Account | null> => {
  try {
    await sleep(1500);
    const account = storage.getString('account');
    if (!account) {
      throw new Error('Account not found');
    }
    else {
      mockAccount = JSON.parse(account)
    }

    const createdTime = mockAccount?.createdAt || Date.now();

    // Simulate status update to "completed" after 10 seconds
    if (mockAccount!.status === 'pending' && Date.now() - createdTime > 10_000) {
      mockAccount!.status = 'completed';
    }
    if (mockAccount!.status === 'completed') {
      mockAccount!.balance = mockAccount!.balance + 100;
    }
    storage.set('account', JSON.stringify(mockAccount))
    return {
      ...mockAccount,
      version: getNewerAccountVersion ? 'v2' : mockAccount?.version,
    };
  } catch (error: any) {
    logger.error(error);
    throw new Error('Failed to retrieve account');
  }
};
