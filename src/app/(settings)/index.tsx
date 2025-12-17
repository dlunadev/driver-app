import { StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router, useNavigation } from 'expo-router';
import { Container, Header, Switch } from '@/src/components';
import { Text } from '@/src/components/text/text.component';
import { Box } from '@/src/components/ui/box';
import { HStack } from '@/src/components/ui/hstack';
import { useMe } from '@/src/hooks';
import { updateUserOne } from '@/src/services/auth.service';
import { Colors } from '@/src/utils/constants/Colors';

export default function Settings() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useMe();
  const [toggleSwitch, setToggleSwitch] = useState(!!user?.userNotificationToken);

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={t('settings.title', { ns: 'utils' })} arrow onPressArrow={() => router.back()} />,
    });
  }, [navigation]);

  const handleNotificationSwitch = async () => {
    try {
      if (toggleSwitch) {
        await updateUserOne(user?.id!, {
          email: user?.email,
          userNotificationToken: null,
        });
        setToggleSwitch(false);
      } else {
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if (status !== 'granted') {
          const request = await Notifications.requestPermissionsAsync();
          finalStatus = request.status;
        }

        if (finalStatus !== 'granted') {
          alert('Permiso denegado para notificaciones');
          return;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync();

        await updateUserOne(user?.id!, {
          email: user?.email,
          userNotificationToken: tokenData.data,
        });

        setToggleSwitch(true);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error al alternar notificaciones:', error);
    }
  };

  return (
    <Container>
      <Box style={styles.box} className="items-start justify-center gap-4 mt-8">
        {/* <Pressable onPress={() => router.push("/(settings)/account_state")}>
          <Text fontSize={20} fontWeight={400} textColor={Colors.DARK_GREEN}>
            {t("settings.account_state", { ns: "utils" })}
          </Text>
        </Pressable> */}
        {/* <Divider style={styles.divider} /> */}
        <HStack className="justify-between w-full">
          <Text fontSize={20} fontWeight={400} textColor={Colors.DARK_GREEN}>
            {t('settings.activate_notification', { ns: 'utils' })}
          </Text>
          <Switch onToggleSwitch={handleNotificationSwitch} isOn={toggleSwitch} />
        </HStack>
      </Box>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.LIGHT_GRADIENT_1,
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  divider: {
    backgroundColor: Colors.PRIMARY,
    height: 1,
    width: '100%',
  },
});
