import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { createAccount } from '@/api';
import { storage } from '@/App';
import { SafeScreen } from '@/components/templates';
import useAccount from '@/hooks/useAccount';
import { useTheme } from '@/theme';
import AccountDetails from './AccountDetails';
import Loader from './Loader';

const handleCreateAccount = async () => {
  try {
    await createAccount();
  } catch (error) {
    console.error('Error creating account:', error);
  }
};

interface HomeProps {
  route: {
    params: {
      name: string
    }
  }
}

export default function Home({ route }: HomeProps) {
  const { fonts, gutters, layout } = useTheme();
  const { invalidateAccountQuery } = useAccount();
  const account = storage.getString("account") && JSON.parse(storage.getString("account")!)
  const { name } = route.params;

  React.useEffect(() => {
    if (!account) {
      handleCreateAccount()
    }
  }, [account])

  if (account?.status !== "completed") {
    return (
      <SafeScreen testID="loading-screen">
        <Loader />
      </SafeScreen >
    )
  }

  return (
    <SafeScreen testID="home-screen">
      <ScrollView>
        <View style={[layout.justifyCenter, gutters.marginTop_80, gutters.paddingHorizontal_16, gutters.gap_12]}>
          <Text style={[fonts.bold, fonts.size_32, fonts.gray800]}>Hi {name},</Text>
          <AccountDetails
            account={account}
            invalidateAccountQuery={invalidateAccountQuery}
          />
        </View>
      </ScrollView>
    </SafeScreen >
  );
}

