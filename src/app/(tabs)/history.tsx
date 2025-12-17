import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import useSWR from 'swr';
import { router, useNavigation } from 'expo-router';
import { CalendarWhite, ClockCustom, DolarCircle, Routing, Ticket, UserSquare } from '@/assets/svg';
import { Header, NotBookings } from '@/src/components';
import { Text } from '@/src/components/text/text.component';
import { Badge } from '@/src/components/ui/badge';
import { Box } from '@/src/components/ui/box';
import { Card } from '@/src/components/ui/card';
import { HStack } from '@/src/components/ui/hstack';
import { CheckCircleIcon, CloseCircleIcon, Icon } from '@/src/components/ui/icon';
import { travelType } from '@/src/helpers/parser-names';
import { useMe } from '@/src/hooks';
import { getTravels } from '@/src/services/book.service';
import { Colors } from '@/src/utils/constants/Colors';
import { userRoles } from '@/src/utils/enum/role.enum';
import { travelTypeValues } from '@/src/utils/enum/travel.enum';
import { BookingResponse } from '@/src/utils/interfaces/booking.interface';

export default function History() {
  const navigator = useNavigation();
  const { t } = useTranslation();
  const { user } = useMe();
  const [page, setPage] = useState(0);
  const [bookingDataPaginated, setBookingDataPaginated] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, isLoading } = useSWR(
    ['/travels/history', page],
    async () => {
      const response = await getTravels(user?.id, user?.role === userRoles.USER_HOPPER ? 'hopper' : 'hoppy', false, true, page);
      return response;
    },
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    if (data?.result) {
      setPage(0);
    }
  }, [data?.result]);

  useEffect(() => {
    navigator.setOptions({
      header: () => <Header title={t('title', { ns: 'history' })} />,
      gestureEnabled: false,
    });
  }, [navigator]);

  const handleEndReached = () => {
    if (data?.pagination && data.pagination.page < data.pagination.totalPages - 1) {
      setPage(page + 1);
    }
  };

  const formattedDate = (date: Date) => ({
    date: dayjs(date).format('DD MMM. YYYY'),
    time: dayjs(date).format('HH:mm A'),
  });

  const statusTravelParser = (t: TFunction): Record<any, string> => ({
    COMPLETED: t('travel_status.completed', { ns: 'history' }),
    CANCELLED: t('travel_status.cancelled', { ns: 'history' }),
    START: t('travel_status.start', { ns: 'history' }),
    END: t('travel_status.completed', { ns: 'history' }),
  });

  const travelStatusTranslated = statusTravelParser(t);
  const travelTranslated = travelType(t);

  const statusColor: { [key: string]: string } = {
    COMPLETED: Colors.VIOLET,
    CANCELLED: Colors.ERROR,
    START: Colors.YELLOW,
    END: Colors.VIOLET,
  };

  const iconStatus: { [key: string]: ReactElement } = {
    COMPLETED: <Icon as={CheckCircleIcon} color={Colors.VIOLET} width={16} height={16} />,
    END: <Icon as={CheckCircleIcon} color={Colors.VIOLET} width={16} height={16} />,
    CANCELLED: <Icon as={CloseCircleIcon} color={Colors.ERROR} width={16} height={16} />,
    START: <ClockCustom color={Colors.YELLOW} width={16} height={16} />,
  };

  useEffect(() => {
    if (data?.result) {
      setBookingDataPaginated((prevData) => {
        const newData = [...prevData];

        data.result.forEach((newItem: { id: string }) => {
          const existingItemIndex = newData.findIndex((existingItem) => existingItem.id === newItem.id);

          if (existingItemIndex !== -1) {
            newData[existingItemIndex] = newItem;
          } else {
            newData.push(newItem);
          }
        });

        return newData;
      });
    }
  }, [data?.result, page]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPage(0);

    try {
      const response = await getTravels(user?.id, user?.role === userRoles.USER_HOPPER ? 'hopper' : 'hoppy', false, true, page);
      setBookingDataPaginated(response.result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error al refrescar', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content} className="px-4 ">
        <FlatList
          data={bookingDataPaginated}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3"
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={[Colors.PRIMARY]} />}
          renderItem={({ item }: { item: BookingResponse }) => {
            const { date } = formattedDate(item.programedTo);

            const translatedStatus = travelTranslated[item.type as travelTypeValues] || item.type;

            const currentStatus = travelStatusTranslated[item.status] || item.status;

            const commission = user?.role === userRoles.USER_HOPPER ? item.hopperCommission : item.hoppyCommission;

            return (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/(history)/[id]',
                    params: {
                      id: item.id,
                    },
                  })
                }
                disabled={user?.role === userRoles.USER_HOPPY}
              >
                <Card variant="outline" style={styles.card}>
                  <HStack className="gap-1 items-center justify-between">
                    <Box>
                      <Text className="items-center gap-2" textColor={Colors.DARK_GREEN} fontWeight={600} fontSize={20}>
                        {translatedStatus}
                      </Text>
                      <Text fontSize={12} fontWeight={400} textColor={Colors.GRAY}>
                        {date}
                      </Text>
                    </Box>
                    <Box className="flex-row gap-2 items-center">
                      <Text fontSize={14} fontWeight={600} textColor={statusColor[item.status]}>
                        {currentStatus}
                      </Text>
                      {iconStatus[item.status]}
                    </Box>
                  </HStack>
                  <HStack style={styles.card_description}>
                    <Box className="gap-1">
                      <Box className="flex-row gap-2 flex-wrap">
                        <Routing />
                        <Text fontSize={16} fontWeight={400} textColor={Colors.SECONDARY} className="w-[80%]">
                          {item.from.address.slice(0, 25)} - {item.to.address.slice(0, 25)}
                        </Text>
                      </Box>
                      <Box className="flex-row gap-2">
                        <UserSquare />
                        <Text fontSize={16} fontWeight={400} textColor={Colors.SECONDARY}>
                          {item.passengerName}
                        </Text>
                      </Box>
                      <Box className="flex-row gap-2">
                        <Ticket width={24} height={24} />
                        <Text fontSize={16} fontWeight={400} textColor={Colors.SECONDARY}>
                          Valor ${item.price ? item.price.toFixed(2) : '0'}
                        </Text>
                      </Box>
                    </Box>
                  </HStack>
                  <Badge style={styles.badge}>
                    <DolarCircle />
                    <Text fontSize={18} fontWeight={600} textColor={Colors.DARK_GREEN}>
                      {commission.toFixed(2)}
                    </Text>
                  </Badge>
                </Card>
              </Pressable>
            );
          }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading ? <ActivityIndicator color={Colors.WHITE} /> : null}
          nestedScrollEnabled={true}
          ListEmptyComponent={
            <NotBookings text={t('hopper.bookings.description', { ns: 'history' })}>
              <CalendarWhite />
            </NotBookings>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    flexGrow: 1,
  },
  bookings: {
    marginTop: 32,
    gap: 12,
  },
  card: {
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 20,
  },
  card_description: {
    marginTop: 20,
    gap: 12,
    backgroundColor: Colors.LIGHT_GRADIENT_1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  badge: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 40,
    marginTop: 12,
  },
});
