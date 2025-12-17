import { View, Pressable, StyleSheet, Linking } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mutate } from 'swr';
import { router } from 'expo-router';
import { Header } from '@/src/components';
import { Text } from '@/src/components/text/text.component';
import { Divider } from '@/src/components/ui/divider';
import { useAuth } from '@/src/context/auth.context';
import { useDrawer } from '@/src/context/drawer.context';
import { useMe } from '@/src/hooks';
import { updateUserOne } from '@/src/services/auth.service';
import { getTermsAndConditions, getUserDocumentation } from '@/src/services/user.service';
import { Colors } from '@/src/utils/constants/Colors';
import { AuthRoutesLink } from '@/src/utils/enum/auth.routes';
import { userRoles } from '@/src/utils/enum/role.enum';
import Profile from '../(profile)/index';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { clearToken } = useAuth();
  const { setIsDrawerOpen } = useDrawer();
  const { user } = useMe();

  const handleLogout = async () => {
    try {
      await updateUserOne(user?.id!, {
        email: user?.email,
        userNotificationToken: null,
      });

      mutate(undefined);
      setIsDrawerOpen(false);
      clearToken();
      router.replace(AuthRoutesLink.SIGN_IN);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleOpenTerms = async () => {
    const resp = await getTermsAndConditions();

    if (user?.role === userRoles.USER_HOPPER) {
      Linking.openURL(resp.hopperTermsConditions);
    } else {
      Linking.openURL(resp.hoppyTermsConditions);
    }
  };

  const handleDownloadContract = async () => {
    const resp = await getUserDocumentation(user?.id!);
    if (!resp?.userContract) return;

    Linking.openURL(resp?.userContract);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.LIGHT_GRADIENT_1,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 8,
      }}
      className="flex-1"
    >
      <View className="p-5">
        <Pressable onPress={() => router.push('/(settings)/')} className="p-2">
          <Text textColor={Colors.DARK_GREEN} fontSize={20} fontWeight={400}>
            {t('profile.drawer.link.permissions', { ns: 'profile' })}
          </Text>
          <Divider className="my-1" orientation="horizontal" style={styles.divider} />
        </Pressable>
        <Pressable onPress={() => router.push(AuthRoutesLink.NEW_PASSWORD)} className="p-2">
          <Text textColor={Colors.DARK_GREEN} fontSize={20} fontWeight={400}>
            {t('profile.drawer.link.privacy', { ns: 'profile' })}
          </Text>
          <Divider className="my-1" style={styles.divider} />
        </Pressable>
        <Pressable onPress={() => router.push('/(settings)/report_issue')} className="p-2">
          <Text textColor={Colors.DARK_GREEN} fontSize={20} fontWeight={400}>
            {t('profile.drawer.link.report_issue', { ns: 'profile' })}
          </Text>
          <Divider className="my-1" style={styles.divider} />
        </Pressable>
        <Pressable onPress={handleOpenTerms} className="p-2">
          <Text textColor={Colors.DARK_GREEN} fontSize={20} fontWeight={400}>
            {t('profile.drawer.link.terms_conditions', { ns: 'profile' })}
          </Text>
          <Divider className="my-1" style={styles.divider} />
        </Pressable>
        <Pressable onPress={handleDownloadContract} className="p-2">
          <Text textColor={Colors.DARK_GREEN} fontSize={20} fontWeight={400}>
            {t('profile.drawer.link.contract', { ns: 'profile' })}
          </Text>
          <Divider className="my-1" style={styles.divider} />
        </Pressable>
      </View>

      <View className="flex-1" />

      <View className="p-5">
        <Pressable onPress={() => handleLogout()}>
          <Text textColor={Colors.DARK_GREEN} fontSize={20} fontWeight={400}>
            {t('profile.drawer.link.logout', { ns: 'profile' })}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function ProfileDrawerLayout() {
  return (
    <Drawer.Navigator
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        header: () => <Header title="Perfil" menu />,
        drawerType: 'front',
        drawerContentContainerStyle: {
          flex: 1,
        },
        drawerContentStyle: {
          backgroundColor: Colors.LIGHT_GRADIENT_1,
        },
      }}
      drawerContent={() => <CustomDrawerContent />}
    >
      <Drawer.Screen name="index" component={Profile} options={{ title: 'Profile' }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.PRIMARY,
    height: 1,
    width: '100%',
    marginTop: 12,
  },
});
