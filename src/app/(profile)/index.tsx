import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router, useNavigation } from 'expo-router';
import { CalendarActive, ClockActive, ProfileActive, Avatar, AvatarHopper, Car, CourtHouse, Danger, WalletActive } from '@/assets/svg';
import { Container, Header } from '@/src/components';
import { Text } from '@/src/components/text/text.component';
import { Box } from '@/src/components/ui/box';
import { Divider } from '@/src/components/ui/divider';
import { HStack } from '@/src/components/ui/hstack';
import { ChevronRightIcon, Icon } from '@/src/components/ui/icon';
import { useDrawer } from '@/src/context/drawer.context';
import capitalizeWords from '@/src/helpers/capitalize-words';
import { checkEmptyFields } from '@/src/helpers/check-empty-fields';
import { useMe } from '@/src/hooks';
import * as checkValidations from '@/src/utils/constants/check-validations';
import { Colors } from '@/src/utils/constants/Colors';
import { ProfileRoutesLink } from '@/src/utils/enum/profile.routes';
import { userRoles } from '@/src/utils/enum/role.enum';
import { TabsRoutesLink } from '@/src/utils/enum/tabs.routes';

export default function Profile() {
  const { user } = useMe();

  const { isDrawerOpen, setIsDrawerOpen } = useDrawer();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const drawerState = useDrawerStatus();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isDrawerOpen) {
      navigation.dispatch(DrawerActions.openDrawer());
    } else {
      navigation.dispatch(DrawerActions.closeDrawer());
      setIsDrawerOpen(false);
    }
  }, [isDrawerOpen, setIsDrawerOpen, navigation]);

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={t('profile.home.title', { ns: 'profile' })} menu onPressMenu={() => setIsDrawerOpen(true)} />,
    });
  }, [navigator]);

  useEffect(() => {
    if (drawerState === 'open') {
      setIsDrawerOpen(true);
    }
    if (drawerState === 'closed') {
      setIsDrawerOpen(false);
    }
  }, [drawerState, setIsDrawerOpen]);

  const emptyFields = checkEmptyFields(
    user?.userInfo!,
    checkValidations.keysToCheck.filter((item) => (user?.role === userRoles.USER_HOPPER ? item !== 'hotel_name' && item !== 'hotel_location' : true))
  );

  const hotelFields = ['hotel_name', 'hotel_location'];

  const isHotelDataMissing = hotelFields.every((field) => emptyFields.includes(field));

  const shortcuts = [
    {
      icon: ProfileActive,
      name: t('profile.home.shortcuts.personal_data', { ns: 'profile' }),
      to: ProfileRoutesLink.PERSONAL_DATA,
    },
    {
      icon: Car,
      name: t('profile.home.shortcuts.vehicle', { ns: 'profile' }),
      to: ProfileRoutesLink.VEHICLE_DATA,
    },
    {
      icon: isHotelDataMissing ? Danger : CourtHouse,
      name: t('profile.home.shortcuts.hotel', { ns: 'profile' }),
      to: ProfileRoutesLink.HOTEL,
    },
    {
      icon: CalendarActive,
      name: t('profile.home.shortcuts.reservations', { ns: 'profile' }),
      to: TabsRoutesLink.BOOKING,
    },
    {
      icon: ClockActive,
      name: t('profile.home.shortcuts.history', { ns: 'profile' }),
      to: TabsRoutesLink.HISTORY,
    },
    {
      icon: !isHotelDataMissing && emptyFields.length > 0 ? Danger : WalletActive,
      name: t('profile.home.shortcuts.bank_account', { ns: 'profile' }),
      to: ProfileRoutesLink.BANK_ACCOUNT,
    },
  ];

  const handleHover = (id: number, isHovered: boolean) => {
    setHoveredIndex(isHovered ? id : null);
  };

  const filteredShortcuts = shortcuts.filter((item) => {
    if (user?.role === userRoles.USER_HOPPER && item.icon === CourtHouse) {
      return false;
    }
    if (user?.role === userRoles.USER_HOPPY && item.icon === Car) {
      return false;
    }
    return true;
  });

  return (
    <Container>
      <Box className="justify-center items-center">
        {user?.userInfo.profilePic ? (
          <Image
            source={{
              uri: user?.userInfo.profilePic,
            }}
            width={185}
            height={185}
            className="rounded-full"
          />
        ) : user?.role === userRoles.USER_HOPPER ? (
          <AvatarHopper width={185} height={185} />
        ) : (
          <Avatar width={185} height={185} />
        )}
        <Text fontSize={24} fontWeight={400} textColor={Colors.DARK_GREEN} className="mt-2">
          {capitalizeWords(user?.userInfo.firstName || '')} {capitalizeWords(user?.userInfo.lastName || '')}
        </Text>
        <Text textColor={Colors.SECONDARY} fontWeight={600} fontSize={20}>
          {user?.role === userRoles.USER_HOPPER ? 'Hopper' : 'Hoppy'}
        </Text>
      </Box>
      <View style={styles.panel}>
        {filteredShortcuts.map(({ name, icon: IconItem, to }: { name: string; icon: any; to?: any }, i) => {
          return (
            <React.Fragment key={name}>
              <Pressable onPress={() => router.push(to)} disabled={!to} key={name}>
                <HStack
                  className="items-center justify-between px-4 w-full rounded-2xl"
                  style={{
                    backgroundColor: hoveredIndex === i ? Colors.SECONDARY : 'transparent',
                    paddingVertical: 8,
                  }}
                  onTouchStart={() => handleHover(i, true)}
                  onTouchEnd={() => handleHover(i, false)}
                >
                  <Box className="flex-row gap-2 items-center">
                    <View style={styles.link_icon}>
                      <IconItem width={16} height={16} color={Colors.SECONDARY} />
                    </View>
                    <Text textColor={Colors.DARK_GREEN} fontWeight={400} fontSize={16}>
                      {name}
                    </Text>
                  </Box>
                  <Icon as={ChevronRightIcon} color={Colors.DARK_GREEN} width={12} height={12} />
                </HStack>
              </Pressable>
              {i !== 4 && <Divider style={styles.divider} />}
            </React.Fragment>
          );
        })}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: Colors.LIGHT_GRADIENT_1,
    marginTop: 80,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 40,
    gap: 12,
  },
  link_icon: {
    alignSelf: 'flex-start',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.PRIMARY,
  },
  skeleton_image: {
    width: 185,
    height: 185,
  },
});
