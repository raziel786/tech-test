import React from 'react';
import { Button, Text, View } from 'react-native';

import LogoutButton from '@/components/LogoutButton';
import { useTheme } from '@/theme';
import { calculateBreakdown, formatCurrency } from '@/utils';

export default function AccountDetails({ account, invalidateAccountQuery }) {
  const breakdown = calculateBreakdown(account?.balance || 0);

  const { fonts, gutters } = useTheme();
  const styles = {
    spaceBetween: {
      color: fonts.gray800,
      display: 'flex',
      flexDirection: 'row',
      fontSize: fonts.size_16,
      justifyContent: 'space-between',
      width: '100%'
    } as const
  }

  return (
    <View style={gutters.gap_12} testID="account-details-screen">
      <View style={{
        backgroundColor: 'lightgreen',
        borderRadius: 8,
        padding: 16,
      }}>
        <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
          Available Balance
        </Text>
        <Text style={[fonts.size_32, fonts.gray800, fonts.bold]}>
          {breakdown?.availableBalance}
        </Text>
      </View>
      <View style={gutters.gap_12}>
        <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
          Breakdown:
        </Text>
        <View style={styles.spaceBetween}>
          <Text style={[fonts.size_16, fonts.gray800]}>Account Balance</Text>
          <Text style={[fonts.size_16, fonts.gray800]}>{formatCurrency(account?.balance) || 0}
          </Text>
        </View>
        <View style={styles.spaceBetween}>
          <Text style={[fonts.size_16, fonts.gray800]}>Accrued Interest</Text>
          <Text style={[fonts.size_16, fonts.gray800]}>+ {breakdown?.interest}</Text>
        </View>
        <View style={styles.spaceBetween}>
          <Text style={[fonts.size_16, fonts.gray800]}>Fees </Text>
          <Text style={[fonts.size_16, fonts.gray800]}>- {breakdown?.fees}</Text>
        </View>
        <View style={styles.spaceBetween}>
          <Text style={[fonts.size_16, fonts.gray800]}>Taxes</Text>
          <Text style={[fonts.size_16, fonts.gray800]}>- {breakdown?.taxes}</Text>
        </View>
        <View style={styles.spaceBetween}>
          <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>Remaining Balance:</Text>
          <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>{breakdown?.availableBalance}</Text>
        </View>
      </View>
      <Button onPress={invalidateAccountQuery} title="Refresh your account" />
      <LogoutButton />
    </View>
  )
}