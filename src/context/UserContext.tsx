import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isAdmin?: boolean;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface UserContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (email === 'admin@freshmart.com' && password === 'admin123') {
      setUser({
        id: 1,
        name: 'Admin User',
        email: 'admin@freshmart.com',
        isAdmin: true
      });
      return true;
    } else if (email && password) {
      setUser({
        id: 2,
        name: 'John Doe',
        email: email,
        phone: '+1 234 567 8900',
        address: '123 Main Street, City, State 12345'
      });
      // Load mock orders
      setOrders([
        {
          id: 'ORD001',
          date: '2024-01-15',
          total: 45.99,
          status: 'delivered',
          items: [
            { name: 'Fresh Bananas', quantity: 2, price: 3.99 },
            { name: 'Organic Milk', quantity: 1, price: 5.99 }
          ]
        },
        {
          id: 'ORD002',
          date: '2024-01-20',
          total: 78.50,
          status: 'shipped',
          items: [
            { name: 'Premium Coffee', quantity: 1, price: 15.99 },
            { name: 'Fresh Vegetables Pack', quantity: 1, price: 12.99 }
          ]
        }
      ]);
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    // Simulate API call
    const newUser = {
      ...userData,
      id: Date.now()
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <UserContext.Provider value={{
      user,
      orders,
      login,
      register,
      logout,
      updateProfile,
      addOrder
    }}>
      {children}
    </UserContext.Provider>
  );
};