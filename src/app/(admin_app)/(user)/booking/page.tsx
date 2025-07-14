"use client";
import React, { useState, useEffect } from 'react';
import { 
  DatePicker, 
  Input, 
  Select, 
  Button, 
  Card, 
  message, 
  AutoComplete,
  Divider,
} from 'antd';
import { 
  CalendarOutlined, 
  EnvironmentOutlined, 
  UserOutlined,
  HomeOutlined,
  PlusOutlined,
  MinusOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useCreateBooking } from '@/services/bookingService/bookingService';
import { useSelector } from 'react-redux';
import { selectUserProfileId } from '@/redux/slices/authSlice';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Type definitions
interface Location {
  value: string;
  label: string;
}

interface Guests {
  adults: number;
  children: number;
}

interface RoomType {
  roomId: string;
  label: string;
  price: number;
}

interface BookingPayload {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: Guests;
  roomId: string;
  amountPaid: number;
}

interface BookingResponse {
  success: boolean;
  bookingId: string;
}

interface UseCreateBookingReturn {
  mutate: (payload: BookingPayload) => Promise<BookingResponse>;
}

type GuestType = 'adults' | 'children';
type Operation = 'increment' | 'decrement';
type DateRange = [Dayjs, Dayjs] | null;

// Mock data with proper typing
const popularLocations: Location[] = [
  { value: 'Jaipur', label: 'Jaipur, Rajasthan' },
  { value: 'Mumbai', label: 'Mumbai, Maharashtra' },
  { value: 'Delhi', label: 'Delhi, NCR' },
  { value: 'Bangalore', label: 'Bangalore, Karnataka' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Manali', label: 'Manali, Himachal Pradesh' },
  { value: 'Rishikesh', label: 'Rishikesh, Uttarakhand' },
  { value: 'Udaipur', label: 'Udaipur, Rajasthan' }
];

const roomTypes: RoomType[] = [
  { roomId: 'dorm-6', label: '6-Bed Mixed Dorm', price: 800 },
  { roomId: 'dorm-4', label: '4-Bed Mixed Dorm', price: 1000 },
  { roomId: 'female-dorm', label: 'Female Only Dorm', price: 900 },
  { roomId: 'private-single', label: 'Private Single Room', price: 2500 },
  { roomId: 'private-double', label: 'Private Double Room', price: 3500 },
  { roomId: 'deluxe-private', label: 'Deluxe Private Room', price: 4500 }
];

// Mock hooks with proper typing
// const useCreateBooking = (): UseCreateBookingReturn => {
//   return {
//     mutate: async (payload: BookingPayload): Promise<BookingResponse> => {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       console.log('Booking payload:', payload);
//       message.success('Booking Confirmed! 🎉');
//       return { success: true, bookingId: `BK${Date.now()}` };
//     }
//   };
// };

const BookingEngine: React.FC = () => {
  const [location, setLocation] = useState<string>('Jaipur');
  const [dates, setDates] = useState<DateRange>(null);
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 });
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [nights, setNights] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const userProfileId = useSelector(selectUserProfileId)
  const { mutate: createBooking } = useCreateBooking();

  // Calculate nights and total amount when dates or room changes
  useEffect(() => {
    if (dates && dates.length === 2 && selectedRoom) {
      const [checkIn, checkOut] = dates;
      const nightsCount = checkOut.diff(checkIn, 'day');
      setNights(nightsCount);
      setTotalAmount(selectedRoom.price * nightsCount);
    }
  }, [dates, selectedRoom]);

  const handleLocationSearch = (value: string): Location[] => {
    return popularLocations.filter(location => 
      location.label.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleGuestChange = (type: GuestType, operation: Operation): void => {
    setGuests(prev => {
      const newGuests = { ...prev };
      if (operation === 'increment') {
        newGuests[type] = Math.min(newGuests[type] + 1, type === 'adults' ? 8 : 4);
      } else {
        newGuests[type] = Math.max(newGuests[type] - 1, type === 'adults' ? 1 : 0);
      }
      return newGuests;
    });
  };

  const validateBooking = (): boolean => {
    if (!location.trim()) {
      message.error('Please select a location');
      return false;
    }
    if (!dates || dates.length !== 2) {
      message.error('Please select check-in and check-out dates');
      return false;
    }
    if (!selectedRoom) {
      message.error('Please select a room type');
      return false;
    }
    if (dates[0].isAfter(dates[1])) {
      message.error('Check-in date must be before check-out date');
      return false;
    }
    return true;
  };

  const handleBooking = async (): Promise<void> => {
    if (!validateBooking() || !dates || !selectedRoom) return;

    setIsLoading(true);
    
    const payload: any = {
      location,
      checkIn: dates[0].toISOString(),
      checkOut: dates[1].toISOString(),
      guests,
      roomId: selectedRoom.roomId,
      amountPaid: totalAmount,
      userProfileId: userProfileId,
      propertyId:"68716ce5eb3ab7d034b9d8e2",
      totalPrice: totalAmount
    };

    try {
      await createBooking(payload);
      setShowPayment(false);
      // Reset form
      setLocation('Jaipur');
      setDates(null);
      setGuests({ adults: 2, children: 0 });
      setSelectedRoom(null);
      setTotalAmount(0);
      setNights(0);
    } catch (error) {
      message.error('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindStay = (): void => {
    if (!validateBooking()) return;
    setShowPayment(true);
  };

  const disabledDate = (current: Dayjs): boolean => {
    return current && current < dayjs().startOf('day');
  };

  const handleRoomSelect = (value: string): void => {
    const room = roomTypes.find(r => r.roomId === value);
    setSelectedRoom(room || null);
  };

  const handleDateChange = (dates: DateRange): void => {
    setDates(dates);
  };

  const formatLocationOptions = (locations: Location[]): Array<{ value: string; label: string }> => {
    return locations.map(location => ({
      value: location.value,
      label: location.label
    }));
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex items-center justify-center p-6">
      <Card className="shadow-lg border-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D29022] to-[#610E07] text-white p-6 -m-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Stay</h1>
          <p className="text-white/90">Book hostels, hotels, and unique stays across India</p>
        </div>

        {!showPayment ? (
          <div className="space-y-6">
            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium text-[#610E07] mb-2">
                <EnvironmentOutlined className="mr-2" />
                Where are you going?
              </label>
              <AutoComplete
                size="large"
                placeholder="Search destination..."
                value={location}
                onChange={(value: string) => setLocation(value)}
                options={formatLocationOptions(handleLocationSearch(location))}
                filterOption={false}
                className="w-full"
              >
                <Input
                  prefix={<EnvironmentOutlined className="text-[#D29022]" />}
                  className="focus:border-[#D29022] focus:shadow-[0_0_0_2px_rgba(210,144,34,0.2)]"
                />
              </AutoComplete>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-[#610E07] mb-2">
                <CalendarOutlined className="mr-2" />
                Check-in & Check-out
              </label>
              <RangePicker
                size="large"
                className="w-full focus:border-[#D29022]"
                placeholder={['Check-in', 'Check-out']}
                format="DD MMM YYYY"
                value={dates}
                onChange={handleDateChange}
                disabledDate={disabledDate}
                suffixIcon={<CalendarOutlined className="text-[#D29022]" />}
              />
            </div>

            {/* Guest Selector */}
            <div>
              <label className="block text-sm font-medium text-[#610E07] mb-2">
                <UserOutlined className="mr-2" />
                Guests
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Adults</div>
                      <div className="text-sm text-gray-500">Ages 13+</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => handleGuestChange('adults', 'decrement')}
                        disabled={guests.adults <= 1}
                      />
                      <span className="w-8 text-center font-medium">{guests.adults}</span>
                      <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => handleGuestChange('adults', 'increment')}
                        disabled={guests.adults >= 8}
                      />
                    </div>
                  </div>
                </Card>
                
                <Card className="border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Children</div>
                      <div className="text-sm text-gray-500">Ages 0-12</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => handleGuestChange('children', 'decrement')}
                        disabled={guests.children <= 0}
                      />
                      <span className="w-8 text-center font-medium">{guests.children}</span>
                      <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => handleGuestChange('children', 'increment')}
                        disabled={guests.children >= 4}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Room Selection */}
            <div>
              <label className="block text-sm font-medium text-[#610E07] mb-2">
                <HomeOutlined className="mr-2" />
                Room Type
              </label>
              <Select
                size="large"
                placeholder="Select room type..."
                className="w-full"
                value={selectedRoom?.roomId}
                onChange={handleRoomSelect}
              >
                {roomTypes.map((room: RoomType) => (
                  <Option key={room.roomId} value={room.roomId}>
                    <div className="flex justify-between items-center">
                      <span>{room.label}</span>
                      <span className="text-[#D29022] font-medium">₹{room.price}/night</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </div>

            {/* Search Button */}
            <Button
              type="primary"
              size="large"
              onClick={handleFindStay}
              className="w-full bg-gradient-to-r from-[#D29022] to-[#610E07] border-none h-12 text-lg font-semibold hover:opacity-90"
            >
              Find My Stay
            </Button>
          </div>
        ) : (
          /* Payment Section */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#610E07]">Booking Summary</h2>
              <Button type="link" onClick={() => setShowPayment(false)}>
                ← Back to Search
              </Button>
            </div>

            <Card className="border border-gray-200">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Dates:</span>
                  <span>
                    {dates && dates[0]?.format('DD MMM YYYY')} - {dates && dates[1]?.format('DD MMM YYYY')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>{nights} {nights === 1 ? 'night' : 'nights'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Guests:</span>
                  <span>
                    {guests.adults} adults{guests.children > 0 && `, ${guests.children} children`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Room:</span>
                  <span>{selectedRoom?.label}</span>
                </div>
                <Divider />
                <div className="flex justify-between text-lg font-bold text-[#610E07]">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Mock Payment UI */}
            <Card className="border border-gray-200">
              <div className="text-center space-y-4">
                <CreditCardOutlined className="text-4xl text-[#D29022]" />
                <h3 className="text-lg font-semibold">Secure Payment</h3>
                <p className="text-gray-600">
                  Your payment is secured with 256-bit SSL encryption
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Payment methods accepted:</p>
                  <div className="flex justify-center space-x-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">Visa</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded">Mastercard</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded">UPI</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded">Wallet</span>
                  </div>
                </div>
              </div>
            </Card>

            <Button
              type="primary"
              size="large"
              onClick={handleBooking}
              loading={isLoading}
              className="w-full bg-gradient-to-r from-[#D29022] to-[#610E07] border-none h-12 text-lg font-semibold hover:opacity-90"
            >
              {isLoading ? 'Processing Payment...' : `Pay ₹${totalAmount.toLocaleString()} & Book Now`}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BookingEngine;