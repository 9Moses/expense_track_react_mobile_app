import React from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react-native';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  duration?: number;
  onHide?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  duration = 3000,
  onHide 
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  }, [opacity, duration, onHide]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getIcon = () => {
    const iconProps = { size: 20, color: 'white' };
    switch (type) {
      case 'success': return <CheckCircle {...iconProps} />;
      case 'error': return <XCircle {...iconProps} />;
      case 'warning': return <AlertCircle {...iconProps} />;
      default: return <CheckCircle {...iconProps} />;
    }
  };

  return (
    <Animated.View 
      style={{ opacity }}
      className={`${getBackgroundColor()} mx-4 p-4 rounded-2xl shadow-2xl flex-row items-center space-x-3 absolute top-12 left-0 right-0 z-50`}
    >
      {getIcon()}
      <Text className="text-white font-semibold text-base flex-1">
        {message}
      </Text>
    </Animated.View>
  );
};

// Toast Manager
export const useToast = () => {
  const [toast, setToast] = React.useState<{ visible: boolean; message: string; type: 'success' | 'error' | 'warning' }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const ToastComponent = () => 
    toast.visible ? (
      <Toast
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
    ) : null;

  return {
    showToast,
    hideToast,
    ToastComponent,
  };
};
